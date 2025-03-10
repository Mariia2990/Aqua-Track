// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { useAuth } from '../../hook/useAuth.jsx';
// import { selectUser } from '../../redux/auth/selectors.js';
// import { refreshUser } from '../../redux/auth/operations.js';
import { UserBar } from '../UseBar/UserBar';
import css from './UserPanel.module.css';

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
  //   return fullName ? fullName.split(' ')[0] : user.email.split('@')[0];
  // };

  return (
    <div className={css.userPanel}>
      <h2 className={css.welcomeTitle}>
        Hello
        <span className={css.userName}>
          , User
          {/* {getFirstName(
            userData.name === null ? userData.email : userData.name,
          )} */}
          !
        </span>
      </h2>
      <UserBar />
    </div>
  );
}

// user={userData} getFirstName={getFirstName}
