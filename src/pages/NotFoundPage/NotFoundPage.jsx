import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import { BiGhost } from 'react-icons/bi';
import { Logo } from "../../components/Logo/Logo";
import Container  from "../../components/Container/Container";


export default function NotFoundPage() {
  return (
    <Container>
      <Logo />
      <div className={css.NFBox2}>
        <BiGhost size={100} color="#9be1a0" />
        <h2 className={css.NFTitle1}>Page not found - 404</h2>
        <div className={css.NFButtonBox}>
          <Link to="/" className={css.NFButton_tracker}>
            Go home
          </Link>
        </div>
      </div>
    </Container>
  );
}
