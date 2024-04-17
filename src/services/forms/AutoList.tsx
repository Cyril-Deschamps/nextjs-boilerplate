import { ReactNode, useMemo } from "react";
import { useYupField } from "./Form";
import { AnySchema } from "yup";
import { ArrayHelpers, FieldArray, useField } from "formik";

interface Props<T> {
  name: string;
  children: (array: T[], helpers: ArrayHelpers, disabled: boolean) => ReactNode;
}

const AutoList = <T,>({ name, children }: Props<T>): JSX.Element | null => {
  const fieldSchema = useYupField(name) as AnySchema;
  const [{ value }] = useField<Array<T>>(name);

  const isRequired = useMemo(
    () => !!fieldSchema.tests.find((t) => t.OPTIONS.name === "required"),
    [fieldSchema],
  );

  const isDisabled = useMemo(
    () => !!fieldSchema.meta()?.disabled,
    [fieldSchema],
  );

  if (fieldSchema.meta()?.notVisible) return null;

  return (
    <fieldset disabled={isDisabled}>
      <legend>
        {fieldSchema.spec.label}
        {isRequired && "*"}
      </legend>

      <FieldArray name={name}>
        {(arrayHelpers) => children(value, arrayHelpers, isDisabled)}
      </FieldArray>
    </fieldset>
  );
};

export default AutoList;
