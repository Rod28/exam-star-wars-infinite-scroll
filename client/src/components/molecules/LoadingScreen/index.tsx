import { useEffect } from 'react';
// Components
import Spinner from '../../atoms/Spinner';
// Helpers
import { enabledScroll, disabledScroll } from '../../../helpers/utils';
// Types
import { LoadingScreenProps } from './types';
// Styles
import './style.scss';

/**
 * El componente renderiza una pantalla completa de carga
 */
const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  // Animaciones para abrir la modal
  const classesOpenModal = isLoading
    ? 'loading-screen--open'
    : 'loading-screen--close';

  /**
   * Al detectar que 'isOpen' esta como true, se deshabilita el scroll.
   * Si esta como false, se vuelve a habilitar.
   */
  useEffect(() => {
    if (isLoading) {
      disabledScroll();
      return;
    }

    enabledScroll();
  }, [isLoading]);

  return (
    <div className={`loading-screen ${classesOpenModal}`}>
      <Spinner isLoading={isLoading} />
    </div>
  );
};

export default LoadingScreen;
