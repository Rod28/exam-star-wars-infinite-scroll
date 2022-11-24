// Types
import { ContainerProps } from './types';

/**
 * Renderiza un elemento <div> que coloca un margen en el eje "X" para separar
 * los elementos del borde de la pantalla.
  Este margen sólo es colocado en dispositivos móviles.
 */
const Container = ({ className, children }: ContainerProps) => {
  if (className) {
    return (
      <div className="container">
        <div className={className}>{children}</div>
      </div>
    );
  }

  return <div className="container">{children}</div>;
};

export default Container;
