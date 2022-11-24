import { ReactNode } from 'react';

export interface ContainerProps {
  /** Estilos inyectados del componente */
  className?: string;
  /** Elemento hijo dentro del componente */
  children: ReactNode;
}
