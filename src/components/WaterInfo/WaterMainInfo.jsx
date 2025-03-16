import css from "./WaterMainInfo.module.css";
import { Logo } from '../Logo/Logo.jsx';
import { AddWaterBtn } from '../AddWaterBtn/AddWaterBtn';
import { WaterDailyNorma } from '../WaterDailyNorma/WaterDailyNorma';
import { WaterProgressBar } from '../WaterProgressBar/WaterProgressBar';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

export const WaterMainInfo = () => {
  const user = useSelector(selectUser);
  const [dailyNorm, setDailyNorm] = useState(user.water / 1000 || 1.5); // Конвертація з мл у літри
  const [waterDrunk, setWaterDrunk] = useState(0); // Випита вода

  useEffect(() => {
    if (user.water) {
      setDailyNorm(user.water / 1000);
    }
  }, [user.water]); // Оновлення при зміні значення у Redux

  const handleAddWater = (amount) => {
    setWaterDrunk((prev) => Math.min(prev + amount, dailyNorm));
  };

  const progress = Math.round((waterDrunk / dailyNorm) * 100);

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



