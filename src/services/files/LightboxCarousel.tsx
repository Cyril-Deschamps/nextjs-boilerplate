import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { PartialNullable } from "../types/utility";
import { getObjectURL, ObjectURL } from "../auth/api";
import Lightbox from "./Lightbox";
import Loading from "../routing/components/Loading";
import LoaderErrors from "../routing/components/LoaderErrors";
import chevronIcon from "../../assets/img/icons/icon-chevron-down-white.svg";
import Image from "next/image";

const LightboxWrapper: FunctionComponent<{
  file: Props["files"][number];
  visible: boolean;
}> = ({ file, visible }) => {
  const [loadingState, setLoadingState] = useState<{
    objectURL: ObjectURL | null;
    error: unknown;
  }>({ objectURL: null, error: null });

  const reload = useCallback(() => {
    setLoadingState({ objectURL: null, error: null });
    let tmpObjectURL: ObjectURL | undefined;
    if (file.url?.startsWith("http")) {
      getObjectURL(file.url).then(
        (objectURL) => {
          setLoadingState({ objectURL, error: null });
          tmpObjectURL = objectURL;
        },
        (error) => {
          setLoadingState({ objectURL: null, error });
        },
      );
    } else {
      setLoadingState({
        objectURL: file.url ? (file as ObjectURL) : null,
        error: null,
      });
    }

    return () => {
      if (tmpObjectURL?.url.startsWith("blob:"))
        URL.revokeObjectURL(tmpObjectURL.url);
    };
  }, [file]);

  useEffect(reload, [reload]);

  if (visible) {
    if (loadingState.error)
      return <LoaderErrors error={loadingState.error} reload={reload} />;
    if (!loadingState.objectURL) return <Loading />;

    return (
      <Image
        alt={loadingState.objectURL.name ?? ""}
        src={loadingState.objectURL.url}
      />
    );
  }
  return null;
};

interface Props {
  files: PartialNullable<ObjectURL>[];
  defaultFileDisplayed?: number;
  onClose?(): void;
}

const LightboxCarousel: FunctionComponent<Props> = ({
  files,
  defaultFileDisplayed = 0,
  onClose,
}) => {
  const [displayedFile, setDisplayedFile] = useState(defaultFileDisplayed);

  return (
    <Lightbox onClose={onClose}>
      {displayedFile > 0 && (
        <button
          className={"btn-prev"}
          onClick={() => setDisplayedFile((index) => index - 1)}
        >
          <Image alt={"précédent"} src={chevronIcon} />
        </button>
      )}
      {files.map((file, index) => (
        <LightboxWrapper
          key={index}
          file={file}
          visible={index === displayedFile}
        />
      ))}
      {displayedFile < files.length - 1 && (
        <button
          className={"btn-next"}
          onClick={() => setDisplayedFile((index) => index + 1)}
        >
          <Image alt={"suivant"} src={chevronIcon} />
        </button>
      )}
    </Lightbox>
  );
};

export default LightboxCarousel;
