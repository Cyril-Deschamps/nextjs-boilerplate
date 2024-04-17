import { FunctionComponent, useEffect, useState } from "react";
import { PreviewProps } from "../FileEdit";

const ImagePreview: FunctionComponent<PreviewProps> = ({ file }) => {
  const [url] = useState(() => URL.createObjectURL(file));
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);

  return (
    <canvas
      className={"w-full bg-cover bg-origin-border bg-no-repeat bg-center"}
      height={1}
      style={{ backgroundImage: `url(${url})` }}
      width={1}
    />
  );
};

export default ImagePreview;
