import {
  getNames,
  registerLocale,
  LocalizedCountryNames,
  GetNameOptions,
} from "i18n-iso-countries";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import { compareString } from "../data-structures/array";

interface CountryAPI {
  countriesList: LocalizedCountryNames<GetNameOptions>;
}

export function useCountry(): CountryAPI {
  const { i18n } = useTranslation();

  const locale = i18n.language;

  registerLocale(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("i18n-iso-countries/langs/" + locale),
  );

  const countriesList = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(getNames(locale, { select: "official" })).sort((a, b) =>
          compareString(a[1], b[1]),
        ),
      ),
    [locale],
  );

  return {
    countriesList,
  };
}
