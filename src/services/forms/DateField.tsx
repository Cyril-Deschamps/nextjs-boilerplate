import classNames from "classnames";
import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { useDate } from "../date/DateContext";

interface Props<
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined,
> extends Omit<
    ReactDatePickerProps<CustomModifierNames, WithRange>,
    "onChange" | "selected"
  > {
  name: string;
}

const DateField = ({
  name,
  dateFormat,
  className,
  ...otherProps
}: Props): JSX.Element => {
  const [field, , helper] = useField<Date | null>(name);
  const { locale } = useDate();

  return (
    <DatePicker
      className={classNames("input", className)}
      locale={locale}
      onChange={(date) => helper.setValue(date)}
      selected={field.value}
      {...otherProps}
      dateFormat={
        dateFormat ? dateFormat : otherProps.showTimeSelect ? "Pp" : "P"
      }
    />
  );
};

export default DateField;
