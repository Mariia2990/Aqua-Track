import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectUser } from '../../redux/auth/selectors.js';
import { getCurrentUser } from '../../redux/auth/operations.js';
import { UserBar } from '../UseBar/UserBar';
import css from './UserPanel.module.css';

export function UserPanel() {
  const dispatch = useDispatch();

  const [isUserUpdated, setIsUserUpdated] = useState(false);

  const userData = useSelector(selectUser);

  !isUserUpdated && userData;

  const getFirstName = (fullName) => {
    return fullName !== userData.name
      ? userData.email.split('@')[0]
      : fullName.split(' ')[0].length > 12
      ? userData.email.split('@')[0]
      : fullName.split(' ')[0];
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
        setIsUserUpdated={setIsUserUpdated}
      />
    </div>
  );
}
