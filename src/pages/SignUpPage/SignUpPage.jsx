//src/pages/SignUpPage/SignUpPage.jsx
import { Suspense } from "react";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import Container from "../../components/Container/Container";
import Logo from "../../components/Logo/Logo";
import styles from "./SignUpPage.module.css";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
      <Container>
        <Logo />
        <h2 className={styles.title}>Create an account</h2>
        <SignUpForm />
        <AdvantagesSection />
      </Container>
    </Suspense>
  );
}


