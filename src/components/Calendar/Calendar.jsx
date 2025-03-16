// Calendar.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CalendarItem from '../CalendarItem/CalendarItem';
import {
  selectMonthlyWater,
  selectYearMonth,
} from '../../redux/water/selectors';
import { fetchWaterDataMonthly } from '../../redux/water/operations';
import css from './Calendar.module.css';

const Calendar = () => {
  const dispatch = useDispatch();
  const waterData = useSelector(selectMonthlyWater);
  const { year, month } = useSelector(selectYearMonth);

  const getMonthParam = (year, month) => {
    const monthString = (month + 1).toString().padStart(2, '0');
    return `${monthString}-${year}`;
  };

  useEffect(() => {
    const monthParam = getMonthParam(year, month);
    dispatch(fetchWaterDataMonthly(monthParam));
  }, [dispatch, year, month]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1,
  );

  const getVolumeForDay = (day) => {
    const entriesForDay = waterData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getFullYear() === year &&
        entryDate.getMonth() === month &&
        entryDate.getDate() === day
      );
    });
    return entriesForDay.reduce((sum, entry) => sum + Number(entry.volume), 0);
  };

  return (
    <div className={css.calendarList}>
      {daysArray.map((day) => (
        <CalendarItem
          key={day}
          month={month}
          year={year}
          day={day}
          volume={getVolumeForDay(day)}
        />
      ))}
    </div>
  );
};

export default Calendar;
