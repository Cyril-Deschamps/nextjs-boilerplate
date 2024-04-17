import "react-i18next";

import website from "./website/en.json";
import validations from "../validations/i18n/en.json";
import pages_content from "./pages_content/en.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "website";
    resources: {
      website: typeof website;
      validations: typeof validations;
      pages_content: typeof pages_content;
    };
  }
}
