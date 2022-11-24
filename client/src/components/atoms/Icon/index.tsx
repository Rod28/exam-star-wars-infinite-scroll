// Components
import StoreSVG from '../StoreSVG';
// Types
import { IconProps } from './types';
// Styles
import './style.scss';

/**
 * Renderiza un icono y dependiendo de si existe o no el prop
 * 'isLabel' el elemento padre de este sera un div o un label.
 */
const Icon = ({
  name,
  color,
  htmlFor,
  className,
  isLabel,
  children
}: IconProps) => {
  // Color actual del texto
  const currentColor = color ? `text-${color}` : '';

  return (
    <>
      {isLabel ? (
        <label
          htmlFor={htmlFor}
          className={`icon ${currentColor} ${className}`}
        >
          <StoreSVG name={name} />
          {children}
        </label>
      ) : (
        <div className={`icon ${currentColor} ${className}`}>
          <StoreSVG name={name} />
          {children}
        </div>
      )}
    </>
  );
};

export default Icon;
