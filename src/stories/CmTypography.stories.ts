import type { Meta, StoryObj } from '@storybook/react';

import CmTypography from 'src/components/CmTypography/CmTypography';

const meta: Meta<typeof CmTypography> = {
  title: 'components/CmTypography',
  component: CmTypography,
};

export default meta;
type Story = StoryObj<typeof CmTypography>;

export const Default: Story = {
  args: {
    children: 'Default Text',
  },
};

export const Headline1: Story = {
  args: {
    children: 'Headline 1',
    variant: 'h1',
  },
};

export const Headline2: Story = {
  args: {
    children: 'Headline 2',
    variant: 'h2',
  },
};

export const Headline3: Story = {
  args: {
    children: 'Headline 3',
    variant: 'h3',
  },
};

export const Headline4: Story = {
  args: {
    children: 'Headline 4',
    variant: 'h4',
  },
};

export const Body: Story = {
  args: {
    children: 'Body',
    variant: 'body',
  },
};

export const BodyItalics: Story = {
  args: {
    children: 'Body Italics',
    variant: 'body-italics',
  },
};

export const Button: Story = {
  args: {
    children: 'Button',
    variant: 'button',
  },
};

export const Caption: Story = {
  args: {
    children: 'Caption',
    variant: 'caption',
  },
};

export const Overline: Story = {
  args: {
    children: 'Overline',
    variant: 'overline',
  },
};

export const Label: Story = {
  args: {
    children: 'Label',
    variant: 'label',
  },
};
