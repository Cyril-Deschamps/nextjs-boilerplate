import classNames from "classnames";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {}

const TitleLegend = ({ className, ...props }: Props): JSX.Element => {
  return (
    <p
      {...props}
      className={classNames(className, "font-VarsityTeam text-s text-blue")}
    />
  );
};

export default TitleLegend;
