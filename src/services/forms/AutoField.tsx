import { useYupField } from "./Form";
import { AnySchema } from "yup";
import { ReactElement, useMemo } from "react";
import TextField from "./TextField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import NumberField from "./NumberField";
import DateField from "./DateField";
import TextareaField from "./TextareaField";
import FSelect from "./FSelect";
import FAutoComplete from "./FAutoComplete";
import classNames from "classnames";
import DateRangeField from "./DateRangeField";
import NumberSliderField from "./NumberSliderField";
import SuggestionField from "./SuggestionField";
import RichTextField from "./RichTextField";

interface Props {
  name: string;
  placeholder?: string;
  className?: string;
  id?: string;
  unit?: string;
  children?: ReactElement;
  disabled?: boolean;
  afterValueChanged?(value: unknown): void;
  otherProps?: object;
}

enum FieldType {
  String,
  Textarea,
  RichText,
  Number,
  Select,
  Email,
  Password,
  Date,
  DateTime,
  AutoComplete,
  DateRange,
  Slider,
  Suggestion,
}

function getFieldType(fieldSchema: AnySchema): FieldType {
  if (fieldSchema.tests.find((t) => t.OPTIONS.name === "email")) {
    return FieldType.Email;
  }
  if (fieldSchema.meta()?.dateRange) {
    return FieldType.DateRange;
  }
  if (fieldSchema.meta()?.suggestion) {
    return FieldType.Suggestion;
  }
  if (fieldSchema.meta()?.slider) {
    return FieldType.Slider;
  }
  if (fieldSchema.meta()?.password) {
    return FieldType.Password;
  }
  if (fieldSchema.meta()?.multiline) {
    return FieldType.Textarea;
  }
  if (fieldSchema.meta()?.richText) {
    return FieldType.RichText;
  }
  if (fieldSchema.meta()?.select) {
    return FieldType.Select;
  }
  if (fieldSchema.type === "number") {
    return FieldType.Number;
  }
  if (fieldSchema.type === "date") {
    return fieldSchema.meta()?.time ? FieldType.DateTime : FieldType.Date;
  }
  if (fieldSchema.meta()?.autocomplete) {
    return FieldType.AutoComplete;
  }

  return FieldType.String;
}

const AutoField = ({
  name,
  placeholder,
  className,
  id,
  unit,
  children,
  disabled,
  afterValueChanged,
  otherProps,
}: Props): JSX.Element | null => {
  const fieldSchema = useYupField(name) as AnySchema;

  const isRequired = useMemo(
    () => !!fieldSchema.tests.find((t) => t.OPTIONS.name === "required"),
    [fieldSchema],
  );

  const fieldType = useMemo(() => getFieldType(fieldSchema), [fieldSchema]);

  const isDisabled = useMemo(() => fieldSchema.meta()?.disabled, [fieldSchema]);

  if (fieldSchema.meta()?.notVisible) return null;

  const customStyle =
    "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-3 mt-[-0.75rem]";

  return (
    <div className={"my-xxs"}>
      <label
        className={"bg-white z-10 relative px-xxs ml-xs text-xs"}
        htmlFor={id || name}
      >
        {fieldSchema.spec.label} {unit && ` (${unit})`}
        {isRequired && "*"}
      </label>
      {fieldType === FieldType.Email && (
        <EmailField
          className={classNames(className, customStyle)}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.Password && (
        <PasswordField
          className={classNames(className, customStyle)}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.String && (
        <TextField
          className={classNames(className, customStyle)}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.Textarea && (
        <TextareaField
          className={classNames(className, customStyle)}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.RichText && (
        <RichTextField
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.Number && (
        <NumberField
          className={classNames(className, customStyle)}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...otherProps}
        />
      )}
      {(fieldType === FieldType.Date || fieldType === FieldType.DateTime) && (
        <DateField
          className={classNames(className, customStyle)}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholderText={placeholder}
          showTimeSelect={fieldType === FieldType.DateTime}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.Select && (
        <FSelect
          className={classNames(className, customStyle)}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          radio={fieldSchema.meta()?.radio}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.AutoComplete && (
        <FAutoComplete
          afterValueChanged={afterValueChanged}
          className={classNames(className, customStyle)}
          disabled={isDisabled || disabled}
          multiselect={fieldSchema.meta()?.multiselect}
          name={name}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.DateRange && (
        <DateRangeField
          className={classNames(className, customStyle)}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholderText={placeholder}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.Slider && (
        <NumberSliderField
          className={classNames(className, customStyle)}
          disabled={isDisabled}
          id={id || name}
          name={name}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.Suggestion && (
        <SuggestionField
          className={classNames(className, customStyle)}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...otherProps}
        />
      )}
      {children}
    </div>
  );
};

export default AutoField;
