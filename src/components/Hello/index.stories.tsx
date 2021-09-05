import { Meta, Story } from "@storybook/react";
import { Hello, HelloProps } from ".";

export default {
  title: "components/Hello",
  component: Hello,
} as Meta;

const Tmp: Story<HelloProps> = () => <Hello />;
export const Base = Tmp.bind({});
