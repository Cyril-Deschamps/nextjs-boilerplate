import classNames from "classnames";
import { useField } from "formik";
import { useCallback, useEffect, useState } from "react";
import InputRange, { InputRangeProps } from "react-input-range";
import "react-input-range/lib/css/index.css";
import { AnySchema } from "yup";
import { useYupField } from "./Form";

interface Props extends Omit<InputRangeProps, "onChange" | "value"> {
  name: string;
  id: string;
  className: string;
}

const NumberSliderField = ({
  name,
  className,
  ...otherProps
}: Props): JSX.Element => {
  const [field, , helper] = useField<number>(name);
  const fieldSchema = useYupField(name) as AnySchema;

  const minValue = fieldSchema.meta()!.slider!.min;
  const maxValue = fieldSchema.meta()!.slider!.max;
  const unit = fieldSchema.meta()!.slider!.unit || "";

  const [value, setValue] = useState<number>(0);

  const valueVerification = (value: number) => {
    return Math.min(Math.max(value, minValue), maxValue);
  };

  useEffect(() => {
    setValue(field.value ?? minValue);
  }, [field.value, maxValue, minValue]);

  const debounce = (ms = 25) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let count = 0;
    return (value: number) => {
      count += 1;
      clearTimeout(timeoutId);
      if (count > 10) {
        setValue(value);
        count = 0;
      } else {
        timeoutId = setTimeout(() => setValue(value), ms);
      }
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedFn = useCallback(debounce(), []);

  return (
    <div className={classNames(className, "px-2xl md:px-3xl py-2xl")}>
      <InputRange
        formatLabel={(value: number) => `${value} ${unit}`}
        {...otherProps}
        classNames={{
          activeTrack:
            "input-range__track input-range__track--active !bg-green",
          disabledInputRange: "input-range input-range--disabled",
          inputRange: "input-range",
          labelContainer: "input-range__label-container",
          maxLabel: "input-range__label input-range__label--max",
          minLabel: "input-range__label input-range__label--min",
          slider: "!bg-green !border-green input-range__slider",
          sliderContainer: "input-range__slider-container",
          track: "input-range__track input-range__track--background",
          valueLabel: "hidden",
        }}
        maxValue={maxValue}
        minValue={minValue}
        name={name}
        onChange={(number: number) => optimizedFn(number)}
        onChangeComplete={() => helper.setValue(value)}
        value={value}
        allowSameValues
      />
      <div className={"flex justify-center pt-2xl gap-s md:gap-3xl"}>
        <div className={"relative"}>
          <input
            className={classNames(className, "pr-7 max-w-[15em]")}
            id={name}
            name={name}
            onChange={(event) =>
              helper.setValue(
                event.target.value === ""
                  ? 0
                  : valueVerification(event.target.valueAsNumber),
              )
            }
            type={"number"}
            value={value}
          />
          <div
            className={
              "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            }
          >
            <p>{unit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberSliderField;
