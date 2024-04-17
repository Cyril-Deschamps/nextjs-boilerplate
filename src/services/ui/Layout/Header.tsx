import Image from "next/image";
import Link from "next-translate-routes/link";
import { BASE_LINK } from "src/routes";

import logo from "../../../assets/img/logo.png";

const Header = (): JSX.Element => {
  return (
    <header
      className={
        "flex flex-row items-center content-between py-xs px-s md:px-2xl pb-2xl md:pb-2xl"
      }
    >
      <Link href={BASE_LINK}>
        <div className={"w-52 sm:w-80 ml-[-10px] mr-5 shrink-0"}>
          <Image alt={"logo"} loading={"eager"} src={logo} />
        </div>
      </Link>
      <nav
        className={
          "flex sm:flex-row items-center gap-xs sm:gap-m ml-auto shrink flex-col justify-end"
        }
      >
        <p>You can put some things here</p>
      </nav>
    </header>
  );
};

export default Header;
