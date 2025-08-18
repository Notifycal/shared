import { generatedFileHeader, isTypeToken } from './common.mjs';

export const isFontToken = isTypeToken.bind(null, 'font');

const baseFontVariable = (segments) => `--font-${segments.join('-')}`;

export function registerFontFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'css/variables-theme-fonts',
    format: function ({ dictionary }) {
      const output = dictionary.allTokens
        .map((token) => {
          const cssVariable = baseFontVariable(token.path.slice(1));
          return `  ${cssVariable}: ${token.value};`;
        })
        .join('\n');

      return `${generatedFileHeader}\n@theme {\n${output}\n}\n`;
    }
  });
}
