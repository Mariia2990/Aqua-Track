import clsx from 'clsx';
import css from './Loader.module.css';

import { ThreeCircles } from 'react-loader-spinner';

export const Loader = ({ absolute }) => {
  return (
    <div className={clsx(css.container, { [css.LoaderAbsolute]: absolute })}>
      <ThreeCircles color="#9BE1A0" height={150} width={150} />
    </div>
  );
};
