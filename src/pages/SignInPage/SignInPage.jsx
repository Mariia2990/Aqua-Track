import s from './SignInPage.module.css';
import { AdvantagesSection } from '../../components/AdvantagesSection/AdvantagesSection';
import { SignInForm } from '../../components/SignInForm/SignInForm';
import { NavLink } from 'react-router-dom';

export default function SignInPage() {
  return (
    <div className={s.signin_wrapper}>
      <h2>logo</h2>
      <SignInForm className={s.signin_form} />
      <p className={s.redirect}>
        Don't hane an account?{' '}
        <NavLink className={s.redirect_to_signin} to="/signup">
          Sign Up
        </NavLink>
      </p>
      <AdvantagesSection />
    </div>
  );
}
