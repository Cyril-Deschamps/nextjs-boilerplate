import classNames from "classnames";
import { useRouter } from "next-translate-routes";
import Image from "next/image";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import goBackIcon from "../../assets/img/icons/icon-chevron-left.svg";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  goBack?: boolean;
}

const CardHeader = ({
  className,
  children,
  goBack = false,
  ...props
}: Props): JSX.Element => {
  const router = useRouter();
  return (
    <div
      {...props}
      className={classNames(className, "flex flex-row gap-s pb-s ")}
    >
      {goBack && (
        <button onClick={() => router.back()}>
          <Image alt={"go back"} src={goBackIcon} />
        </button>
      )}
      {children}
    </div>
  );
};

export default CardHeader;
