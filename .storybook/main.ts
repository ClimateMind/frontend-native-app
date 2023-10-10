const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '../src/stories/**/*.mdx',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [
    { from: '../src/assets/fonts', to: 'fonts' },
    { from: '../src/assets', to: 'assets' },
  ],
  webpackFinal: async (config) => {
    config.resolve!.plugins = [new TsconfigPathsPlugin()];
    return config;
  },
};
export default config;
