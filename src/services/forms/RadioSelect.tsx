import classNames from "classnames";
import { useField } from "formik";
import { Key } from "react";

interface Props extends React.DetailsHTMLAttributes<HTMLDivElement> {
  className?: string;
  name: string;
  options: [unknown, string][];
  nullable?: boolean;
  disabled?: boolean;
}

const RadioSelect = (props: Props): JSX.Element => {
  const [field, , helpers] = useField(props.name);
  return (
    <div className={props.className} id={props.id}>
      {props.options.map(([value, label]) => (
        <button
          key={value as Key}
          className={classNames(
            "btn --switch",
            field.value === value && "active",
          )}
          disabled={props.disabled}
          onClick={() =>
            helpers.setValue(
              field.value === value
                ? props.nullable
                  ? null
                  : field.value
                : value,
            )
          }
          type={"button"}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default RadioSelect;
