import css from "./WaterMainInfo.module.css";
import { Logo } from '../Logo/Logo.jsx';
import { AddWaterBtn } from '../AddWaterBtn/AddWaterBtn';
import { WaterDailyNorma } from '../WaterDailyNorma/WaterDailyNorma';
import { WaterProgressBar } from '../WaterProgressBar/WaterProgressBar';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
import { selectWater } from "../../redux/water/selectors.js";

export const WaterMainInfo = () => {
  const user = useSelector(selectUser);
  const water = useSelector(selectWater)
  
  const [dailyNorm, setDailyNorm] = useState(user.dailyNorm / 1000);

  useEffect(() => {
    if (user.dailyNorm) {
      setDailyNorm(user.dailyNorm / 1000);
    }
  }, [user.dailyNorm]);
  const amount = water.map((obj)=>obj.volume)
  let amountSum = 0;
  for (const number of amount) {
    amountSum += number
  }

  const progress = Math.round((amountSum / (dailyNorm * 1000)) * 100);

  return (
    <div className={css.wrapper}>
      <Logo />
      <WaterDailyNorma dailyNorm={dailyNorm} setDailyNorm={setDailyNorm} className={css.norma}/>
      <WaterProgressBar progress={progress} className={css.progress}/>
      <AddWaterBtn section="waterMain" className={css.btn}/>
    </div>
  );

};

// 09.03.25 19.15






// 7. Пофіксити денну норму яка приймає з беку значення встановлене користувачем



