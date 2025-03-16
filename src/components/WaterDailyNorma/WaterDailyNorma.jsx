import { useDispatch, useSelector } from "react-redux";
import css from "./WaterDailyNorma.module.css";
import { useEffect, useState } from "react";
import { selectUser } from "../../redux/auth/selectors";

export const WaterDailyNorma = ({className, dailyNorm, setDailyNorm}) => {

  return (
    <div className={`${css.wrapper} ${className}`}>
      <p className={css.day}>{dailyNorm} L</p>
      <p className={css.norma1}>My daily norma</p>
    </div>);
};
