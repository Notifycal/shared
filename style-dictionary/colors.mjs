import tinycolor from 'tinycolor2';

import { generatedFileHeader, isTypeToken } from './common.mjs';

export const isColorToken = isTypeToken.bind(null, 'color');

const baseShade = 500;
const colorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const baseCssVariable = (colorName) => `--color-${colorName}`;

const generateSingleColor = (color, isShaded, cssVariableName) => {
  return { value: tinycolor(color).toHslString(), isShaded, cssVariableName };
};

const generateColorShade = (baseColor, colorToMixWith, mixAmount, cssVariableName) => {
  return { value: tinycolor.mix(baseColor, colorToMixWith, mixAmount).toHslString(), isShaded: true, cssVariableName };
};

const generateColorShades = (colorTokens, colorName) => {
  const generateShadedCssVariableName = (colorName, colorShade) => `${baseCssVariable(colorName)}-${colorShade}`;
  const colorData = colorTokens[colorName];
  const base = tinycolor(colorData.value);

  return Object.fromEntries(
    colorShades.map((shade) => {
      const isBase = shade === baseShade;
      const isLight = shade < baseShade;
      const weight = (isLight ? 1 - shade / baseShade : (shade - baseShade) / baseShade) * 100;

      const colorToMixWith = isLight ? '#ffffff' : '#000000';

      if (isBase) {
        return [
          shade,
          generateSingleColor(base.toHslString(), true, generateShadedCssVariableName(colorName, baseShade))
        ];
      } else {
        return [
          shade,
          generateColorShade(base, colorToMixWith, weight, generateShadedCssVariableName(colorName, shade))
        ];
      }
    })
  );
};

export function buildColorTokens(baseColors) {
  const colorTokens = baseColors.color;
  const generatedTokens = { color: {} };

  Object.keys(colorTokens).forEach((colorName) => {
    const colorData = colorTokens[colorName];
    const isShaded = colorData.generateShades === true; // Determine if shades should be generated

    if (isShaded) {
      generatedTokens.color[colorName] = generateColorShades(colorTokens, colorName);
    } else {
      // Add color directly if generateShades is false or not present
      generatedTokens.color[colorName] = generateSingleColor(colorData.value, false, baseCssVariable(colorName));
    }
  });

  return generatedTokens;
}

export function registerColorFormats(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'css/variables-theme',
    format: function ({ dictionary }) {
      const output = dictionary.allTokens
        .map((token) => {
          return `  ${token.original.cssVariableName}: ${token.value};`;
        })
        .join('\n');

      return `${generatedFileHeader}\n@theme {\n${output}\n}\n`;
    }
  });

  StyleDictionary.registerFormat({
    name: 'mantine/color-palette',
    format: function ({ dictionary }) {
      const colorsObject = {};

      dictionary.allTokens
        .filter((token) => token.original.isShaded)
        .forEach((token) => {
          const colorName = token.path[1];
          const shade = parseInt(token.path[2], 10);

          if (!colorsObject[colorName]) {
            colorsObject[colorName] = [];
          }
          colorsObject[colorName].push({ shade, value: token.value, cssVariableName: token.original.cssVariableName });
        });

      let output = `${generatedFileHeader}\n\nimport type { MantineColorsTuple } from '@mantine/core';\n\nexport const colors: Record<string, MantineColorsTuple> = {\n`;
      for (const colorName in colorsObject) {
        colorsObject[colorName].sort((a, b) => a.shade - b.shade);

        const values = colorsObject[colorName].map((s) => `'var(${s.cssVariableName})'`).join(',\n    ');
        output += `  ${colorName}: [\n    ${values}\n  ],\n`;
      }
      output += '};\n';

      return output;
    }
  });
}
