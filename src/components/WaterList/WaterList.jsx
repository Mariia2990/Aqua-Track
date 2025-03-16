import { useDispatch, useSelector } from 'react-redux';
import { WaterItem } from '../WaterItem/WaterItem.jsx';
import { selectDate, selectWater } from '../../redux/water/selectors';
import s from './WaterList.module.css';
import { fetchWaterDataDaily } from '../../redux/water/operations.js';
import { useEffect } from 'react';

export function WaterList() {
  const waterData = useSelector(selectWater);
  const dispatch = useDispatch();

  const selectedDate = useSelector(selectDate);


  

  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchWaterDataDaily(selectedDate));
    }
  }, [dispatch, selectedDate]);

  return (
    <ul className={s.list}>
      {waterData.map((item) => (
        <WaterItem {...item} key={item._id} />
      ))}
    </ul>
  );
}
