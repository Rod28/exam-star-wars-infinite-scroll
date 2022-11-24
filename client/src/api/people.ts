// Custom client
import AxiosClient from './AxiosClient';
// Types
import { SWpeopleTypes } from '../interfaces/swPeople';

/**
 * Funcion que se encarga hacer una petición al API, para obtener información de los
 * personajes de Star Wars.
 * @param page Página de la que se quiere obtener información
 */
export const getPeopleSW = async (
  page: number,
  newCancelToken: () => any
): Promise<SWpeopleTypes> => {
  const client = AxiosClient.getClient();
  const config = {
    cancelToken: newCancelToken(),
    headers: { 'Content-Type': ' application/json' }
  };

  return client.get(`sw-universe/list-people/?page=${page}`, config);
};
