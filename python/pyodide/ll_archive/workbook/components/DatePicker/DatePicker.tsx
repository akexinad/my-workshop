import dayjs from "dayjs";
import React, { FC, useEffect, useRef, useState } from "react";
import classes from "./DatePicker.module.scss";

interface DatePickerProps {
  title: string;
  date: string;
}

const DatePicker: FC<DatePickerProps> = (props) => {
  const { date, title } = props;

  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [validDate, setValidDate] = useState(true);
  const [containerClassList, setContainerClassList] = useState<string[]>([
    classes.inputsContainer
  ]);

  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);

  const addZero = (inputValue: string) => {
    return inputValue.length === 1 ? "0" + inputValue : inputValue;
  };

  useEffect(() => {
    const newClass = [classes.inputsContainer];

    validDate ? newClass.push(classes.valid) : newClass.push(classes.invalid);

    setContainerClassList(newClass);
  }, [validDate]);

  useEffect(() => {
    if (!date) {
      setDay("");
      setMonth("");
      setYear("");

      return;
    }

    const newDate = dayjs(date);
    const day = addZero(newDate.date().toString());
    const month = addZero((newDate.month() + 1).toString());

    if (!newDate.isValid()) {
      setDay("");
      setMonth("");
      setYear("");

      return;
    }

    setDay(day);
    // months are indexed at 0
    setMonth(month);
    setYear(newDate.year().toString());
  }, [date, setDay, setMonth, setYear]);

  const inputValidation = (
    inputValue: string,
    type: "day" | "month" | "year"
  ) => {
    if (isNaN(+inputValue)) return;

    switch (type) {
      case "day":
        checkDate(inputValue, month, year);
        return setDay(inputValue);
      case "month":
        checkDate(day, inputValue, year);
        return setMonth(inputValue);
      case "year":
        checkDate(day, month, inputValue);
        return setYear(inputValue);
      default:
        break;
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    inputValidation(value, "day");

    if (value.toString().length === 2 && yearInputRef.current) {
      yearInputRef.current.focus();
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    inputValidation(value, "month");

    if (value.toString().length === 2 && dayInputRef.current) {
      dayInputRef.current.focus();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    inputValidation(value, "year");

    if (value.toString().length !== 4) {
      setValidDate(false);
    }
  };

  const checkDate = (
    dayToCheck: string,
    monthToCheck: string,
    yearToCheck: string
  ) => {
    const dateToCheck = dayjs(`${monthToCheck}/${dayToCheck}/${yearToCheck}`);

    /**
     * dayjs gives false positives for dates like 30/2 or 31/2 or months that only have 30 days.
     * It just adds the times and moves the dates to march. We need to check for these values.
     */
    if (
      dateToCheck.date() !== +dayToCheck ||
      dateToCheck.month() + 1 !== +monthToCheck
    ) {
      setValidDate(false);
      return;
    }

    setValidDate(dateToCheck.isValid());
  };

  return (
    <div className={classes.container}>
      <h4>{title}</h4>
      <div className={containerClassList.join(" ")}>
        <div className={classes.dateInputs}>
          <input
            className={classes.dateInput}
            value={month}
            placeholder="MM"
            ref={monthInputRef}
            onChange={(eChange) => handleMonthChange(eChange)}
            onBlur={(e) => setMonth(addZero(e.target.value))}
          />
          <span className={classes.forwardSlash}>/</span>
          <input
            className={classes.dateInput}
            value={day}
            placeholder="DD"
            ref={dayInputRef}
            onChange={(eChange) => handleDayChange(eChange)}
            onBlur={(e) => setDay(addZero(e.target.value))}
          />
          <span className={classes.forwardSlash}>/</span>
          <input
            className={classes.dateInput}
            value={year}
            placeholder="YYYY"
            ref={yearInputRef}
            onChange={(eChange) => handleYearChange(eChange)}
          />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
