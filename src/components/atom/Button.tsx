import * as React from "react";
import MuiBtn, { ButtonProps as MuiBtnProps } from "@material-ui/core/Button";

export type ButtonProps = {} & MuiBtnProps;

/**
 * Button
 */
export const Button: React.FC<ButtonProps> = (props) => {
  return <MuiBtn {...props} />;
};
