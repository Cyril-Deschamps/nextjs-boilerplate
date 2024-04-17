import { getObjectURL, ObjectURL } from "../auth/api";
import { useEffect, useState } from "react";
import { PartialNullable } from "../types/utility";

const useFileAsObjectURL: (
  objectURL: PartialNullable<ObjectURL>,
) => ObjectURL | null = (objectURL) => {
  const [newObjectURL, setNewObjectURL] = useState<ObjectURL | null>(null);

  useEffect(() => {
    let tmpObjectURL: ObjectURL | undefined;
    if (objectURL.url?.startsWith("http")) {
      getObjectURL(objectURL.url).then(
        (objectURL) => {
          setNewObjectURL(objectURL);
          tmpObjectURL = objectURL;
        },
        () => {
          // Catch silently
        },
      );
    } else {
      setNewObjectURL(objectURL.url ? (objectURL as ObjectURL) : null);
    }

    return () => {
      if (tmpObjectURL?.url.startsWith("blob:"))
        URL.revokeObjectURL(tmpObjectURL.url);
    };
  }, [objectURL.url]); // eslint-disable-line react-hooks/exhaustive-deps

  return newObjectURL;
};

export default useFileAsObjectURL;
