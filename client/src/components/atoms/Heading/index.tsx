import { useMemo } from 'react';
// Components
import MessageI18n from '../MessageI18n';
// Types
import { HeadingProps } from './types';
// Styles
import './style.scss';

/**
 * Renderiza un elemento <h1> al <h6> dependiendo del h que se le pase.
 * El 'title' o 'children', se renderizan dentro del elemento, pero si existen
 * ambos, sólo tomará en cuenta el props 'title'.
 */
const Heading = ({
  h,
  title,
  color,
  align,
  isUppercase,
  className,
  children
}: HeadingProps) => {
  // Dynamic styles
  const hasUppercase = useMemo(
    () => (isUppercase ? 'uppercase' : ''),
    [isUppercase]
  );

  // Styles props
  const styles = useMemo(
    () =>
      `text-${color} font-align-${align} font-weight-bold ${hasUppercase} ${className}`,
    [align, className, color, hasUppercase]
  );

  // No renderiza el componente
  if (!title && !children) {
    return null;
  }

  switch (h) {
    case 6: {
      return (
        <h6 className={`heading6 ${styles}`}>
          <MessageI18n title={children || title} />
        </h6>
      );
    }
    case 5: {
      return (
        <h5 className={`heading5 ${styles}`}>
          <MessageI18n title={children || title} />
        </h5>
      );
    }
    case 4: {
      return (
        <h4 className={`heading4 ${styles}`}>
          <MessageI18n title={children || title} />
        </h4>
      );
    }
    case 3: {
      return (
        <h3 className={`heading3 ${styles}`}>
          <MessageI18n title={children || title} />
        </h3>
      );
    }
    case 2: {
      return (
        <h2 className={`heading2 ${styles}`}>
          <MessageI18n title={children || title} />
        </h2>
      );
    }
    default: {
      return (
        <h1 className={`heading1 ${styles}`}>
          <MessageI18n title={children || title} />
        </h1>
      );
    }
  }
};

Heading.defaultProps = {
  title: '',
  color: 'black',
  isUppercase: false
};

export default Heading;
