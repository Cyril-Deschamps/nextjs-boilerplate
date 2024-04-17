import { useYupField } from "./Form";
import { AnySchema, BaseSchema } from "yup";
import { useTranslation } from "next-i18next";
import { Namespace, TFuncKey } from "react-i18next";
import { getStringEnumEntries } from "../data-structures/enum";
import { MultiSelect, Option } from "react-multi-select-component";
import { useField } from "formik";
import { useEffect, useMemo } from "react";

const FAutoComplete = ({
  name,
  disabled,
  className,
  multiselect = true,
  afterValueChanged,
}: {
  name: string;
  disabled?: boolean;
  className?: string;
  multiselect?: boolean;
  afterValueChanged?(value: unknown): void;
}): JSX.Element => {
  const fieldSchema = useYupField(name) as AnySchema;

  const [field, , helpers] = useField<Option[]>(name);

  useEffect(
    () => afterValueChanged && afterValueChanged(field.value),
    [afterValueChanged, field.value],
  );

  const { enum: enumList, translate } = fieldSchema.meta() as NonNullable<
    BaseSchema["metaInterface"]
  >;
  const { t } = useTranslation(translate ? ([translate[0]] as Namespace) : []);

  const options = useMemo(
    () =>
      getStringEnumEntries(enumList).map(([id, name]) => ({
        label: name,
        value: id,
      })),
    [enumList],
  );

  return (
    <MultiSelect
      className={className}
      disabled={disabled}
      hasSelectAll={multiselect}
      labelledBy={name}
      onChange={(selectedOptions: Option[]) =>
        helpers.setValue(
          multiselect || field.value.length === 0
            ? selectedOptions
            : selectedOptions.filter(
                (selectedOption) =>
                  selectedOption.value !== field.value[0].value,
              ),
        )
      }
      options={options}
      overrideStrings={{
        allItemsAreSelected: t(
          `${translate![1]}.allItemsAreSelected` as TFuncKey,
        ) as string,
        clearSearch: t(`${translate![1]}.clearSearch` as TFuncKey) as string,
        clearSelected: t(
          `${translate![1]}.clearSelected` as TFuncKey,
        ) as string,
        noOptions: t(`${translate![1]}.noOptions` as TFuncKey) as string,
        search: t(`${translate![1]}.search` as TFuncKey) as string,
        selectAll: t(`${translate![1]}.selectAll` as TFuncKey) as string,
        selectAllFiltered: t(
          `${translate![1]}.selectAllFiltered` as TFuncKey,
        ) as string,
        selectSomeItems: t(
          `${translate![1]}.selectSomeItems` as TFuncKey,
        ) as string,
        create: t(`${translate![1]}.create` as TFuncKey) as string,
      }}
      value={field.value}
    />
  );
};

export default FAutoComplete;
