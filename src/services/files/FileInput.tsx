import React, { useEffect, useRef, useState } from "react";
import { isMimeTypeAccepted } from "./utils";

export interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "onChange"
  > {
  onChange(list: FileList): void;
  dragLabel?: string;
}

function hasUnacceptedFiles(items: DataTransferItemList, accept: string) {
  for (let i = 0; i < items.length; i++) {
    if (!isMimeTypeAccepted(accept, items[i].type)) {
      return true;
    }
  }
  return false;
}

const FileInput: React.FC<Props> = (props) => {
  const fileZone = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragCountRef = useRef<number>(0);
  const [impossible, setImpossible] = useState(false);

  const { onChange, accept, multiple, dragLabel, ...otherProps } = props;
  // Handle input change
  useEffect(() => {
    const inputFile = inputFileRef.current as HTMLInputElement;
    const handleChange = () => {
      if (inputFile.files && inputFile.files.length > 0)
        onChange(inputFile.files);
    };

    inputFile.addEventListener("change", handleChange);
    return () => {
      inputFile.removeEventListener("change", handleChange);
    };
  }, [inputFileRef, onChange]);

  // Handle drag and drop
  useEffect(() => {
    const div = fileZone.current as HTMLDivElement;
    const handlers = {
      dragenter(e: DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        dragCountRef.current++;
        if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
          setDragging(true);

          setImpossible(
            (accept && hasUnacceptedFiles(e.dataTransfer.items, accept)) ||
              (!multiple && e.dataTransfer.items.length > 1),
          );
        }
      },
      dragleave(e: DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        dragCountRef.current--;
        if (dragCountRef.current === 0) {
          setDragging(false);
          setImpossible(false);
        }
      },
      dragover(e: DragEvent) {
        e.preventDefault();
        e.stopPropagation();
      },
      drop(e: DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        setImpossible(false);
        if (
          e.dataTransfer?.files &&
          e.dataTransfer.files.length > 0 &&
          (!accept || !hasUnacceptedFiles(e.dataTransfer.items, accept)) &&
          (multiple || e.dataTransfer.files.length === 1)
        ) {
          onChange(e.dataTransfer.files);
        }
        dragCountRef.current = 0;
      },
    };
    Object.entries(handlers).map(([key, value]) =>
      div.addEventListener(
        key as "dragenter" | "dragleave" | "dragover" | "drop",
        value,
      ),
    );

    return () => {
      if (div) {
        Object.entries(handlers).map(([key, value]) =>
          div.removeEventListener(
            key as "dragenter" | "dragleave" | "dragover" | "drop",
            value,
          ),
        );
      }
    };
  }, [fileZone, onChange, accept, multiple]);

  return (
    <div
      ref={fileZone}
      className={`${dragging && "active"} bg-gray-100 rounded p-s`}
    >
      {dragLabel
        ? dragLabel
        : `Déposez ${multiple ? "vos fichiers" : "votre fichier"} ici`}
      <div>ou</div>
      <label className={"underline"}>
        Recherchez sur votre ordinateur
        <input
          accept={accept}
          multiple={multiple}
          type={"file"}
          hidden
          {...otherProps}
          ref={inputFileRef}
        />
      </label>
      {impossible && <p>Impossible de placer ce type de fichier</p>}
    </div>
  );
};

export default FileInput;
