import css from './WaterMainInfo.module.css';
import { Logo } from '../Logo/Logo.jsx';
import { AddWaterBtn } from '../AddWaterBtn/AddWaterBtn';
import { WaterDailyNorma } from '../WaterDailyNorma/WaterDailyNorma';
import { WaterProgressBar } from '../WaterProgressBar/WaterProgressBar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';
import { selectMonthlyWater } from '../../redux/water/selectors.js';

export const WaterMainInfo = () => {
  const user = useSelector(selectUser);
  const water = useSelector(selectMonthlyWater);

  const initialDailyNorm =
    user && user.dailyNorm && !isNaN(Number(user.dailyNorm))
      ? Number(user.dailyNorm) / 1000
      : 0;
  const [dailyNorm, setDailyNorm] = useState(initialDailyNorm);

  useEffect(() => {
    if (user && user.dailyNorm && !isNaN(Number(user.dailyNorm))) {
      setDailyNorm(Number(user.dailyNorm) / 1000);
    } else {
      setDailyNorm(0);
    }
  }, [user]);

  const amount = water
    ? water.map((obj) => {
        const vol = Number(obj.volume);
        return isNaN(vol) ? 0 : vol;
      })
    : [];
  // Суммируем все volume
  const amountSum = amount.reduce((sum, value) => sum + value, 0);

  const progress =
    dailyNorm > 0 ? Math.round((amountSum / (dailyNorm * 1000)) * 100) : 0;

  return (
    <div className={css.wrapper}>
      <Logo />
      <WaterDailyNorma
        dailyNorm={dailyNorm}
        setDailyNorm={setDailyNorm}
        className={css.norma}
      />
      <WaterProgressBar progress={progress} className={css.progress} />
      <AddWaterBtn section="waterMain" className={css.btn} />
    </div>
  );
};
