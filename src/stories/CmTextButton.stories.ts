import type { Meta } from '@storybook/react';

import { CmTextButton } from '@shared/components';

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
    text: 'Text Button',
  },
};

export const Disabled = {
  args: {
    text: 'Disabled Button',
    disabled: true,
  },
};

export const WithLineBreaks = {
  args: {
    text: 'Text\nButton',
  },
};

export default meta;
