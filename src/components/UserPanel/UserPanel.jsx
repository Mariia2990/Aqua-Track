// import { useDispatch, useSelector } from 'react-redux';
import { UserBar } from '../UseBar/UserBar';
import css from './UserPanel.module.css';
// import { useEffect } from 'react';

export function UserPanel() {
  // const { user } = useAuth();
  // const dispatch = useDispatch();
  // const userData = useSelector(selectUser);

  // useEffect(() => {
  //   if (!user) {
  //     dispatch(refreshUser());
  //   }
  // }, [dispatch, user]);

  // const getFirstName = (fullName) => {
  //   return fullName ? fullName.split(' ')[0] : 'User';
  // };

  return (
    <div className={css.userPanel}>
      <h2 className={css.welcomeTitle}>
        Hello
        <span className={css.name}>, {getFirstName(userData.name)}!</span>
      </h2>
      <UserBar user={userData} />
    </div>
  );
}
