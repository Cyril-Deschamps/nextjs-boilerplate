import { getType } from "mime";

/**
 * This method is used to handle wildcards
 * @param type
 * @param mime
 */
export function isMimeTypeApplicableToType(
  type: string,
  mime: string,
): boolean {
  return type.endsWith("/*")
    ? mime.toLowerCase().indexOf(type.slice(0, -2).toLowerCase()) === 0
    : mime.toLowerCase() === type.toLowerCase();
}

/**
 * Check if a mime type is accepted in an accept attribute (See https://html.spec.whatwg.org/multipage/input.html#file-upload-state-(type=file))
 * @param accept
 * @param mime
 */
export function isMimeTypeAccepted(accept: string, mime: string): boolean {
  const acceptedTypes = accept.split(",").map((at) => at.trim());

  const acceptedMimeTypes = acceptedTypes
    .map((at) => (at.startsWith(".") ? getType(at) : at))
    .filter((at): at is string => at !== null);

  return acceptedMimeTypes.some((at) => isMimeTypeApplicableToType(at, mime));
}

export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}
