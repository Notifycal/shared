/* global console:readonly */

import StyleDictionary from 'style-dictionary';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildColorTokens, isColorToken, registerColorFormats } from './colors.mjs';
import { isFontToken, registerFontFormat } from './typography.mjs';
import { buildTextTokens, isTextToken, registerTextFormat } from './text.mjs';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectDirectory = path.resolve(__dirname, '..');

const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(__dirname, relativePath), 'utf8'));

console.log('Reading tokens...');
const baseColorsJson = readJson('tokens/base-colors.json');
const typographyJson = readJson('tokens/typography.json');
const textSizeJson = readJson('tokens/text.json');

// Build token "variants"
const colorTokens = buildColorTokens(baseColorsJson);
const textTokens = buildTextTokens(textSizeJson);

registerColorFormats(StyleDictionary);
registerFontFormat(StyleDictionary);
registerTextFormat(StyleDictionary);

const allTokens = {
  ...colorTokens,
  ...textTokens,
  ...typographyJson
};

console.log('Initializing Style Dictionary...');
const sd = new StyleDictionary({
  tokens: allTokens,
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: path.join(projectDirectory, 'src', 'styles'),
      files: [
        { destination: '_generated-color-shades.css', format: 'css/variables-theme', filter: isColorToken },
        { destination: '_generated-typography.css', format: 'css/variables-theme-fonts', filter: isFontToken },
        { destination: '_generated-text-sizes.css', format: 'css/variables-theme-text', filter: isTextToken }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: path.join(projectDirectory, 'src', 'theme'),
      files: [
        { destination: '_generated-colors-mantine.ts', format: 'mantine/color-palette', filter: isColorToken },
        {
          destination: '_generated-unstyle-font-families.ts',
          format: 'unstyle/font-families-array',
          filter: isFontToken
        }
      ]
    }
  }
});

console.log('Building platforms...');
await sd.buildAllPlatforms();

console.log('\n======================================');
console.log('\nBuild completed! Check the output folder.\n');
