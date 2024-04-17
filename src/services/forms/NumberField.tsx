import { FunctionComponent } from "react";
import { FieldAttributes, useField } from "formik";

// Formik has wrong typing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NumberField: FunctionComponent<FieldAttributes<any>> = (props) => {
  const [field, , helper] = useField(props);

  return (
    <input
      {...props}
      {...field}
      onChange={(event) =>
        helper.setValue(
          event.currentTarget.value === ""
            ? null
            : event.currentTarget.valueAsNumber,
        )
      }
      type={"number"}
      value={
        field.value === null || field.value === undefined ? "" : field.value
      }
    />
  );
};

export default NumberField;
