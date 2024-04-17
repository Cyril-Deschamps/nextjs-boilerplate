import classNames from "classnames";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Divider = ({ className, ...props }: Props): JSX.Element => {
  return (
    <div {...props} className={classNames(className, "h-[1px] bg-gray-300")} />
  );
};

export default Divider;
