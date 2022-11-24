import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// Routes
import { PATHS } from '../routes';
// Context
import { useAuth } from '../context/LoginProvider/context';
// Helpers
import { sleep } from '../helpers';

type useLogoutTypesReturn = { handleLogout: () => Promise<void> };

/**
 * Custom hook encargado de manejar el estado de una bandera para activar
 * o desactivar la misma.
 * @param initialValue Valor inicial de la bandera
 */
const useLogout = (): useLogoutTypesReturn => {
  // Navigation
  const navigate = useNavigate();

  // Contexts
  const {
    actions: { setHasAuth, setActiveUser }
  } = useAuth();

  /**
   * Funcion que se encarga de cerrar la sesion del usuario.
   */
  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      // Simula peticion al API
      await sleep(2000);
    } finally {
      // Logout exitoso
      setHasAuth(false);
      setActiveUser();
      navigate(PATHS.Root, { replace: true });
    }
  }, [navigate, setHasAuth, setActiveUser]);

  return { handleLogout };
};

export default useLogout;
