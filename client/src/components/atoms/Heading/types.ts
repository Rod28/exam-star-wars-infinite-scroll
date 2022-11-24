// Types
import { MessageTitleTypes } from '../MessageI18n/type';
import { Colors } from '../../../interfaces/colors';
import { Align } from '../../../interfaces/texts';
export interface HeadingProps {
  /** Título del hero */
  title: MessageTitleTypes;
  /** Color del texto */
  color: Colors;
  /** Alineacion del elemento */
  align?: Align;
  /** Bandera que indica si el texto se debe mostrar en uppercase */
  isUppercase: boolean;
  /** Elemento a renderizar, del <h1> al <h6> */
  h: 1 | 2 | 3 | 4 | 5 | 6;
  /** Clases inyectadas para el componente */
  className?: string;
  /** Elemento hijo dentro del componente */
  children?: MessageTitleTypes;
}
