import classNames from "classnames";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import iconChevronDown from "../../assets/img/icons/icon-chevron-down-white.svg";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 1000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={classNames(
        "fixed bottom-xl lg:bottom-2xl right-xl lg:right-4xl transition-all duration-500 ease-in-out z-50 opacity-0 pointer-events-none overflow-hidden rounded-full shadow",
        isVisible ? "visible opacity-100 pointer-events-auto" : undefined,
      )}
    >
      <button
        className={
          "bg-blue text-white h-10 w-10 focus:outline-none opacity-100 flex justify-center items-center"
        }
        onClick={scrollToTop}
      >
        <Image
          alt={"scroll to top"}
          className={"-scale-100 pt-1"}
          src={iconChevronDown}
        />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
