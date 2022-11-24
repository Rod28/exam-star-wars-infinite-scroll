// Types
import { ResultsType } from '../../../interfaces/swPeople';

export interface CharacterCardProps {
  /** Bandera que indica si el componente es solo para el modo de eliminacion */
  isModeDelete: boolean;
  /** Arreglo con los datos de los personajes */
  characters: Array<ResultsType>;
  /** Arreglo con los datos de los personajes guardamos como favoritos */
  favoriteCharacters: Array<ResultsType>;
  /** Bandera que indica que se estan cargando los datos */
  loading: boolean;
  /** Callback que maneja desde el componente padre el agregar o eliminar elementos */
  onToggleFavorites(el: ResultsType): void;
}
