import css from "./WaterMainInfo.module.css";
import { Logo } from '../Logo/Logo.jsx';
import { AddWaterBtn } from '../AddWaterBtn/AddWaterBtn';
import { WaterDailyNorma } from '../WaterDailyNorma/WaterDailyNorma';
import { WaterProgressBar } from '../WaterProgressBar/WaterProgressBar';
import { useState } from 'react';

export const WaterMainInfo = () => {
  const [dailyNorm, setDailyNorm] = useState(1.5); // Початково 1.5 л
  const [waterDrunk, setWaterDrunk] = useState(0); // Випита вода

  // Функція для додавання води
  const handleAddWater = (amount) => {
    setWaterDrunk((prev) => Math.min(prev + amount, dailyNorm));
  };

  // Обчислюємо % випитої води
  const progress = Math.round((waterDrunk / dailyNorm) * 100);

  return (
    <div className={css.wrapper}>
      <Logo />
      <WaterDailyNorma dailyNorm={dailyNorm} setDailyNorm={setDailyNorm} className={css.norma}/>
      <WaterProgressBar progress={progress} className={css.progress}/>
      <AddWaterBtn section="waterMain" onAddWater={handleAddWater} className={css.btn}/>
    </div>
  );

};

// 09.03.25 19.15






// 7. Пофіксити денну норму яка приймає з беку значення встановлене користувачем
// 8. Пофіксити перенаправлення з add water на компонент модалки


