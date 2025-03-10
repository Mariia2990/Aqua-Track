import { DailyInfo } from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';
import { UserPanel } from '../UserPanel/UserPanel';
import css from './WaterDetailedInfo.module.css';

export function WaterDetailedInfo() {
  return (
    <div className={css.wrapper}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
}
