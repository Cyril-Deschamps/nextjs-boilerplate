import FSelectParse from "./FSelectParse";
import { useYupField } from "./Form";
import { AnySchema, BaseSchema } from "yup";
import { useTranslation } from "next-i18next";
import { Namespace, TFuncKey } from "react-i18next";
import { getNumericEnumEntries } from "../data-structures/enum";
import RadioSelect from "./RadioSelect";
import FSelectString from "./FSelectString";
import { useEffect } from "react";
import { useField } from "formik";

const FSelect = ({
  name,
  disabled,
  className,
  id,
  placeholder,
  radio,
}: {
  name: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  placeholder?: string;
  radio?: boolean;
}): JSX.Element => {
  const fieldSchema = useYupField(name) as AnySchema;
  const [field, , helper] = useField(name);

  const {
    enum: enumList,
    translate,
    stringEnum,
  } = fieldSchema.meta() as NonNullable<BaseSchema["metaInterface"]>;
  const { t } = useTranslation(translate ? ([translate[0]] as Namespace) : []);

  useEffect(() => {
    if (enumList) {
      if (Array.isArray(enumList)) {
        if (enumList?.filter((item) => item === field.value).length === 0) {
          helper.setValue(enumList[0]);
        }
      } else {
        if (
          Object(enumList)
            .keys()
            .filter((item: unknown) => item === field.value).length !== 0
        ) {
          Object(enumList).keys()[0];
        }
      }
    }
  }, [enumList, field.value, helper]);

  return stringEnum ? (
    <FSelectString
      className={className}
      disabled={disabled}
      id={id}
      name={name}
    >
      {fieldSchema.spec.nullable && <option>{placeholder}</option>}
      {!Array.isArray(enumList) && enumList
        ? Object.entries(enumList)
            .filter((value) => value !== null)
            .map((value) => (
              <option key={value[0]} value={value[0]}>
                {value[1]}
              </option>
            ))
        : null}
    </FSelectString>
  ) : radio ? (
    <RadioSelect
      className={className}
      disabled={disabled}
      id={id}
      name={name}
      nullable={fieldSchema.spec.nullable}
      options={
        Array.isArray(enumList)
          ? enumList
              .filter((value): value is string | number => value !== null)
              .map((value) => [
                value,
                translate
                  ? (t(`${translate[1]}.${value}` as TFuncKey) as string)
                  : (value as string),
              ])
          : getNumericEnumEntries(enumList).map(([id, name]) => [
              id,
              t(
                `${
                  (translate as NonNullable<typeof translate>)[1]
                }.${name}` as TFuncKey,
              ) as string,
            ])
      }
    />
  ) : (
    <FSelectParse className={className} disabled={disabled} id={id} name={name}>
      {fieldSchema.spec.nullable && <option>{placeholder}</option>}
      {Array.isArray(enumList)
        ? (enumList as (string | number | null)[])
            .filter((value): value is string | number => value !== null)
            .map((value) => (
              <option key={value} value={value}>
                {translate
                  ? (t(`${translate[1]}.${value}` as TFuncKey) as string)
                  : value}
              </option>
            ))
        : getNumericEnumEntries(enumList).map(([id, name]) => (
            <option key={id} value={id}>
              {
                t(
                  `${
                    (translate as NonNullable<typeof translate>)[1]
                  }.${name}` as TFuncKey,
                ) as string
              }
            </option>
          ))}
    </FSelectParse>
  );
};

export default FSelect;
