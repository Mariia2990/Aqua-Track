// WaterList.jsx
import { useDispatch, useSelector } from 'react-redux';
import { WaterItem } from '../WaterItem/WaterItem.jsx';
import { selectDailyWater, selectDate } from '../../redux/water/selectors';
import s from './WaterList.module.css';
import { fetchWaterDataDaily } from '../../redux/water/operations';
import { useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

import 'swiper/css/scrollbar';
import 'swiper/css';

export function WaterList() {
  const waterData = useSelector(selectDailyWater);
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);

  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchWaterDataDaily(selectedDate));
    }
  }, [dispatch, selectedDate]);

  return (
    <ul className={s.list}>
      <Swiper
        modules={[Scrollbar]}
        spaceBetween={50}
        slidesPerView={3}
        scrollbar={{ draggable: true, hide: false }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {waterData.map((item) => (
          <SwiperSlide key={item._id}>
            <WaterItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </ul>
  );
}
