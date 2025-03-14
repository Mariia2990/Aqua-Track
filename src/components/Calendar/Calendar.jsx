import React from 'react';
import { useSelector } from 'react-redux';
import CalendarItem from '../CalendarItem/CalendarItem';
import { selectWater, selectYearMonth } from '../../redux/water/selectors';
import css from './Calendar.module.css'

const Calendar = () => {
  const waterData = useSelector(selectWater);
  const { year, month } = useSelector(selectYearMonth);

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
      {daysArray.map((day) => {
        const volumeForDay = getVolumeForDay(day);
        return <CalendarItem key={day} day={day} volume={volumeForDay} />;
      })}
    </div>
  );
};

export default Calendar;
