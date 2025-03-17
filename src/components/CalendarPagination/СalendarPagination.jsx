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
    const newMonth = currentDate.getMonth() - 1;
    const newDate = new Date(
      currentDate.getFullYear(),
      newMonth,
      currentDate.getDate(),
    );

    const lastDayOfNewMonth = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      0,
    ).getDate();

    if (newDate.getDate() > lastDayOfNewMonth) {
      newDate.setDate(lastDayOfNewMonth);
    }

    dispatch(setDate(newDate.toISOString()));
  };

  const goToNextMonth = () => {
    const currentDate = new Date(selectedDate);
    const newMonth = currentDate.getMonth() + 1;
    const newDate = new Date(
      currentDate.getFullYear(),
      newMonth,
      currentDate.getDate(),
    );

    const lastDayOfNewMonth = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      0,
    ).getDate();
    if (newDate.getDate() > lastDayOfNewMonth) {
      newDate.setDate(lastDayOfNewMonth);
    }

    dispatch(setDate(newDate.toISOString()));
  };

  const formattedMonth = new Date(selectedDate).toLocaleDateString('en', {
    month: 'long',
  });
  const formattedYear = new Date(selectedDate).toLocaleDateString('en', {
    year: 'numeric',
  });

  useEffect(() => {
    dispatch(
      fetchWaterDataMonthly(
        `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}`,
      ),
    );
  }, [dispatch, year, month]);

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
