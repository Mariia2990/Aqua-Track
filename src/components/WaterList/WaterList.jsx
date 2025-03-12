import { useSelector } from 'react-redux';
import { WaterItem } from '../WaterItem/WaterItem.jsx';
import { selectWater } from '../../redux/water/selectors';
import s from './WaterList.module.css';

export function WaterList() {
  const waterData = useSelector(selectWater);

  return (
    <ul className={s.list}>
      {waterData.map((item) => (
        <WaterItem {...item} key={item.id} />
      ))}
    </ul>
  );
}
