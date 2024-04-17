import { FunctionComponent, ReactNode } from "react";
import iconCloseGrey from "../../assets/img/icons/icon-close-grey.svg";
import { createPortal } from "react-dom";
import Image from "next/image";

interface Props {
  children: ReactNode;
  onClose?(): void;
}

const Lightbox: FunctionComponent<Props> = ({ children, onClose }) => {
  const template = (
    <div className={"lightbox"} onClick={onClose}>
      {onClose && (
        <button className={"close-btn"} onClick={onClose}>
          <Image alt={"Fermer"} className={"icon"} src={iconCloseGrey} />
        </button>
      )}
      <div
        className={"content-wrapper"}
        onClick={(event) => {
          if (event.target !== event.currentTarget) event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(template, document.body);
};

export default Lightbox;
