import { useDispatch } from 'react-redux';
import css from './CalendarItem.module.css';
import { setDate } from '../../redux/water/slice';
import { fetchWaterDataDaily } from '../../redux/water/operations';

const CalendarItem = ({ year, month, day, volume }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const selectedDate = new Date(year, month, day).toISOString();

    dispatch(setDate(selectedDate));

    dispatch(fetchWaterDataDaily(selectedDate));
  };

  return (
    <div className={css.calendarItem}>
      <button className={css.button} onClick={handleClick}>
        {day}
      </button>
      <p className={css.volume}>{volume}%</p>
    </div>
  );
};

export default CalendarItem;
