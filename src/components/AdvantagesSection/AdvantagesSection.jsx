import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../../redux/user/operations';

import css from './AdvantagesSection.module.css';

import user_1 from '/img/user-1.png';
import user_2 from '/img/user-2.png';
import user_3 from '/img/user-3.png';

export const AdvantagesSection = () => {
  const dispatch = useDispatch();

  const { count, avatars } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const countBreakpoint = 9999;
  const fakePhotosArr = [user_1, user_2, user_3];
  const avatarsArr = avatars.length > 2 ? avatars : fakePhotosArr;

  return (
    <div className={css.advantages_main}>
      <div className={css.advantages_users}>
        <ul className={css.advantages_usersImg}>
          {avatarsArr.map((photoUrl) => {
            return (
              <li className={css.advantages_point} key={photoUrl}>
                <img className={css.user} src={photoUrl} alt="user's photo" />
              </li>
            );
          })}
        </ul>

        <p className={css.advantagesText}>
          Our <span className={css.textSpan}>{count} </span>
          {count > countBreakpoint && <br />}
          <span className={css.textSpan}>happy </span>
          {count <= countBreakpoint && <br />}
          customers
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
