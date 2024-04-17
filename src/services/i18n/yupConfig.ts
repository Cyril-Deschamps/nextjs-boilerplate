import i18n from "i18next";
import { setLocale } from "yup";

export interface ValidationError {
  key: string;
  values: Record<string, unknown>;
}

function getError(key: string) {
  return (values: unknown) => ({ key, values } as ValidationError);
}

setLocale({
  mixed: {
    default: getError("invalid_field"),
    notType(props) {
      if (props.type === "date") return getError("required")(props);
      else return getError("invalid_field")(props);
    },
    required: getError("required"),
    defined: getError("defined"),
    oneOf: getError("one_of"),
  },
  string: {
    email: getError("user.email.invalid"),
    matches: getError("matches"),
    min: getError("string.min"),
    max: getError("string.max"),
  },
  number: {
    positive: getError("positive"),
    max: getError("max"),
  },
  date: {
    max: getError("date:GENERIC_MAX"),
    min: getError("date:GENERIC_MIN"),
  },
  array: {
    min: getError("array:min"),
  },
});

export default i18n;
