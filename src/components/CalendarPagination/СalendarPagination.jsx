import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate } from '../../redux/water/selectors';
import { setDate } from '../../redux/water/slice';
import css from './CalendarPagination.module.css';

const CalendarPagination = () => {
  const selectedDate = useSelector(selectDate);
  const dispatch = useDispatch();

  const goToPreviousMonth = () => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    dispatch(setDate(newDate.toISOString()));
  };
  const goToNextMonth = () => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    dispatch(setDate(newDate.toISOString()));
  };

  const formattedMonth = new Date(selectedDate).toLocaleDateString('US-EN', {
    month: 'long',
  });
  const formattedYear = new Date(selectedDate).toLocaleDateString('US-EN', {
    year: 'numeric',
  });

  return (
    <div className={css.calendarPagination}>
      <h1 className={css.paginationHeader}>{formattedMonth}</h1>
      <div className={css.buttonPagination}>
        <button onClick={goToPreviousMonth}>{`<`}</button>
        <div className={css.dateFormat}>
          <h2 className={css.paginationDate}>{formattedMonth},</h2>
          <h2 className={css.paginationDate}>{formattedYear}</h2>
        </div>
        <button onClick={goToNextMonth}>{`>`}</button>
      </div>
    </div>
  );
};

export default CalendarPagination;
