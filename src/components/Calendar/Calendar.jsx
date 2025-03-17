import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CalendarItem from '../CalendarItem/CalendarItem';
import { selectWater, selectYearMonth } from '../../redux/water/selectors';
import css from './Calendar.module.css';
import { setDate } from '../../redux/water/slice';
import { fetchWaterDataDaily } from '../../redux/water/operations';

const Calendar = () => {
  const dispatch = useDispatch();
  const waterData = useSelector(selectWater);
  const { year, month } = useSelector(selectYearMonth);
  const activeDay = useSelector((state) => state.water.selectedDate);

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

  const handleDayClick = (day) => {
    const formattedDay = `${year}-${(month + 1)
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    dispatch(setDate(formattedDay));
    dispatch(fetchWaterDataDaily(formattedDay));
  };

  return (
    <div className={css.calendarList}>
      {daysArray.map((day) => {
        const volumeForDay = getVolumeForDay(day);
        const feasibility = Math.min((volumeForDay / 2000) * 100, 100); // 2000 мл – денна норма

        return (
          <CalendarItem
            key={day}
            month={month}
            year={year}
            day={day}
            feasibility={feasibility}
            onClick={() => handleDayClick(day)}
            isActive={
              activeDay ===
              `${year}-${(month + 1).toString().padStart(2, '0')}-${day
                .toString()
                .padStart(2, '0')}`
            }
          />
        );
      })}
    </div>
  );
};

export default Calendar;
