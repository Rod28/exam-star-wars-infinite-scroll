// Svgs
import SVGS from '../../../svg/createSvg';
// Types
import { StoreSVGProps } from './types';
// Styles
import './style.scss';

/**
 * Componente que va a renderizar el nombre del icono que coincida con
 * uno dentro del paquete de createSvg.
 * Si no coincide con ningún nombre, se renderiza un icono por defecto.
 */
const StoreSVG = ({ name }: StoreSVGProps) => {
  const iconDefault = 'default';
  const svg = SVGS.find((svg) => svg.name === name || svg.name === iconDefault);

  return (
    <svg viewBox={svg?.icon?.viewBox} className="svg">
      {svg?.icon?.svg}
    </svg>
  );
};

export default StoreSVG;
