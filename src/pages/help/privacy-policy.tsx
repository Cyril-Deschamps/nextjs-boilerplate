import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../../next-i18next.config";
import { Trans, useTranslation } from "next-i18next";
import AppLayout from "../../services/ui/Layout/AppLayout";
import SizedSection from "../../services/ui/SizedSection";
import Title2 from "../../services/ui/Title2";
import Title1 from "../../services/ui/Title1";
import BaseSeo from "../../services/seo/BaseSeo";

const LegalNotice = (): JSX.Element => {
  const { t } = useTranslation(["pages_content", "website"]);

  return (
    <AppLayout>
      <BaseSeo
        description={t("pages_content:privacy_policy.page_title")}
        title={t("pages_content:privacy_policy.page_title")}
      />
      <SizedSection className={"mb-xl"} little>
        <div className={"bg-white rounded-3xl p-xl"}>
          <Trans
            components={{
              Title1: <Title1 className={"text-center"} />,
              Title2: <Title2 />,
              ul: <ul className={"list-disc p-l"} />,
              li: <li />,
            }}
          >
            {t("pages_content:privacy_policy.description")}
          </Trans>
        </div>
      </SizedSection>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? "en",
      ["website", "pages_content"],
      nextI18NextConfig,
    )),
  },
});

export default LegalNotice;
