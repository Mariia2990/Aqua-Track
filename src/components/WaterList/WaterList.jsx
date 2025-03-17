import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WaterItem } from '../WaterItem/WaterItem.jsx';
import { selectDate, selectWater } from '../../redux/water/selectors';
import {
  fetchWaterDataDaily,
  deleteWater,
  updateWater,
} from '../../redux/water/operations.js';
import s from './WaterList.module.css';
import photoWater from '/img/Vector-1x.jpg';

export function WaterList() {
  const waterData = useSelector(selectWater);
  const selectedDate = useSelector(selectDate);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchWaterDataDaily(selectedDate));
    }
  }, [dispatch, selectedDate]);

  const handleDelete = (id) => {
    dispatch(deleteWater(id));
  };

  function useHorizontalScroll() {
    const elRef = useRef();
    useEffect(() => {
      const el = elRef.current;
      if (el) {
        const onWheel = (e) => {
          if (e.deltaY === 0) return;
          e.preventDefault();
          el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            behavior: 'smooth',
          });
        };
        el.addEventListener('wheel', onWheel);
        return () => el.removeEventListener('wheel', onWheel);
      }
    }, []);
    return elRef;
  }

  const scrollRef = useHorizontalScroll();

  return (
    <div ref={scrollRef} className={s.waterList}>
      {waterData.length > 0 ? (
        waterData.map((item) => (
          <WaterItem
            key={item._id}
            id={item._id}
            {...item}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <div className={s.empty}>
          <img className={s.glass} src={photoWater} alt="glass photo" />
          <p>I need water</p>
        </div>
      )}
    </div>
  );
}
