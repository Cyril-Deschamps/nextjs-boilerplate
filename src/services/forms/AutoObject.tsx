import { ReactNode, useMemo } from "react";
import { useYupField } from "./Form";
import { AnySchema } from "yup";

interface Props {
  name: string;
  children: ReactNode;
}

const AutoObject = ({ name, children }: Props): JSX.Element | null => {
  const fieldSchema = useYupField(name) as AnySchema;

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

      {children}
    </fieldset>
  );
};

export default AutoObject;
