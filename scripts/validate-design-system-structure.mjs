import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const designSystemDir = process.cwd();
const componentsDir = path.join(designSystemDir, 'src', 'components');

if (!existsSync(path.join(componentsDir, 'README.md'))) {
  throw new Error('src/components/README.md is missing');
}

const expectedTopLevelDirs = [
  'primitives',
  'surfaces',
  'layout',
  'feedback',
  'compositions',
  'business-widgets',
];

const topLevelEntries = readdirSync(componentsDir, { withFileTypes: true });
const actualTopLevelDirs = topLevelEntries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const directory of expectedTopLevelDirs) {
  if (!actualTopLevelDirs.includes(directory)) {
    throw new Error(`Missing top-level component layer: ${directory}`);
  }
}

for (const directory of actualTopLevelDirs) {
  if (!expectedTopLevelDirs.includes(directory)) {
    throw new Error(`Unexpected top-level directory in src/components: ${directory}`);
  }
}

for (const entry of topLevelEntries) {
  if (entry.isDirectory() && entry.name.startsWith('ui-')) {
    throw new Error(`Legacy flat component directory still present: ${entry.name}`);
  }
}

const requiredComponentDirs = [
  'primitives/ui-button',
  'surfaces/ui-card',
  'surfaces/ui-panel',
  'layout/ui-stack',
  'layout/ui-page-section',
  'feedback/ui-chip',
  'feedback/ui-badge',
  'compositions/ui-toolbar',
  'business-widgets/calendar/ui-calendar',
  'business-widgets/calendar/ui-calendar-toolbar',
  'business-widgets/calendar/ui-calendar-month-view',
  'business-widgets/calendar/ui-calendar-day-view',
  'business-widgets/calendar/ui-calendar-week-view',
  'business-widgets/calendar/ui-calendar-day-cell',
  'business-widgets/calendar/ui-calendar-event-chip',
  'business-widgets/calendar/shared',
  'business-widgets/kanban/ui-kanban-board',
  'business-widgets/kanban/ui-kanban-column',
  'business-widgets/kanban/ui-kanban-card',
  'business-widgets/kanban/shared',
];

for (const relativePath of requiredComponentDirs) {
  const absolutePath = path.join(componentsDir, relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing required component directory: ${relativePath}`);
  }
}

for (const relativePath of [
  'business-widgets/calendar/shared/calendar-utils.ts',
  'business-widgets/calendar/shared/calendar-utils.spec.ts',
  'business-widgets/kanban/shared/kanban-types.ts',
  'business-widgets/kanban/shared/kanban-utils.ts',
  'business-widgets/kanban/shared/kanban-utils.spec.ts',
]) {
  const absolutePath = path.join(componentsDir, relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing required calendar shared file: ${relativePath}`);
  }
}

const sharedStylesheet = path.join(designSystemDir, 'src', 'styles.css');
if (!existsSync(sharedStylesheet)) {
  throw new Error('src/styles.css is missing');
}

const sharedStylesheetContents = readFileSync(sharedStylesheet, 'utf8');

for (const leakedSelector of ['.ui-page', '.ui-topbar', '.ui-hero', '.ui-grid', '.mobile-shell']) {
  if (sharedStylesheetContents.includes(leakedSelector)) {
    throw new Error(`App-specific selector leaked into design-system src/styles.css: ${leakedSelector}`);
  }
}

console.log('design-system structure checks passed');
