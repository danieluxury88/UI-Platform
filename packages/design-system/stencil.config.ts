import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ui-platform-design-system',
  globalStyle: 'src/styles.css',
  taskQueue: {
    concurrency: 4,
  },
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-json',
      file: 'dist/docs.json',
    },
  ],
};
