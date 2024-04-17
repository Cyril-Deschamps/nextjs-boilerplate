import { FunctionComponent } from "react";
import { FieldAttributes, useField } from "formik";

// Formik has wrong typing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextareaField: FunctionComponent<FieldAttributes<any>> = (props) => {
  const [field, , helper] = useField(props);

  return (
    <textarea
      {...props}
      {...field}
      onChange={(event) =>
        helper.setValue(
          event.currentTarget.value === "" ? null : event.currentTarget.value,
        )
      }
      value={
        field.value === null || field.value === undefined ? "" : field.value
      }
    />
  );
};

export default TextareaField;
