import { useDispatch, useSelector } from 'react-redux';
import { WaterItem } from '../WaterItem/WaterItem.jsx';
import { selectWater } from '../../redux/water/selectors';
import s from './WaterList.module.css';
import { fetchWaterDataDaily } from '../../redux/water/operations.js';
import { useEffect } from 'react';

export function WaterList() {
  const waterData = useSelector(selectWater);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWaterDataDaily());
  }, [dispatch]);

  return (
    <ul className={s.list}>
      {waterData.map((item) => (
        <WaterItem {...item} key={item.id} />
      ))}
    </ul>
  );
}
