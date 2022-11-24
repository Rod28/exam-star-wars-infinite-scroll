import { ReactNode } from 'react';
import { IntersectionOptions } from 'react-intersection-observer';

export interface MotionWrappProps {
  /** Bandera que indica si debe iniciar con las animaciones sin hacer scroll */
  startTheView?: boolean;
  /** Clases para inicializar el intersection observer */
  classesIn: string;
  /** Clases para finalizar el intersection observer */
  classesOut: string;
  /** Opciones para el intersection observer  */
  options: IntersectionOptions;
  /** Elemento hijo dentro del componente */
  children: ReactNode;
}
