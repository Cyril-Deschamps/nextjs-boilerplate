import { fileUrlToUrl, useRouter } from "next-translate-routes";
import Head from "next/head";
import React, { ReactNode } from "react";
import { jsonLdScriptProps } from "react-schemaorg";
import { WebPage } from "schema-dts";
import { hostBaseURL } from "../auth/config";
import { AppConfig } from "../utils/AppConfig";

interface BaseSeoProps {
  title?: string;
  noBaseTitle?: boolean;
  description?: string;
  children?: ReactNode;
  translated?: boolean;
  noIndex?: boolean;
}

const BaseSeo = ({
  title,
  noBaseTitle = false,
  description,
  children,
  translated = true,
  noIndex = false,
}: BaseSeoProps): JSX.Element => {
  const { pathname, query, locales, locale, defaultLocale } = useRouter();

  const queryString = Object.entries(query)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        value as string,
      )}`;
    })
    .join("&");

  const completePathname = `${pathname}?${queryString}`;

  return (
    <>
      <Head>
        {translated &&
          locales?.map(
            (l) =>
              l !== defaultLocale && (
                <link
                  key={l}
                  href={`${hostBaseURL}${fileUrlToUrl({ pathname, query }, l)}`}
                  hrefLang={l}
                  rel={"alternate"}
                />
              ),
          )}
        <title key={"title"}>{`${
          noBaseTitle ? "" : AppConfig.siteName + " - "
        }${title}`}</title>
        <meta content={description} name={"description"} />
        {noIndex && <meta content={"noindex,nofollow"} name={"robots"} />}
        <meta content={"website"} property={"og:type"} />
        <meta
          content={`${AppConfig.siteName} - ${title}`}
          property={"og:title"}
        />
        <meta content={description} property={"og:description"} />
        <meta
          content={`${hostBaseURL}/assets/logo.png`}
          property={"og:image"}
        />
        <meta
          content={`${hostBaseURL}${
            translated
              ? fileUrlToUrl({ pathname, query }, locale!)
              : completePathname
          }`}
          property={"og:url"}
        />
        <script
          {...jsonLdScriptProps<WebPage>({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${hostBaseURL}${
              translated
                ? fileUrlToUrl({ pathname, query }, locale!)
                : completePathname
            }/#webpage`,
            url: `${hostBaseURL}${
              translated
                ? fileUrlToUrl({ pathname, query }, locale!)
                : completePathname
            }`,
            name: "todochangeprojectname",
          })}
        />
        {children}
      </Head>
    </>
  );
};

export default BaseSeo;
