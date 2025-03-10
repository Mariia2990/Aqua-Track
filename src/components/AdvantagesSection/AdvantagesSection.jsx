import css from './AdvantagesSection.module.css';
import user_1 from '../../img/user-1.png';
import user_2 from '../../img/user-2.png';
import user_3 from '../../img/user-3.png';

export const AdvantagesSection = () => {
  return (
    <div className={css.advantages_main}>
      <div className={css.advantages_users}>
        <ul className={css.advantages_usersImg}>
          <li className={css.advantages_point}>
            <img className={css.user} src={user_1} alt="userOne" />
          </li>
          <li className={css.advantages_point}>
            <img className={css.user} src={user_2} alt="userSecond" />
          </li>
          <li className={css.advantages_point}>
            <img className={css.user} src={user_3} alt="userThree" />
          </li>
        </ul>
        <p className={css.advantagesText}>
          Our <span className={css.textSpan}>happy</span> customers
        </p>
      </div>
      <div className={css.advantagesGroup_habits}>
        <ul className={css.advantagesTabs}>
          <li className={css.advantages_habits}>
            <div className={css.ellipse}></div>
            <p className={css.habit_1}>Habit drive</p>
          </li>
          <li className={css.advantages_habits}>
            <p className={css.habit_2_3}>View statistics</p>
          </li>
          <li className={css.advantages_habits}>
            <p className={css.habit_2_3}>Personal rate setting</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
