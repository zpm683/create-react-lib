import * as React from "react";
import MuiButton, {
  ButtonProps as MuiBtnProps,
} from "@material-ui/core/Button";

export type ButtonProps = {} & MuiBtnProps;

/**
 * Button
 */
export const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButton {...props} />;
};
