import { type Meta, type StoryFn } from "@storybook/react";

import { Dropdown } from "./Dropdown.tsx";

const meta = {
  title: "Dropdown",
  component: Dropdown,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryFn<typeof meta>;

export const Default: Story = () => (
  <Dropdown items={[{ value: "1", label: "Option 1" }]} label="Dropdown" />
);
