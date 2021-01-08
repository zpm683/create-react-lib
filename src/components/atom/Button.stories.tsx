import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from "./Button";

export default {
  title: "atom/button",
  component: Button,
} as Meta;

const Tmp: Story<ButtonProps> = (arg) => <Button {...arg} />;
export const Btn = Tmp.bind({});
