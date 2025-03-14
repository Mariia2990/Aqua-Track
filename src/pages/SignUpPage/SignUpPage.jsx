//src/pages/SignUpPage/SignUpPage.jsx
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import Container from "../../components/Container/Container";
import Logo from "../../components/Logo/Logo";
import styles from "./SignUpPage.module.css";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <Container>
      <div className={styles.signup_wrapper}>
        <Logo />
        <SignUpForm className={styles.signup_form} />
        <p className={styles.redirect}>
          Already have an account?{" "}
          <Link className={styles.redirect_to_signin} to="/signin">
            Sign In
          </Link>
        </p>
      </div>
      <div className={styles.advantages}>
        <AdvantagesSection />
      </div>
    </Container>
  );
}




