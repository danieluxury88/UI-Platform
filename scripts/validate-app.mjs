import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const modeIndex = process.argv.indexOf('--mode');
const mode = modeIndex >= 0 ? process.argv[modeIndex + 1] : 'validate';
const appDir = process.cwd();
const appName = path.basename(appDir);

const requiredFiles = ['index.html', 'app.js', 'styles.css', 'package.json'];

for (const relativePath of requiredFiles) {
  const absolutePath = path.join(appDir, relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
  if (statSync(absolutePath).size === 0) {
    throw new Error(`Required file is empty: ${relativePath}`);
  }
}

new Function(readFileSync(path.join(appDir, 'app.js'), 'utf8'));

const html = readFileSync(path.join(appDir, 'index.html'), 'utf8');
const appJs = readFileSync(path.join(appDir, 'app.js'), 'utf8');

const requiredHtmlSnippets = [
  '../../packages/tokens/tokens.css',
  '../../packages/design-system/styles.css',
  './styles.css',
  './app.js',
  'meta name="theme-color"',
];

for (const snippet of requiredHtmlSnippets) {
  if (!html.includes(snippet)) {
    throw new Error(`index.html is missing required reference: ${snippet}`);
  }
}

const idPattern = /getElementById\(\s*'([^']+)'\s*\)/g;
const requiredIds = new Set();

for (const match of appJs.matchAll(idPattern)) {
  requiredIds.add(match[1]);
}

for (const id of requiredIds) {
  const doubleQuoted = `id="${id}"`;
  const singleQuoted = `id='${id}'`;
  if (!html.includes(doubleQuoted) && !html.includes(singleQuoted)) {
    throw new Error(`index.html is missing element id referenced in app.js: ${id}`);
  }
}

const loaderMatch = appJs.match(/const designSystemLoaderPath = '([^']+)'/);
if (!loaderMatch) {
  throw new Error('app.js is missing designSystemLoaderPath');
}

const designSystemLoaderPath = path.normalize(loaderMatch[1]);
const expectedLoaderSuffix = path.normalize('../../packages/design-system/dist/loader/index.js');

if (designSystemLoaderPath !== expectedLoaderSuffix) {
  throw new Error(`Unexpected design-system loader path: ${loaderMatch[1]}`);
}

console.log(`${appName} ${mode} checks passed`);
