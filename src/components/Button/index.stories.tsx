import { Meta, Story } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from ".";

export default {
  title: "components/Button",
  component: Button,
} as Meta;

const Tmp: Story<ButtonProps> = (args) => (
  <Button variant="contained" children="Button" {...args} />
);
export const Base = Tmp.bind({});
