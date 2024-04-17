import React, { FunctionComponent } from "react";
import FileInput, { Props as FileInputProps } from "./FileInput";
import FileEdit from "./FileEdit";

interface Props extends Omit<FileInputProps, "onChange"> {
  onChange?(file: File | null): void;
  file: File | null;
}

const FileZoneUnique: FunctionComponent<Props> = (props) => {
  const { file, onChange, ...otherProps } = props;

  return (
    <div>
      {file ? (
        <>
          <FileEdit
            editName={(newName) => {
              onChange?.(
                new File([file], newName, {
                  type: file.type,
                  lastModified: file.lastModified,
                }),
              );
            }}
            file={file}
          />
          <button onClick={() => onChange?.(null)}>supprimer</button>
        </>
      ) : (
        <FileInput
          onChange={(addedFiles) => {
            if (addedFiles.length > 0) onChange?.(addedFiles[0]);
          }}
          {...otherProps}
        />
      )}
    </div>
  );
};

export default FileZoneUnique;
