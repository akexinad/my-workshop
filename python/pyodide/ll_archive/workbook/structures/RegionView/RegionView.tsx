import { Region } from "pages/workbook/types";
import { capitalizeEach } from "pages/workbook/utils/utils";
import React, { FC } from "react";
import DatePicker from "../../components/DatePicker/DatePicker";
import RegionFinancialTable from "../../components/RegionFinancialTable/RegionFinancialTable";
import classes from "./RegionView.module.scss";

interface RegionViewProps {
  region: Region;
}

const RegionView: FC<RegionViewProps> = ({ region }) => {
  const { description, startDate, endDate } = region;

  const renderDatePicker = (startDate: string, endDate: string) => {
    return (
      <div className={classes.dateContainer}>
        <DatePicker date={startDate} title="Start Date" />
        <DatePicker date={endDate} title="End Date" />
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{capitalizeEach(description)}</h2>

      <div className={classes.dateContainer}>
        {startDate && endDate ? renderDatePicker(startDate, endDate) : null}
      </div>

      <RegionFinancialTable region={region} />
    </div>
  );
};

export default RegionView;
