// import css from "./WaterDetailedInfo.module.css";

import { DailyInfo } from "../DailyInfo/DailyInfo";
import MonthInfo from "../MonthInfo/MonthInfo";
import { UserPanel } from "../UserPanel/UserPanel";

export function WaterDetailedInfo() {
  return (
    <>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </>
  );
}
