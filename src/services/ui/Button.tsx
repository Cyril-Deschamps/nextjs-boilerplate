import classNames from "classnames";
import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, children, ...props }: Props): JSX.Element => {
  return (
    <button
      {...props}
      className={classNames(
        className,
        "text-white bg-light-blue hover:bg-blue focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center",
      )}
    >
      {children}
    </button>
  );
};

export default Button;
