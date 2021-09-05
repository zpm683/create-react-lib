import * as React from "react";
import Typography from "@material-ui/core/Typography";

export interface HelloProps {}

/**
 * Hello
 */
export const Hello: React.FC<HelloProps> = () => {
  return <Typography>Hello!</Typography>;
};
