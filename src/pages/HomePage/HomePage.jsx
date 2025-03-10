import { AdvantagesSection } from '../../components/AdvantagesSection/AdvantagesSection';
import { WelcomeSection } from '../../components/WelcomeSection/WelcomeSection';
import css from './HomePage.module.css';
import Container from '../../components/Container/Container.jsx';

export default function HomePage() {
  return (
    <Container>
      <div className={css.generalHomePage}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>
    </Container>
  );
}
