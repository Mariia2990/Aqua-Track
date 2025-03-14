// import css from "./DailyInfo.module.css";

import { AddWaterBtn } from "../AddWaterBtn/AddWaterBtn";
import { ChooseDate } from "../ChooseDate/ChooseDate";
import { WaterList } from "../WaterList/WaterList";

export function DailyInfo() {
  return (
    <>
      <ChooseDate/>
      <AddWaterBtn section ="daily"/>
      <WaterList />
    </>
  );
}
