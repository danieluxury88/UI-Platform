import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const modeIndex = process.argv.indexOf('--mode');
const mode = modeIndex >= 0 ? process.argv[modeIndex + 1] : 'validate';
const tokensDir = process.cwd();

const exportedFile = path.join(tokensDir, 'tokens.css');
const sourceFile = path.join(tokensDir, 'src', 'tokens.css');

for (const absolutePath of [exportedFile, sourceFile, path.join(tokensDir, 'package.json')]) {
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${path.relative(tokensDir, absolutePath)}`);
  }
  if (statSync(absolutePath).size === 0) {
    throw new Error(`Required file is empty: ${path.relative(tokensDir, absolutePath)}`);
  }
}

const exportedCss = readFileSync(exportedFile, 'utf8').trim();
const sourceCss = readFileSync(sourceFile, 'utf8');

if (exportedCss !== "@import url('./src/tokens.css');") {
  throw new Error('tokens.css must re-export src/tokens.css with a single import statement');
}

const requiredSelectors = [':root', "[data-theme='dark']"];
for (const selector of requiredSelectors) {
  if (!sourceCss.includes(selector)) {
    throw new Error(`src/tokens.css is missing required selector: ${selector}`);
  }
}

const requiredTokens = [
  '--ui-color-bg',
  '--ui-color-surface',
  '--ui-color-surface-elevated',
  '--ui-color-text',
  '--ui-color-text-muted',
  '--ui-color-accent',
  '--ui-color-border',
  '--ui-space-4',
  '--ui-radius-md',
  '--ui-shadow-1',
  '--ui-font-body',
];

for (const token of requiredTokens) {
  if (!sourceCss.includes(token)) {
    throw new Error(`src/tokens.css is missing required token: ${token}`);
  }
}

console.log(`tokens ${mode} checks passed`);
