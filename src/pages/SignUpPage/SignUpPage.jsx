//src/pages/SignUpPage/SignUpPage.jsx
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import Container from "../../components/Container/Container";
import Logo from "../../components/Logo/Logo";  
import styles from "./SignUpPage.module.css";
import containerStyles from "../../components/Container/Container.module.css"; 

export default function SignUpPage() {
  return (
    <Container>
      <div className={containerStyles.container}> 
        <Logo />  
        <SignUpForm />
        <AdvantagesSection />
      </div>
    </Container>
  );
}



