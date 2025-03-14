import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectUser } from '../../redux/auth/selectors.js';
import { refreshAccessToken } from '../../redux/auth/operations.js';
import { UserBar } from '../UseBar/UserBar';
import css from './UserPanel.module.css';

export function UserPanel() {
  // const dispatch = useDispatch();

  // const [isUserUpdated, setIsUserUpdated] = useState(false);

  // useEffect(() => {
  //   dispatch(refreshAccessToken());
  // }, [dispatch]);

  const userData = useSelector(selectUser);

  // useEffect(() => {
  //   if (isUserUpdated) {
  //     dispatch(refreshAccessToken());
  //     setIsUserUpdated(false);
  //   }
  // }, [dispatch, isUserUpdated]);

  const getFirstName = (fullName) => {
    return fullName === userData.name
      ? fullName.split(' ')[0]
      : userData.email.split('@')[0];
  };

  return (
    <div className={css.userPanel}>
      <h2 className={css.welcomeTitle}>
        Hello
        <span className={css.userName}>
          ,{' '}
          {getFirstName(userData.name === '' ? userData.email : userData.name)}!
        </span>
      </h2>
      <UserBar
        user={userData}
        getFirstName={getFirstName}
        // setIsUserUpdated={setIsUserUpdated}
      />
    </div>
  );
}
