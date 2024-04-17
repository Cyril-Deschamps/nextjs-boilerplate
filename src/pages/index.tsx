import React from "react";
import SizedSection from "../services/ui/SizedSection";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../next-i18next.config";
import { Trans, useTranslation } from "next-i18next";
import AppLayout from "../services/ui/Layout/AppLayout";
import BaseSeo from "../services/seo/BaseSeo";
import { jsonLdScriptProps } from "react-schemaorg";
import { Organization } from "schema-dts";
import { hostBaseURL } from "../services/auth/config";
import Title1 from "../services/ui/Title1";

const Home = (): JSX.Element => {
  const { t } = useTranslation(["pages_content", "website"]);

  return (
    <AppLayout>
      <BaseSeo
        description={t("pages_content:home.page_description")}
        title={t("pages_content:home.page_title")}
      >
        <script
          {...jsonLdScriptProps<Organization>({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${hostBaseURL}/#organization`,
            url: hostBaseURL,
            name: "todochangeprojectname",
            logo: `${hostBaseURL}/assets/logo.png`,
          })}
        />
      </BaseSeo>
      <SizedSection
        className={
          "flex flex-row z-10 min-h-[23rem] items-start md:min-h-[26rem] justify-center lg:justify-between"
        }
      >
        <div
          className={
            "ml-xs sm:ml-xl md:ml-0 lg:ml-2xl relative flex flex-col items-center gap-s"
          }
        >
          <Title1
            className={"text-4xl sm:tracking-wide text-center lg:text-start"}
          >
            {t("pages_content:home.main_title")}
          </Title1>
        </div>
      </SizedSection>
      <div
        className={"bg-white w-full flex flex-col items-center pb-6 md:pb-12"}
      >
        <SizedSection
          className={"flex flex-col justify-between lg:flex-row items-center"}
        >
          <div />
          <p
            className={
              "w-full xl:w-[34rem] text-center font-regular text-s leading-5 lg:pt-0 xl:pt-10  max-w-xl"
            }
          >
            <Trans>{t("pages_content:home.main_description")}</Trans>
          </p>
        </SizedSection>
      </div>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? "en",
      ["validations", "pages_content", "website"],
      nextI18NextConfig,
    )),
  },
});

export default Home;
