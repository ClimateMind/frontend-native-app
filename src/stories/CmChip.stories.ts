import type { Meta } from '@storybook/react';

import { CmChip } from '@shared/components';

const meta: Meta<typeof CmChip> = {
  title: 'components/CmChip',
  component: CmChip,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Default Chip',
  },
};

export default meta;
