import { useSelector } from 'react-redux';
import css from './ChooseDate.module.css';
import { selectDate } from '../../redux/water/selectors';

export function ChooseDate() {
  const currentDate = useSelector(selectDate);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
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
    const month = months[date.getMonth()];

    return `${day}, ${month}`;
  };

  const localDate = new Date().toISOString().split('T')[0];

  return (
    <h2 className={css.date}>
      {currentDate.split('T')[0] === localDate
        ? 'Today'
        : formatDate(currentDate)}
    </h2>
  );
}
