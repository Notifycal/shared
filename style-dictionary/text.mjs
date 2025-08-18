import { generatedFileHeader, isTypeToken } from './common.mjs';

export const isTextToken = isTypeToken.bind(null, 'text');

function round(n, d = 8) {
  const p = 10 ** d;
  return Math.round(n * p) / p;
}

export function calculateFontSizes(basePx, scale) {
  const sizes = {};
  let current = scale; // h6
  for (let i = 6; i >= 1; i--) {
    sizes[`h${i}`] = `${round(current)}rem`;
    sizes[`h${i}-sm`] = `${round(current * 0.9)}rem`;
    current *= scale;
  }
  sizes.base = `${basePx}px`;
  sizes['base-sm'] = `${round(basePx * 0.8, 2)}px`;
  return sizes;
}

export function buildTextTokens(textJson) {
  const basePx = parseFloat(textJson.text.size.base.value);
  const scale = parseFloat(textJson.text.size.scale.value);

  const sizes = calculateFontSizes(basePx, scale);
  const tokens = { text: {} };
  for (const [k, v] of Object.entries(sizes)) tokens.text[k] = { value: v };
  return tokens;
}

export function registerTextFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'css/variables-theme-text',
    format: ({ dictionary }) => {
      const out = dictionary.allTokens
        .filter(isTextToken)
        .map((t) => `  --text-${t.path.slice(1).join('-')}: ${t.value};`)
        .join('\n');
      return `${generatedFileHeader}\n@theme {\n${out}\n}\n`;
    }
  });
}
