import { ADMIN_ARTICLES_LINK } from "..";

export const ADMIN_NEW_ARTICLE = "/articles/create" as const;
export const ADMIN_NEW_ARTICLE_LINK =
  `${ADMIN_ARTICLES_LINK}${ADMIN_NEW_ARTICLE}` as const;

export const ADMIN_EDIT_ARTICLE = "/articles/:articleSlug" as const;
export const ADMIN_EDIT_ARTICLE_LINK =
  `${ADMIN_ARTICLES_LINK}${ADMIN_EDIT_ARTICLE}` as const;
