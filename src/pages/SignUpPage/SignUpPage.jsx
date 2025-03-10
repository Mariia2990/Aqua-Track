//src/pages/SignUpPage/SignUpPage.jsx
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import Container from "../../components/Container/Container";
import Logo from "../../components/Logo/Logo";
import styles from "./SignUpPage.module.css";

export default function SignUpPage() {
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.formContainer}>
          <Logo />
          <SignUpForm />
        </div>

        <div className={styles.advantagesContainer}>
          <AdvantagesSection />
        </div>
      </div>
    </Container>
  );
}



