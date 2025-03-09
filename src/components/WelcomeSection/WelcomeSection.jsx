import { Logo } from '../Logo/Logo';
import css from './WelcomeSection.module.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export const WelcomeSection = () => {
  return (
    <div className={css.container}>
      <Logo />
      <div className={css.wrapper}>
        <div className={css.text}>
          <p className={css.hintText}>Record daily water intake and track</p>
          <p className={css.mainText}>Water consumption tracker</p>
        </div>
        <div className={css.buttons}>
          <Link to="/signup">
            <button className={clsx('buttonGreen', css.btngreen)}>
              Try tracker
            </button>
          </Link>
          <Link to="/signin">
            <button className={clsx('cancelButton', css.btngray)}>
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
