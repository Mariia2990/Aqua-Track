import s from './SignInPage.module.css';
import { AdvantagesSection } from '../../components/AdvantagesSection/AdvantagesSection';
import { SignInForm } from '../../components/SignInForm/SignInForm';
import { NavLink } from 'react-router-dom';
import { Suspense } from 'react';
import Container from '../../components/Container/Container.jsx';
import { Logo } from '../../components/Logo/Logo.jsx';
import { Loader } from '../../components/Loader/Loader.jsx';
// import Loader from '../../components/Loader/Loader.jsx';

export default function SignInPage() {
  return (
    <Suspense fallback={<Loader/>}>
      <Container>
        <div className={s.signin_wrapper}>
          <Logo />
          <SignInForm className={s.signin_form} />
          <p className={s.redirect}>
            Don't have an account?{' '}
            <NavLink className={s.redirect_to_signin} to="/signup">
              Sign Up
            </NavLink>
          </p>
        </div>
        <div className={s.advantages}>
          <AdvantagesSection />
        </div>
      </Container>
     </Suspense>
  );
}
