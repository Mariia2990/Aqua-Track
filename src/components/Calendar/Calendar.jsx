import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import {
  selectWater,
  selectYearMonth,
  selectWaterMonthly,
} from '../../redux/water/selectors';
import { setDate } from '../../redux/water/slice';
import { fetchWaterDataDaily } from '../../redux/water/operations';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const Calendar = () => {
  const dispatch = useDispatch();
  const waterData = useSelector(selectWater);
  const waterMonthly = useSelector(selectWaterMonthly);
  const { year, month } = useSelector(selectYearMonth);
  const activeDay = useSelector((state) => state.water.selectedDate);
  const user = useSelector(selectUser);

  const dailyNorm = user?.dailyNorm ? user.dailyNorm : 1500;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1,
  );

  const getStatsForDayByMonth = (day) => {
    const entriesForDayByMonth = waterMonthly.filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getFullYear() === year &&
        entryDate.getMonth() === month &&
        entryDate.getDate() === day
      );
    });

    return entriesForDayByMonth.reduce(
      (sum, entry) => sum + Math.round((Number(entry.stats) / dailyNorm) * 100),
      0,
    );
  };

  const getVolumeForDay = (day) => {
    const entriesForDay =
      waterData?.filter((entry) => {
        if (!entry?.date) return false;

        const entryDate = new Date(entry.date);
        return (
          entryDate.getFullYear() === year &&
          entryDate.getMonth() === month &&
          entryDate.getDate() === day
        );
      }) || [];

    return entriesForDay.reduce(
      (sum, entry) => sum + Number(entry.volume || 0),
      0,
    );
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
        const statsForDay = getStatsForDayByMonth(day);
        const progress = statsForDay >= 0 ? Math.min(statsForDay, 100) : 0;

        return (
          <CalendarItem
            key={day}
            month={month}
            year={year}
            day={day}
            feasibility={progress >= 0 ? Math.min(progress, 100) : 0}
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
