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

export const Default: Story = () => (
  <div className="flex w-5xl h-[500px] flex-col gap-y-6">
    <Input />
  </div>
);
