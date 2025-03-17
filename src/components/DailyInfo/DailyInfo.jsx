import css from "./DailyInfo.module.css";

import { AddWaterBtn } from "../AddWaterBtn/AddWaterBtn";
import { ChooseDate } from "../ChooseDate/ChooseDate";
import { WaterList } from "../WaterList/WaterList";

export function DailyInfo() {
  return (
    <div>
      <div className={css.wrapper}>
      <ChooseDate/>
        <AddWaterBtn section="daily" />
      </div>
      <WaterList />
    </div>
  );
}
