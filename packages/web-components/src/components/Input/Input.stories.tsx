import { type Meta, type StoryFn } from "@storybook/react";

import Input from "./Input.tsx";

const meta = {
  title: "Input",
  component: Input,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryFn<typeof meta>;

const helpText = "You can set help text here";

export const Default: Story = () => (
  <div className="flex flex-wrap gap-6">
    <Input placeholder="Default" />

    <Input disabled placeholder="Disabled" />

    <Input status="info" placeholder="Info" help={helpText} />

    <Input status="warning" placeholder="Warning" help={helpText} />

    <Input status="success" placeholder="Success" help={helpText} />

    <Input status="error" placeholder="Error" help={helpText} />
  </div>
);
