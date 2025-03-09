import { Logo } from '../Logo/Logo';
import css from './WelcomeSection.module.css';
import clsx from 'clsx';
import Container from '../Container/Container.jsx';

export const WelcomeSection = () => {
  return (
    <div className={css.container}>
      {/*<Container>*/}
      <Logo />
      <div className={css.wrapper}>
        <div className={css.text}>
          <p className={css.hintText}>Record daily water intake and track</p>
          <p className={css.mainText}>Water consumption tracker</p>
        </div>
        <div className={css.buttons}>
          <button className={clsx('buttonGreen', css.btngreen)}>
            Try tracker
          </button>
          <button className={clsx('cancelButton', css.btngray)}>Sign In</button>
        </div>
      </div>
      {/*</Container>*/}
    </div>
  );
};
