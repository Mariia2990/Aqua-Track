import { useDispatch } from 'react-redux';
import css from './CalendarItem.module.css';
import { setDate } from '../../redux/water/slice';

const CalendarItem = ({
  year,
  month,
  day,
  feasibility = 0,
  isActive,
  onClick,
}) => {
  const dispatch = useDispatch();

  const formattedDay = `${year}-${(month + 1).toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;

  const handleClick = () => {
    dispatch(setDate(formattedDay));
    onClick();
  };

  const containerStyle = {
    backgroundColor: isActive
      ? '#323f47'
      : feasibility < 100
      ? 'rgba(50, 63, 71, 0.2)'
      : '#FFFFFF',
    color: isActive ? '#9be1a0' : '#000000',
  };

  return (
    <div className={css.calendarItem}>
      <button
        className={css.button}
        style={containerStyle}
        onClick={handleClick}
      >
        {day}
      </button>
      <p className={css.volume}>{feasibility}%</p>
    </div>
  );
};

export default CalendarItem;
