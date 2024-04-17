import { ARTICLES_LINK } from "..";

export const ARTICLE_DETAIL = "/:articleSlug" as const;
export const ARTICLE_DETAIL_LINK = `${ARTICLES_LINK}${ARTICLE_DETAIL}` as const;
