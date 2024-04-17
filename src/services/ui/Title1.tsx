import classNames from "classnames";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

const Title1 = ({ className, ...props }: Props): JSX.Element => {
  return (
    <h1
      {...props}
      className={classNames(
        className,
        "text-3xl lg:text-4xl xl:text-5xl font-VarsityTeam leading-8 md:leading-10",
      )}
    />
  );
};

export default Title1;
