import { useEffect } from 'react';
import { Routes, useLocation } from 'react-router-dom';
// Helpers
import { toScrollTop } from '../../helpers/utils';
// Types
import { RoutesMainProps } from './types';

const RoutesMain = ({ children }: RoutesMainProps) => {
  // Location
  const location = useLocation();

  /**
   * Hace un scroll al tope de la pantalla, cada vez que location cambia sus valores.
   */
  useEffect(() => {
    toScrollTop();
  }, [location]);

  return (
    <main>
      <Routes>{children}</Routes>
    </main>
  );
};

export default RoutesMain;
