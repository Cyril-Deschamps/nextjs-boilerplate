import React, { FunctionComponent } from "react";
import FileEdit from "./FileEdit";
import FileInput from "./FileInput";
import { Props as FileInputProps } from "./FileInput";

interface Props extends Omit<FileInputProps, "onChange"> {
  onChange?(files: File[]): void;
  files?: File[];
  readonly?: boolean;
}

const FileZone: FunctionComponent<Props> = (props) => {
  const { files, onChange, readonly, ...otherProps } = props;

  return (
    <div>
      <div className={"flex flex-row"}>
        {(files || []).map((file, index) => (
          <FileEdit
            key={index}
            editName={(newName) => {
              const newFiles = files ? [...files] : [];
              const idx = newFiles.indexOf(file);
              newFiles[idx] = new File([newFiles[idx]], newName, {
                type: file.type,
                lastModified: file.lastModified,
              });
              onChange?.(newFiles);
            }}
            file={file}
          />
        ))}
      </div>

      {!readonly && (
        <FileInput
          onChange={(addedFiles) => {
            onChange?.((files || []).concat(...addedFiles));
          }}
          {...otherProps}
        />
      )}
    </div>
  );
};

export default FileZone;
