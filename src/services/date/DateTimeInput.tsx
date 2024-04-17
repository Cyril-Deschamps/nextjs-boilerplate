import React, { FunctionComponent, useState } from "react";
import { formatISO, formatISO9075, isValid, parseISO, set } from "date-fns";
import { parseTime } from "./time";

interface Props {
  onChange(date: Date): void;
  disabled?: boolean;
  inputClassName?: string;
  initialValue?: Date;
}

const DateTimeInput: FunctionComponent<Props> = ({
  onChange,
  disabled,
  inputClassName,
  initialValue,
}) => {
  const [date, setDate] = useState<string>(
    initialValue ? formatISO(initialValue, { representation: "date" }) : "",
  );
  const [time, setTime] = useState<string>(
    initialValue
      ? formatISO9075(initialValue, { representation: "time" }).slice(0, 5)
      : "",
  );

  const onValidChange = (date: string, time: string) => {
    if (time.length > 0 && date.length > 0) {
      const { hours, minutes } = parseTime(time);
      const dateAsDate = parseISO(date);

      const completeDate = set(dateAsDate, { hours, minutes });
      if (isValid(completeDate)) onChange(completeDate);
    }
  };

  return (
    <div className={"grid"}>
      <div className={"col-md-1-2"}>
        <input
          className={inputClassName || "input-2"}
          disabled={disabled}
          onChange={(ev) => {
            setDate(ev.currentTarget.value);
            onValidChange(ev.currentTarget.value, time);
          }}
          type={"date"}
          value={date}
        />
      </div>
      <div className={"col-md-1-2"}>
        <input
          className={inputClassName || "input-2"}
          disabled={disabled}
          onChange={(ev) => {
            setTime(ev.currentTarget.value);
            onValidChange(date, ev.currentTarget.value);
          }}
          step={60}
          type={"time"}
          value={time}
        />
      </div>
    </div>
  );
};

export default DateTimeInput;
