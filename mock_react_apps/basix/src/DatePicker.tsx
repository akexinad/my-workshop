import dayjs from "dayjs";
import React, { FC, useEffect, useRef, useState } from "react";

interface DatePickerProps {
  date: any;
}

const DatePicker: FC<DatePickerProps> = (props) => {
  const { date } = props;

  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [validDate, setValidDate] = useState(true);

  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!date) {
      /**
       * Setting it to today's date if there is no
       * date passed down from pyodide.
       */
      console.error("No Date.");

      const newDate = dayjs(new Date());

      setDay(newDate.date().toString());
      // months are indexed at 0
      setMonth((newDate.month() + 1).toString());
      setYear(newDate.year().toString());

      return;
    }

    const newDate = dayjs(date);

    if (!newDate.isValid()) {
      /**
       * Setting it to today's date if pyodide date
       * is not valid.
       */
      console.error("Date Is Not Valid");

      setDay(new Date().getDate().toString());
      // months are indexed at 0
      setMonth((new Date().getMonth() + 1).toString());
      setYear(new Date().getFullYear().toString());

      return;
    }

    setDay(newDate.date().toString());
    // months are indexed at 0
    setMonth((newDate.month() + 1).toString());
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
    <div>
      <input
        value={month || ""}
        ref={monthInputRef}
        onChange={(e) => handleMonthChange(e)}
      />
      <span>/</span>
      <input
        value={day || ""}
        ref={dayInputRef}
        onChange={(e) => handleDayChange(e)}
      />
      <span>/</span>
      <input
        value={year || ""}
        ref={yearInputRef}
        onChange={(e) => handleYearChange(e)}
      />
      {validDate ? null : <h3 style={{ color: "red" }}>Date Is Invalid</h3>}
    </div>
  );
};

export default DatePicker;
