import { useState, useRef, useCallback } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import sprite from '../../img/sprite.svg';
import css from './UserBar.module.css';
import { useClockOutside } from '../../hook/useClickOutside.jsx';
import { UserBarPopover } from '../UserBarPopover/UserBarPopover';
import { GlobalModal } from '../GlobalModal/GlobalModal';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import { LogOutModal } from '../LogOutModal/LogOutModal';

export const UserBar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btn, setBtn] = useState('Settings' || 'Log out');

  const toggleMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOpenModal = useCallback((e) => {
    setBtn(e.target.innerText);
    setIsModalOpen(true);
    setIsMenuOpen(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const menuPopover = useRef(null);
  useClockOutside(menuPopover, toggleMenu);

  return (
    <>
      <div className={css.userBarMenu} ref={menuPopover}>
        <button
          className={css.userBarBtn}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* {user.name === null
            ? getFirstName(user.email)
            : getFirstName(user.name)} */}
          User
          {user ? (
            <img src={user.avatar} alt="User Avatar" className={css.avatar} />
          ) : (
            <FaUserCircle className={css['icon-avatar']} />
          )}
          <svg className={`${css.chevron} ${isMenuOpen ? css.open : ''}`}>
            <use href={sprite + '#icon-chevron-down'} />
          </svg>
        </button>
        {isMenuOpen && <UserBarPopover onOpenModal={handleOpenModal} />}
        {isModalOpen && (
          <GlobalModal isOpen={isModalOpen} onClose={handleCloseModal}>
            {btn === 'Settings' && <UserSettingsForm />}
            {btn === 'Log out' && <LogOutModal onClose={handleCloseModal} />}
          </GlobalModal>
        )}
      </div>
    </>
  );
};
