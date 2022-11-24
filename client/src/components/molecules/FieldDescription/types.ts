// Types
import { TypographyTitleTypes } from '../../atoms/Typography/types';
import { Align } from '../../../interfaces/texts';

export interface FieldItem {
  /** Identificador de cada elemento */
  id: string;
  /** Nombre o titulo del elemento */
  name: TypographyTitleTypes;
  /** Descripcion del elemento */
  description: TypographyTitleTypes;
}

export interface FieldDescriptionProps {
  /** Matriz de elementos a renderizar */
  items: Array<FieldItem>;
  /** Alineacion del elemento */
  align?: Align;
}
