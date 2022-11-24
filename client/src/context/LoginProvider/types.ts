import { ReactNode } from 'react';
// Types
import { UserType } from '../../interfaces/login';
import { ResultsType } from '../../interfaces/swPeople';

export const SET_AUTH = 'SET_AUTH';
export const SET_ACTIVE_USER = 'SET_ACTIVE_USER';

export interface ProviderProps {
  /** Componentes hijo */
  children: ReactNode;
}

// State
export interface StateTypes {
  /** Bandera que indica si el usuario hizo o no login */
  hasAuth: boolean;
  /** Datos del usuario que tiene sesion iniciada */
  activeUser?: UserType;
}

// Actions
export interface ActionTypes {
  /** Funcion que modifica el estado del login */
  setHasAuth(val: boolean): void;
  /** Funcion que actualiza el usuario activo */
  setActiveUser(val?: UserType): void;
  /** Funcion que actualiza los datos de los personajes que se almacenan */
  setToggleFavoriteThingsData(user: string, data: ResultsType): void;
}

// Actions
export interface SetHasAuth {
  type: 'SET_AUTH';
  payload: boolean;
}

export interface SetActiveUser {
  type: 'SET_ACTIVE_USER';
  payload?: UserType;
}

export interface SetToggleFavoriteThingsData {
  type: 'SET_ACTIVE_USER';
  payload?: UserType;
}

// All actions types
export type ActionsTypes =
  | SetHasAuth
  | SetActiveUser
  | SetToggleFavoriteThingsData;

// Context
export interface ContextType {
  state: StateTypes;
  actions: ActionTypes;
}
