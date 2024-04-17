import "../assets/styles/global.scss";
import "../services/validations/yup-init";
import "../services/i18n/yupConfig";
import { AppProps } from "next/app";
import React, { useState } from "react";
import { appWithTranslation } from "next-i18next";
import localFont from "next/font/local";
import classNames from "classnames";
import Head from "next/head";
import { Roboto } from "next/font/google";
import nextI18NextConfig from "../../next-i18next.config";
import { withTranslateRoutes } from "next-translate-routes";
import { ProvideToast } from "../services/toast-notifications";
import { ProvideTrip } from "../services/entity-example-boilerplate/tripProvider";
import { GoogleAnalytics } from "nextjs-google-analytics";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AppConfig } from "../services/utils/AppConfig";

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || "";

const varsityTeamFont = localFont({
  src: "../assets/fonts/VarsityTeam.otf",
  variable: "--font-varsity-team",
});
const robotoFont = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 1000 * 60 } },
      }),
  );

  return (
    <React.StrictMode>
      <Head>
        <meta
          content={"width=device-width, initial-scale=1"}
          name={"viewport"}
        />
        <title key={"title"}>{`${AppConfig.siteName}`}</title>
      </Head>
      <div
        className={classNames(
          varsityTeamFont.variable,
          robotoFont.variable,
          "flex flex-col w-full min-h-screen p-0 m-0 bg-appBgColor font-Roboto",
        )}
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ProvideToast>
              <ProvideTrip>
                <GoogleAnalytics
                  gaMeasurementId={GA_MEASUREMENT_ID}
                  strategy={"afterInteractive"}
                  trackPageViews
                />
                <Component {...pageProps} />
              </ProvideTrip>
            </ProvideToast>
          </Hydrate>
        </QueryClientProvider>
      </div>
    </React.StrictMode>
  );
};

export default appWithTranslation(withTranslateRoutes(App), nextI18NextConfig);
