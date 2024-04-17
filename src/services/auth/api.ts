import axios from "axios";
import { baseURL } from "./config";
import logger from "./logger";
import { parse as parseContentDisposition } from "content-disposition";

const baseAPI = axios.create({
  baseURL,
  xsrfCookieName: "XSRF-TOKEN",
  url: "/",
  headers: {},
  timeout: 10000,
  withCredentials: true,
});

baseAPI.interceptors.response.use(
  (response) => {
    logger.debug(response.config.url, response.data);
    return response;
  },
  (error) => {
    logger.debug(error.config.url, error.data);
    return Promise.reject(error);
  },
);

export interface ObjectURL {
  url: string;
  name?: string;
}

/**
 * Remember to revoke ObjectURL.url when done
 * @param url
 */
export function getObjectURL(url: string): Promise<ObjectURL> {
  return baseAPI
    .get(url, {
      responseType: "blob",
    })
    .then((res) => {
      return {
        url: window.URL.createObjectURL(
          new Blob([res.data], { type: res.headers["content-type"] }),
        ),
        name: parseContentDisposition(res.headers["content-disposition"])
          .parameters.filename,
      };
    });
}

export function downloadObjectURL(objectUrl: ObjectURL): void {
  const anchor = window.document.createElement("a");
  anchor.href = objectUrl.url;
  if (objectUrl.name) anchor.setAttribute("download", objectUrl.name);

  window.document.body.appendChild(anchor);
  anchor.click();
  window.document.body.removeChild(anchor);
  window.URL.revokeObjectURL(objectUrl.url);
}

export function download(url: string): Promise<void> {
  return getObjectURL(url).then(downloadObjectURL);
}

export default baseAPI;
