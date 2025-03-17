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
    return `${months[date.getMonth()]}`;
  };

  return <h2 className={css.date}>{formatMonthYear(currentDate)}</h2>;
}
