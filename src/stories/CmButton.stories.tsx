import type { Meta } from '@storybook/react';

import { CmButton } from 'src/components';

const meta: Meta<typeof CmButton> = {
  title: 'components/Buttons/CmButton',
  component: CmButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    text: 'Default Button',
  },
}

export const Error = {
  args: {
    text: 'Error Button',
    color: 'error',
  },
}

export const WithIcon = {
  args: {
    text: 'Button With Icon',
    startIcon: <img src="assets/cm-logo.png" width={24} />,
  },
}

export const WithLineBreaks = {
  args: {
    text: 'Button With\nLine Breaks',
  },
}

export default meta;
