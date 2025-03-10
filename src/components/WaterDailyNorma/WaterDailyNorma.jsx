import css from "./WaterDailyNorma.module.css";

export const WaterDailyNorma = ({className, dailyNorm, setDailyNorm}) => {
  const changeNorm = () => {
    const newNorm = parseFloat(prompt("Enter your daily water intake (liters):") || "1.5");
    if (!isNaN(newNorm) && newNorm > 0) {
      setDailyNorm(newNorm);
    }
  };

  return (
    <div className={`${css.wrapper} ${className}`} onClick={changeNorm}>
      <p className={css.day}>{dailyNorm} L</p>
      <p className={css.norma1}>My daily norma</p>
    </div>);
};
