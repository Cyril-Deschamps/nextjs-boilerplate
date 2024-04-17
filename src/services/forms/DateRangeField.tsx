import classNames from "classnames";
import { format } from "date-fns";
import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { AnySchema } from "yup";
import { useDate } from "../date/DateContext";
import { PartialNullable } from "../types/utility";
import { useYupField } from "./Form";
import ChevronLeft from "../../assets/img/icons/icon-chevron-left.svg";
import ChevronRight from "../../assets/img/icons/icon-chevron-right.svg";
import ChevronDown from "../../assets/img/icons/icon-chevron-down.svg";
import Image from "next/image";
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import OutsideAlerter from "../ui/OutsideAlerter";
import { Trans } from "next-i18next";

interface Props<CustomModifierNames extends string = never>
  extends Omit<
    ReactDatePickerProps<CustomModifierNames, true>,
    "onChange" | "selected"
  > {
  name: string;
  datesSelectionInfo?: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

const DateRangeField = ({
  name,
  dateFormat,
  datesSelectionInfo,
  className,
  ...otherProps
}: Props): JSX.Element => {
  const [field, , helper] = useField<PartialNullable<DateRange>>(name);
  const fieldSchema = useYupField(name) as AnySchema;
  const { locale } = useDate();

  const [showDatePicker, setShowDatePicker] = useState(false);
  useEffect(() => {
    if (field.value?.startDate && field.value?.endDate) {
      setShowDatePicker(false);
    }
  }, [field.value?.endDate, field.value?.startDate]);

  const CustomDateInput = forwardRef<HTMLInputElement>(
    (
      {
        value,
        ...otherProps
      }: DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      ref,
    ) => {
      const customInputRef = useRef<HTMLInputElement>(null);
      const mobileFieldScroll = () => {
        if (typeof window !== "undefined" && window.innerWidth <= 760) {
          const y =
            customInputRef.current!.getBoundingClientRect().top +
            window.scrollY -
            175;

          window.scrollTo({ top: y, behavior: "smooth" });
        }
      };

      useEffect(() => {
        if (!ref) return;

        if (typeof ref === "function") {
          ref(customInputRef.current);
        } else {
          ref.current = customInputRef.current;
        }
      }, [ref]);

      return (
        <input
          ref={customInputRef}
          autoComplete={"off"}
          className={"pr-7 text-ellipsis cursor-pointer"}
          spellCheck={"false"}
          {...otherProps}
          onFocus={() => {
            mobileFieldScroll();
            customInputRef.current!.blur();
          }}
          value={value}
        />
      );
    },
  );
  CustomDateInput.displayName = "DateInput";

  return (
    <OutsideAlerter onClickOutside={() => setShowDatePicker(false)}>
      <div className={"relative"}>
        <DatePicker
          className={classNames("text-ellipsis cursor-pointer", className)}
          customInput={<CustomDateInput />}
          endDate={field.value?.endDate}
          locale={locale}
          maxDate={fieldSchema.meta()!.dateRange!.max}
          minDate={fieldSchema.meta()!.dateRange!.min}
          nextMonthButtonLabel={">"}
          onChange={(date) =>
            helper.setValue({ startDate: date[0], endDate: date[1] })
          }
          onInputClick={() =>
            setShowDatePicker((prevShowDatePicker) => !prevShowDatePicker)
          }
          open={showDatePicker}
          popperClassName={"react-datepicker-left"}
          previousMonthButtonLabel={"<"}
          selected={field.value?.startDate}
          startDate={field.value?.startDate}
          selectsRange
          {...otherProps}
          dateFormat={dateFormat ? dateFormat : "EEE dd MMM"}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className={"px-2 py-2"}>
              {datesSelectionInfo && (
                <p className={"text-xs leading-4 mb-2 bg-gray-100 p-2 rounded"}>
                  <Trans components={{ strong: <strong /> }}>
                    {datesSelectionInfo}
                  </Trans>
                </p>
              )}
              <div className={"flex items-center justify-between"}>
                <span className={"text-lg text-gray-700"}>
                  {format(date, "MMMM yyyy")}
                </span>
                <div className={"space-x-2"}>
                  <button
                    className={classNames(
                      prevMonthButtonDisabled &&
                        "cursor-not-allowed opacity-50",
                      "inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500",
                    )}
                    disabled={prevMonthButtonDisabled}
                    onClick={decreaseMonth}
                    type={"button"}
                  >
                    <Image
                      alt={"left"}
                      className={"w-5 h-5 text-gray-600"}
                      src={ChevronLeft}
                    />
                  </button>
                  <button
                    className={
                      (classNames(
                        nextMonthButtonDisabled &&
                          "cursor-not-allowed opacity-50",
                      ),
                      "inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500")
                    }
                    disabled={nextMonthButtonDisabled}
                    onClick={increaseMonth}
                    type={"button"}
                  >
                    <Image
                      alt={"right"}
                      className={"w-5 h-5 text-gray-600"}
                      src={ChevronRight}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        />
        <div
          className={
            "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
          }
        >
          <Image alt={"chevron-down"} className={"w-3"} src={ChevronDown} />
        </div>
      </div>
    </OutsideAlerter>
  );
};

export default DateRangeField;
