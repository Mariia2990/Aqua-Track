//src/pages/SignUpPage/SignUpPage.jsx
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import Container from "../../components/Container/Container";
//import Logo from "../../components/Logo/Logo";  // ❗️ Закоментований код залишено без змін
import styles from "./SignUpPage.module.css";
import containerStyles from "../../components/Container/Container.module.css"; // Імпорт стилів контейнера

export default function SignUpPage() {
  return (
    <Container>
      <div className={containerStyles.container}> {/* Використання правильного класу */}
        {/*<Logo />*/}  {/* ❗️ Закоментований код залишено без змін */}
        <SignUpForm />
        <AdvantagesSection />
      </div>
    </Container>
  );
}



