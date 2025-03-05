// import css from "./WaterDetail.module.css";

import { DailyInfo } from "../DailyInfo/DailyInfo";
import MonthInfo from "../MonthInfo/MonthInfo";
import { UserPanel } from "../UserPanel/UserPanel";

export function WaterDetail() {
  return (
    <>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </>
  );
}
