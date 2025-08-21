import { generatedFileHeader, isTypeToken } from './common.mjs';

export const isFontToken = isTypeToken.bind(null, 'font');

function collectFontFamilies(tokens) {
  return tokens
    .filter((t) => t.path[0] === 'font')
    .reduce((acc, t) => {
      const fontFamilyNode = t.path[1]; // 'primary' | 'secondary' | ...
      const leafNode = t.path[t.path.length - 1]; // 'name' | 'type' | 'bold'...

      if (!acc[fontFamilyNode]) {
        acc[fontFamilyNode] = { weights: new Set() };
      }

      if (leafNode === 'name') {
        acc[fontFamilyNode].name = String(t.value);
      } else if (leafNode === 'type') {
        acc[fontFamilyNode].type = String(t.value);
      } else if (t.path.includes('weight')) {
        const n = Number(t.value);
        if (!Number.isNaN(n)) {
          acc[fontFamilyNode].weights.add(n);
        }
      }
      return acc;
    }, {});
}

export function registerFontFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'css/variables-theme-fonts',
    format: function ({ dictionary }) {
      // tokens "name" + "type"
      const families = collectFontFamilies(dictionary.allTokens);

      // build combined lines as --font-{family}: {name}, {type}
      const familyLines = Object.entries(families).map(([key, { name, type }]) => {
        const value = [name, type].filter(Boolean).join(', ');
        return `  --font-${key}: ${value};`;
      });

      // weight variables as --font-weight-{family}-{token}
      const weightLines = dictionary.allTokens
        .filter((t) => t.path[0] === 'font' && (t.path.includes('weight') || t.path.includes('weights')))
        .map((t) => {
          const family = t.path[1]; // 'primary' | 'secondary' | ...
          const last = t.path[t.path.length - 1]; // 'regular' | 'bold' | ...
          return `  --font-weight-${family}-${last}: ${t.value};`;
        });

      const output = [...familyLines, ...weightLines].join('\n');

      return `${generatedFileHeader}\n@theme {\n${output}\n}\n`;
    }
  });

  StyleDictionary.registerFormat({
    name: 'unplugin/font-families-array',
    format: ({ dictionary }) => {
      const families = collectFontFamilies(dictionary.allTokens);

      const out = Object.values(families)
        .filter((f) => f.name)
        .map((f) => {
          const weights = f.weights ? Array.from(f.weights).sort((a, b) => a - b) : [];
          return {
            name: f.name,
            styles: weights.length ? `wght@${weights.join(';')}` : '',
            defer: true
          };
        });

      return `${generatedFileHeader}\nexport const unpluginFonts = ${JSON.stringify(out, null, 2)};\n`;
    }
  });
}
