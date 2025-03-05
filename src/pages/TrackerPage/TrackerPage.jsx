import { WaterDetailedInfo } from '../../components/WaterDetail/WaterDetailedInfo.jsx';
import { WaterMainInfo } from '../../components/WaterInfo/WaterMainInfo.jsx';
// import css from "./TrackerPage.module.css"

export default function TrackerPage() {

  return (
    <>
      <WaterMainInfo/>
      <WaterDetailedInfo />
    </>
  );
}
