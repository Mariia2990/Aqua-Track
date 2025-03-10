import s from './Logo.module.css';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <div className={s.logo}>
      <Link to="/">AquaTrack</Link>
    </div>
  );
};
export default Logo;
