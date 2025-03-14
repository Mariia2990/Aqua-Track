import css from './CalendarItem.module.css';

const CalendarItem = ({ day, volume }) => {
  return (
    <div className={css.calendarItem}>
      <button className={css.button}>{day}</button>
      <p className={css.volume}>{volume}%</p>
    </div>
  );
};

export default CalendarItem;
