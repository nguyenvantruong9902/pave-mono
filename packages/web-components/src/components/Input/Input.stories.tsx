import { type Meta, type StoryFn } from "@storybook/react";

import Input from "./Input.tsx";
import type { InputProps } from "./types.ts";

const helpText = "You can set help text here";

const meta = {
  title: "Input",
  component: Input,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    status: {
      options: ["info", "warning", "error", "success"],
      control: "select",
    },
  },
  args: {
    label: "Label",
    name: "input",
    help: helpText,
    status: undefined,
    disabled: false,
    readOnly: false,
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryFn<typeof meta>;

export const Default: Story = (props: InputProps) => (
  <div className="flex flex-wrap gap-6">
    <Input {...props} />

    <Input {...props} />
  </div>
);
