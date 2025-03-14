import Calendar from '../Calendar/Calendar';
import CalendarPagination from '../CalendarPagination/СalendarPagination';
// import css from "./MonthInfo.module.css";

const MonthInfo = () => {
  return (
    <div>
      <CalendarPagination />
      <Calendar />
    </div>
  );
};

export default MonthInfo;
