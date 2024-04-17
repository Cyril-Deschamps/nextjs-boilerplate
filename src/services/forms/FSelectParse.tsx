import classNames from "classnames";
import { Field, FieldProps } from "formik";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import chevronIcon from "../../assets/img/icons/icon-chevron-down.svg";

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  className?: string;
  name: string;
  type?: "number" | "float" | "string";
  parse?(val: string): unknown;
}

const FSelectParse: FunctionComponent<Props> = ({
  className,
  name,
  children,
  type = "number",
  parse = type === "string"
    ? (v) => (v === "" ? null : v)
    : type === "number"
    ? (v) => (v.length !== 0 ? parseInt(v, 10) : null)
    : (v) => (v.length !== 0 ? parseFloat(v) : null),
  ...otherProps
}) => {
  return (
    <Field name={name}>
      {({
        field: { value },
        form: { setFieldValue, setFieldTouched },
      }: FieldProps) => (
        <div className={"relative"}>
          <select
            className={classNames("pr-7", className)}
            onBlur={() => setFieldTouched(name)}
            onChange={(event) => setFieldValue(name, parse(event.target.value))}
            value={value === null ? "" : value}
            {...otherProps}
          >
            {children}
          </select>{" "}
          <div
            className={
              "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            }
          >
            <Image alt={"chevron-down"} className={"w-3"} src={chevronIcon} />
          </div>
        </div>
      )}
    </Field>
  );
};

export default FSelectParse;
