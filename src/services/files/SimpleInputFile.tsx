import React, { useEffect, useRef } from "react";

export interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "onChange"
  > {
  onChange(list: FileList): void;
}

const SimpleInputFile: React.FC<Props> = (props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { onChange, accept, ...otherProps } = props;
  // Handle input change
  useEffect(() => {
    const inputFile = inputFileRef.current as HTMLInputElement;
    const handleChange = () => {
      if (inputFile.files && inputFile.files.length > 0)
        onChange(inputFile.files);
      inputFile.value = "";
    };

    inputFile.addEventListener("change", handleChange);
    return () => {
      inputFile.removeEventListener("change", handleChange);
    };
  }, [inputFileRef, onChange]);

  return (
    <input
      accept={accept}
      type={"file"}
      hidden
      {...otherProps}
      ref={inputFileRef}
    />
  );
};

export default SimpleInputFile;
