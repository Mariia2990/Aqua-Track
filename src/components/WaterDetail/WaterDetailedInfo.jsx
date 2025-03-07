import css from './WaterDetailedInfo.module.css';

import { DailyInfo } from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';
import { UserPanel } from '../UserPanel/UserPanel';

export function WaterDetailedInfo() {
  return (
    <div className={css.wrapper}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
}
