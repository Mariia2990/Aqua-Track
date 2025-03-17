import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate, selectYearMonth } from '../../redux/water/selectors';
import { setDate } from '../../redux/water/slice';
import css from './CalendarPagination.module.css';
import sprite from '../../../public/img/sprite.svg';
import { fetchWaterDataMonthly } from '../../redux/water/operations.js';
import { useEffect } from 'react';

const CalendarPagination = () => {
  const selectedDate = useSelector(selectDate);
  const dispatch = useDispatch();
  const { year, month } = useSelector(selectYearMonth);
  const goToPreviousMonth = () => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    const newMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
    ).getMonth();
    const today = new Date(new Date().toISOString());

    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
    ).getMonth();

    if (currentMonth === newMonth) {
      dispatch(setDate(new Date().toISOString()));
    } else {
      dispatch(setDate(newDate.toISOString()));
    }
  };
  const goToNextMonth = () => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    const newMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
    ).getMonth();
    const today = new Date(new Date().toISOString());

    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
    ).getMonth();

    if (currentMonth === newMonth) {
      dispatch(setDate(new Date().toISOString()));
    } else {
      dispatch(setDate(newDate.toISOString()));
    }
  };

  const formattedMonth = new Date(selectedDate).toLocaleDateString('EN', {
    month: 'long',
  });
  const formattedYear = new Date(selectedDate).toLocaleDateString('EN', {
    year: 'numeric',
  });

  const formatMonth = month + 1 < 10 ? `0${month + 1}` : month + 1;

  const formattedDate = `${year}-${formatMonth}`;

  useEffect(() => {
    dispatch(fetchWaterDataMonthly(formattedDate));
  }, [dispatch, formattedDate]);

  return (
    <div className={css.calendarPagination}>
      <h1 className={css.paginationHeader}>Month</h1>
      <div className={css.buttonPagination}>
        <button onClick={goToPreviousMonth}>{`<`}</button>
        <div className={css.dateFormat}>
          <h2 className={css.paginationDate}>{formattedMonth},</h2>
          <h2 className={css.paginationDate}>{formattedYear}</h2>
        </div>
        <button onClick={goToNextMonth}>{`>`}</button>

        <button className={css.boxIcon}>
          <svg className={css.iconPag}>
            <use
              width={20}
              height={20}
              xlinkHref={`${sprite}#icon-pie-chart`}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarPagination;
