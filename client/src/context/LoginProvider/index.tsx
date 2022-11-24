import { useReducer, useCallback } from 'react';
import LocalStorage from 'local-storage-to-object';
// Context
import { context, initialState } from './context';
// Reducers
import loginReducers from './reducers';
// Types
import { ProviderProps, SET_AUTH, SET_ACTIVE_USER } from './types';
import { UserType } from '../../interfaces/login';
import { ResultsType } from '../../interfaces/swPeople';

const Login = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(loginReducers, initialState);

  /* ------------- ACTIONS ------------- */

  /**
   * Funcion que se encarga de cambiar el estado del login.
   * @param v Valor al que va a ser actualizado el estado del login
   */
  const setHasAuth = useCallback((v: boolean): void => {
    // Persistimos la sesion en local storage para no perderla en caso de cargar.
    LocalStorage.setItem('Login', { auth: v });

    dispatch({
      type: SET_AUTH,
      payload: v
    });
  }, []);

  /**
   *  Funcion que actualiza el usuario activo.
   * @param v Datos del usuario que tiene sesion iniciada
   */
  const setActiveUser = useCallback((v?: UserType): void => {
    // Persistimos el usuario activo en local storage.
    LocalStorage.setItem('Login', { activeUser: v });

    dispatch({
      type: SET_ACTIVE_USER,
      payload: v
    });
  }, []);

  /**
   * La funcion se encarga de almacenar un nuevo elemento en la sección correspondiente dependiendo del valor
   * de 'type'.
   * Se almacena en localStorage y se actualiza el context.
   * @param user Nombre del usuario activo
   * @param data Nuevo dato de favoriteThings
   */
  const setToggleFavoriteThingsData = useCallback(
    (user: string, data: ResultsType): void => {
      const localStorageUsers: Array<UserType> = LocalStorage.getItem(
        'Login',
        'users',
        []
      );

      // Obtenemos los datos del usuario que esta loggeado
      const currentUserData: Array<UserType> = localStorageUsers.filter(
        (ls) => ls.user === user
      );

      // Obtenemos los datos de los usuarios, distintos al que esta loggeado
      const resUserData: Array<UserType> = localStorageUsers.filter(
        (ls) => ls.user !== user
      );

      // Accedemos al objeto 'favoriteThings' del usuario loggeado
      const currentfavoriteThings: Array<ResultsType> =
        currentUserData[0].favoriteThings || [];

      /**
       * Eliminamos el elemento que coincida con 'data', esto permite
       * eliminar el elemento si es que ya existe y se pasa a esta funcion.
       */
      const newFavoriteThings: Array<ResultsType> =
        currentfavoriteThings.filter((item) => item.name !== data.name);

      /**
       * Buscamos en 'currentfavoriteThings' al elemento que recibe esta funcion,
       * esto nos permite agregarlo si es que no existia.
       */
      const findCurrentCharacter: Array<ResultsType> =
        currentfavoriteThings.filter((item) => item.name === data.name);

      // Agregamos el nuevo elemento solo si este no existia antes.
      if (!findCurrentCharacter.length) {
        newFavoriteThings.push(data);
      }

      // Sobrescribimos todos los datos del usuario loggeado
      const updateCurrentUser: UserType = {
        ...currentUserData[0],
        favoriteThings: newFavoriteThings
      };

      // Generamos el nuevo arreglo de 'users', tanto del loggeado como del resto.
      const newUserData = [...resUserData, updateCurrentUser];

      // Se almacenan los nuevos datos en localStorage
      LocalStorage.setItem('Login', { users: newUserData });
      LocalStorage.setItem('Login', { activeUser: updateCurrentUser });

      // Actualizamos el context
      dispatch({
        type: SET_ACTIVE_USER,
        payload: updateCurrentUser
      });
    },
    []
  );

  const value = {
    state,
    actions: {
      setHasAuth,
      setActiveUser,
      setToggleFavoriteThingsData
    }
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export default Login;
