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
    <Input label="Default" placeholder="Default" />

    <Input readOnly label="Readonly" placeholder="Readonly" />

    <Input disabled label="Disabled" placeholder="Disabled" />

    <Input status="info" label="Info" placeholder="Info" help={helpText} />

    <Input
      status="warning"
      label="Warning"
      placeholder="Warning"
      help={helpText}
    />

    <Input
      status="success"
      label="Success"
      placeholder="Success"
      help={helpText}
    />

    <Input status="error" label="Error" placeholder="Error" help={helpText} />
  </div>
);
