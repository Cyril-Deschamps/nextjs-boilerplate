import Image from "next/image";
import Link from "next-translate-routes/link";
import Divider from "../Divider";
import SizedSection from "../SizedSection";
import { useTranslation } from "next-i18next";
import { AppConfig } from "../../utils/AppConfig";
import {
  HELP_LEGAL_NOTICE_LINK,
  HELP_PRIVACY_POLICY_LINK,
} from "../../../routes/help";
import { BASE_LINK } from "../../../routes";
import logoIco from "../../../assets/img/logo-ico.png";

const Footer = (): JSX.Element => {
  const { t } = useTranslation(["website"]);

  return (
    <footer className={"bg-white pt-3xl pb-m"}>
      <SizedSection>
        <nav className={"flex flex-row justify-between items-center"}>
          <div
            className={"flex flex-row gap-x-3xl gap-y-xs font-medium flex-wrap"}
          >
            <Link href={BASE_LINK}>
              <div className={"whitespace-nowrap w-full md:w-auto"}>
                {t("website:pages.home")}
              </div>
            </Link>
          </div>
          <div
            className={"flex flex-row gap-x-2xl gap-y-l justify-end flex-wrap"}
          >
            You can put external link here
          </div>
        </nav>
        <Divider className={"my-l w-full"} />
        <div
          className={
            "flex flex-row items-center flex-wrap-reverse justify-center md:flex-nowrap gap-m"
          }
        >
          <p
            className={
              "md:basis-full text-center md:text-start text-gray-500 text-xs w-full"
            }
          >
            © {new Date().getFullYear()} {AppConfig.siteName} -{" "}
            {AppConfig.author}. {t("website:footer.all_rights_reserved")}.
          </p>
          <div className={"md:basis-full justify-center flex  w-full"}>
            <Link href={BASE_LINK}>
              <Image alt={"logo"} className={"w-4xl"} src={logoIco} />
            </Link>
          </div>

          <nav
            className={
              "md:basis-full md:justify-end justify-center flex gap-2xl text-gray-500 text-xs  w-full"
            }
          >
            <Link href={HELP_LEGAL_NOTICE_LINK}>
              {t("website:pages.legal_notice")}
            </Link>
            <Link href={HELP_PRIVACY_POLICY_LINK}>
              {t("website:pages.privacy_policy")}
            </Link>
          </nav>
        </div>
      </SizedSection>
    </footer>
  );
};

export default Footer;
