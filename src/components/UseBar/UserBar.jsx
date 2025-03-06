import { useState } from 'react';
import sprite from '../../img/sprite.svg';
import css from './UserBar.module.css';
// import defaultAvatar from '../../img/avatar-default.svg';

import { UserBarPopover } from '../UserBarPopover/UserBarPopover';

export function UserBar(user) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div className={css.popover}>
        <button className={css.userBarBtn} onClick={toggleMenu}>
          {/* {getFirstName(user.name)} */}
          {user.avatar ? (
            <img src={user.avatar} alt="User Avatar" className={css.avatar} />
          ) : (
            <svg className={css['icon-avatar']}>
              <use href={sprite + '#icon-avatar'} />
            </svg>
          )}
          <svg className={`${css.chevron} ${menuOpen ? css.open : ''}`}>
            <use href={sprite + '#icon-chevron'} />
          </svg>
        </button>
      </div>
      <UserBarPopover />
    </>
  );
}
