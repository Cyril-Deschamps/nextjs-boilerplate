import { BLOG_LINK } from "..";

export const ARTICLES = "/articles" as const;
export const ARTICLES_LINK = `${BLOG_LINK}${ARTICLES}` as const;

export const ADMIN_ARTICLES =
  "/admin-its-a-fucking-route-to-manage-article" as const;
export const ADMIN_ARTICLES_LINK = `${BLOG_LINK}${ADMIN_ARTICLES}` as const;
