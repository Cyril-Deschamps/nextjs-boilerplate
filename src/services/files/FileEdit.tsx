import React, { ReactElement, useState } from "react";
import GenericFilePreview from "./preview/GenericFilePreview";
import ImagePreview from "./preview/ImagePreview";

export interface PreviewProps {
  file: Blob;
}

export function renderPreview(file: PreviewProps["file"]): ReactElement {
  switch (file.type) {
    case "image/png":
    case "image/jpeg":
      return <ImagePreview file={file} />;
    default:
      return <GenericFilePreview file={file} />;
  }
}

interface Props {
  file: File;
  editName?(fileName: string): void;
}

const FileEdit: React.FC<Props> = ({ file, editName }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <div className={"max-w-full max-h-full"}>{renderPreview(file)}</div>
      {editing ? (
        <input
          onChange={(ev) => editName?.(ev.target.value)}
          value={file.name}
        />
      ) : (
        <div className={"underline"}>{file.name}</div>
      )}
      <button onClick={() => setEditing(!editing)} type={"button"}>
        Editer
      </button>
    </div>
  );
};

export default FileEdit;
