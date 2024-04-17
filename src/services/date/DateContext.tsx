import { fr, enUS } from "date-fns/locale";
import { useTranslation } from "next-i18next";
import { format, Locale } from "date-fns";

interface DateAPI {
  locale: Locale;
  formatDate: (
    date: Date,
    dateFormat?: string,
    options?: DateFNSFormatOptions,
  ) => string;
}

type DateFNSFormatOptions = {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: number;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
};

const LOCALES: Record<string, Locale> = {
  fr: fr,
  en: enUS,
};

export function useDate(): DateAPI {
  const { i18n } = useTranslation();

  const locale = LOCALES[i18n.language] || fr;

  const formatDate = (
    date: Date,
    dateFormat: string = "PP",
    options: DateFNSFormatOptions = { locale },
  ) => {
    return format(date, dateFormat, options);
  };

  return {
    locale,
    formatDate,
  };
}
