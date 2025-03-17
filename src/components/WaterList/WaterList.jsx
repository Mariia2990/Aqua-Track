import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WaterItem } from "../WaterItem/WaterItem.jsx";
import { selectDate, selectWater } from "../../redux/water/selectors";
import { fetchWaterDataDaily } from "../../redux/water/operations.js";
import s from "./WaterList.module.css";
import photoWater from "/img/Vector-1x.jpg";

export function WaterList() {
  const waterData = useSelector(selectWater);
  const dispatch = useDispatch();

  const selectedDate = useSelector(selectDate);

  const handleDelete = (id) => {
    setWaterList((prevList) => prevList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchWaterDataDaily(selectedDate));
    }
  }, [dispatch, selectedDate]);

  function useHorizontalScroll() {
    const elRef = useRef();
    useEffect(() => {
      const el = elRef.current;
      if (el) {
        const onWheel = (e) => {
          if (e.deltaY == 0) return;
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

  return (
    <div ref={useHorizontalScroll()} className={s.waterList}>
      {waterData.length > 0 ? (
        waterData.map((item) => {
          return (
            <WaterItem
              id={item._id}
              {...item}
              key={item._id}
              onDelete={handleDelete}
            />
          );
        })
      ) : (
        <div className={s.empty}>
          <img className={s.glass} src={photoWater} alt="glass photo" />
          <p>I need water</p>
        </div>
      )}
    </div>
  );
}
