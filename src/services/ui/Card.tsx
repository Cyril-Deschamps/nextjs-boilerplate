import classNames from "classnames";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Card = ({ className, children, ...props }: Props): JSX.Element => {
  return (
    <div
      {...props}
      className={classNames(
        className,
        "w-11/12 max-w-6xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mb-m",
      )}
    >
      {children}
    </div>
  );
};

export default Card;
