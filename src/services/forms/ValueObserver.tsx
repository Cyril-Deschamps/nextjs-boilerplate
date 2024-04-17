import { useFormikContext } from "formik";
import { useEffect, useMemo } from "react";

const ValueObserver = ({
  setValueCallback,
  name,
}: {
  setValueCallback: (value: unknown) => React.SetStateAction<unknown>;
  name: string;
}): null => {
  const formik = useFormikContext();

  const fieldToWatch = useMemo(() => {
    const formFields = Object.entries(formik.values as Record<string, unknown>);
    return formFields.find(([key]) => name === key);
  }, [formik.values, name]);

  useEffect(() => {
    setValueCallback(fieldToWatch?.[1]);
  }, [fieldToWatch, setValueCallback]);

  return null;
};

export default ValueObserver;
