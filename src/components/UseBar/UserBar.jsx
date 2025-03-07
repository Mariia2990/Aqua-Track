import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
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
          User
          {user.avatar ? (
            <img src={user.avatar} alt="User Avatar" className={css.avatar} />
          ) : (
            <FaUserCircle className={css['icon-avatar']} />
          )}
          <svg className={`${css.chevron} ${menuOpen ? css.open : ''}`}>
            <use href={sprite + '#icon-chevron-down'} />
          </svg>
        </button>
        {menuOpen && <UserBarPopover />}
      </div>
    </>
  );
}
