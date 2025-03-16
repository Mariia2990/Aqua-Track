import { useState, useRef, useCallback } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useClockOutside } from '../../hook/useClickOutside.jsx';
import { UserBarPopover } from '../UserBarPopover/UserBarPopover';
import { GlobalModal } from '../GlobalModal/GlobalModal';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import { LogOutModal } from '../LogOutModal/LogOutModal';
import photo from '/img/avatar-default.svg';
import sprite from '/img/sprite.svg';
import css from './UserBar.module.css';

export const UserBar = ({ user, getFirstName, setIsUserUpdated }) => {
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
          {user.name === ''
            ? getFirstName(user.email)
            : getFirstName(user.name)}
          {user.avatarUrl !== '' ? (
            <img
              src={user.avatarUrl}
              alt="User Avatar"
              className={css.avatar}
            />
          ) : (
            <img src={photo} alt="User Avatar" className={css.avatar} />
          )}
          <svg className={`${css.chevron} ${isMenuOpen ? css.open : ''}`}>
            <use href={sprite + '#icon-chevron-down'} />
          </svg>
        </button>
        {isMenuOpen && <UserBarPopover onOpenModal={handleOpenModal} />}
        {isModalOpen && (
          <GlobalModal isOpen={isModalOpen} onClose={handleCloseModal}>
            {btn === 'Settings' && (
              <UserSettingsForm
                onClose={handleCloseModal}
                setIsUserUpdated={setIsUserUpdated}
              />
            )}
            {btn === 'Log out' && <LogOutModal onClose={handleCloseModal} />}
          </GlobalModal>
        )}
      </div>
    </>
  );
};
