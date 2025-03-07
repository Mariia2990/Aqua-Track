import { useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import sprite from '../../img/sprite.svg';
import css from './UserBar.module.css';
import { useClockOutside } from '../../hook/useClickOutside.jsx';
import { UserBarPopover } from '../UserBarPopover/UserBarPopover';

export const UserBar = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuPopover = useRef(null);
  useClockOutside(menuPopover, toggleMenu);

  return (
    <>
      <div className={css.userBarMenu}>
        <button className={css.userBarBtn} onClick={toggleMenu}>
          {/* {user.name === null
            ? getFirstName(user.email)
            : getFirstName(user.name)} */}
          User
          {user ? (
            <img src={user.avatar} alt="User Avatar" className={css.avatar} />
          ) : (
            <FaUserCircle className={css['icon-avatar']} />
          )}
          <svg className={`${css.chevron} ${menuOpen ? css.open : ''}`}>
            <use href={sprite + '#icon-chevron-down'} />
          </svg>
        </button>
        {menuOpen && <UserBarPopover ref={menuPopover} />}
      </div>
    </>
  );
};
