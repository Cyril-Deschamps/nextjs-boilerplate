import classNames from "classnames";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: ReactNode;
  className?: string;
}

const AppLayout = ({
  children,
  className = "flex flex-col items-center",
}: Props): JSX.Element => {
  return (
    <>
      <Header />
      <main className={classNames(className, "grow")}>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
