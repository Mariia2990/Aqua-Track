// import css from "./WaterMainInfo.module.css";
import { Logo } from '../Logo/Logo.jsx';
import { AddWaterBtn } from '../AddWaterBtn/AddWaterBtn';
import { WaterDailyNorma } from '../WaterDailyNorma/WaterDailyNorma';
import { WaterProgressBar } from '../WaterProgressBar/WaterProgressBar';

export const WaterMainInfo = () => {
  return (
    <>
      <Logo />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </>
  );
};

// 09.03.25 19.15



// 4. Додати і стилізувати svg на кнопці
// 5. Додати зверху прогреса точну кількість відсотків випитої води

// 7. Пофіксити перенаправлення від деної норми на ту форму де користувач вводить дену норму
// 8. Пофіксити перенаправлення з add water на компонент модалки
// 9. Пофіксити багу з літражем
// 10.Додати лого
