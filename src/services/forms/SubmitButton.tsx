import { useContext, useMemo, useState } from "react";
import { FormikContextType, FormikContext } from "formik";
import classNames from "classnames";
import Button from "../ui/Button";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const SubmitButton = ({
  className,
  onClick,
  children,
}: ButtonProps): JSX.Element => {
  const formik: FormikContextType<unknown> | undefined =
    useContext(FormikContext);

  const [isHookedSubmitting, setIsHookedSubmitting] = useState(false);

  // Memos
  const isSubmitting = useMemo(
    () => (formik?.isSubmitting && !onClick) || isHookedSubmitting,
    [formik?.isSubmitting, isHookedSubmitting, onClick],
  );

  return (
    <Button
      className={classNames(className, "w-3/4")}
      disabled={isSubmitting}
      onClick={(ev) => {
        if (onClick) {
          ev.stopPropagation();
          const onSubmit = onClick(ev) as Promise<unknown> | void;

          if (onSubmit instanceof Promise) {
            setIsHookedSubmitting(true);
            onSubmit.finally(() => setIsHookedSubmitting(false));
          }
        }
      }}
      type={"submit"}
    >
      {isSubmitting ? "Chargement..." : children}
    </Button>
  );
};

export default SubmitButton;
