import css from "./WaterProgressBar.module.css";

export const WaterProgressBar = ({className, progress }) => {
  return(
    <div className={`${css.progressBox} ${className}`}>
      <p className={css.label}>Today</p>
      <div className={css.progressValue} style={{ left: `calc(${progress}% - 5px)` }}>
        {progress}%
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        readOnly
        className={css.slider}
        style={{ "--progress": `${progress}%` }}
      />
      <div className={css.percentages}>
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  ) ;
};
