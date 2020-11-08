import dayjs from "dayjs";
import React, { FC, useEffect, useRef, useState } from "react";

interface DatePickerProps {
  date: any;
}

const DatePicker: FC<DatePickerProps> = (props) => {
  const { date } = props;

  const [formattedDate, setFormattedDate] = useState<dayjs.Dayjs | null>(null);
  const [day, setDay] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [year, setYear] = useState<string>();
  const [validDate, setValidDate] = useState(true);

  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!date) {
        setFormattedDate(dayjs(new Date()));
        setDay(new Date().getDate().toString());
        // months are indexed at 0
        setMonth((new Date().getMonth() + 1).toString());
        setYear(new Date().getFullYear().toString());
        return;
    }

    const newDate = dayjs(date);

    if (!newDate.isValid()) {
      console.error("Date Is Not Valid!!!");
      setFormattedDate(dayjs(new Date()));
      setDay(new Date().getDate().toString());
      // months are indexed at 0
      setMonth((new Date().getMonth() + 1).toString());
      setYear(new Date().getFullYear().toString());
      return;
    }

    setFormattedDate(newDate);

    setDay(newDate.date().toString());
    // months are indexed at 0
    setMonth((newDate.month() + 1).toString());
    setYear(newDate.year().toString());
  }, [date, setDay, setMonth, setYear]);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isNaN(+value)) return;

    setDay(value);

    if (value.toString().length === 2 && yearInputRef.current) {
      checkDate(value);
      yearInputRef.current.focus();
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isNaN(+value)) return;

    setMonth(value);

    if (value.toString().length === 2 && dayInputRef.current) {
      checkDate(day, value, year);
      dayInputRef.current.focus();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isNaN(+value) || value.toString().length === 5) return;

    setYear(value);

    if (value.toString().length === 4 && yearInputRef.current) {
      checkDate(day, month, value);
    }
  };

  const checkDate = (
    dayToCheck: string = day as string,
    monthToCheck: string = month as string,
    yearToCheck: string = year as string
  ) => {
    const dateToCheck = dayjs(`${monthToCheck}/${dayToCheck}/${yearToCheck}`);

    if (dateToCheck.date() !== +dayToCheck || dateToCheck.month() + 1 !== +monthToCheck) {
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
        onBlur={(e) => checkDate(day, e.target.value, year)}
      />
      <span>/</span>
      <input
        value={day || ""}
        ref={dayInputRef}
        onChange={(e) => handleDayChange(e)}
        onBlur={(e) => checkDate(e.target.value, month, year)}
      />
      <span>/</span>
      <input
        value={year || ""}
        ref={yearInputRef}
        onChange={(e) => handleYearChange(e)}
        onBlur={(e) => checkDate(day, month, e.target.value)}
      />
      {validDate ? null : <h3 style={{ color: "red" }}>Date Is Invalid</h3>}
    </div>
  );
};

export default DatePicker;
