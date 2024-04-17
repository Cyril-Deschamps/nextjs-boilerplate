import classNames from "classnames";
import { Field, FieldProps } from "formik";
import React, { FunctionComponent } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  className?: string;
  name: string;
}

const FSelectString: FunctionComponent<Props> = ({
  className,
  name,
  children,
  ...otherProps
}) => {
  return (
    <Field name={name}>
      {({
        field: { value },
        form: { setFieldValue, setFieldTouched },
      }: FieldProps) => (
        <select
          className={classNames("select", className)}
          onBlur={() => setFieldTouched(name)}
          onChange={(event) => setFieldValue(name, event.target.value)}
          value={value === null ? "" : value}
          {...otherProps}
        >
          {children}
        </select>
      )}
    </Field>
  );
};

export default FSelectString;
