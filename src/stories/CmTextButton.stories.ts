import type { Meta } from '@storybook/react';

import { CmTextButton } from 'src/components';

const meta: Meta<typeof CmTextButton> = {
  title: 'components/Buttons/CmTextButton',
  component: CmTextButton,
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

export const WithLineBreaks = {
  args: {
    text: 'Button With\nLine Breaks',
  },
}

export default meta;
