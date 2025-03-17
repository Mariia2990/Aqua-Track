import { useSelector } from 'react-redux';
import css from './ChooseDate.module.css';
import { selectDate } from '../../redux/water/selectors';

export function ChooseDate() {
  const currentDate = useSelector(selectDate);

  const formatMonthYear = (dateString) => {
    if (!dateString) return 'Invalid Date';
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${day}, ${month}`;
  };

  const localDate = new Date().toISOString().split('T')[0];

  return (
    <h2 className={css.date}>
      {currentDate.split('T')[0] === localDate
        ? 'Today'
        : formatMonthYear(currentDate)}
    </h2>
  );
}
