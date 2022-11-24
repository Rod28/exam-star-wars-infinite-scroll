import { createContext, useContext } from 'react';
import LocalStorage from 'local-storage-to-object';
// Types
import { StateTypes, ActionTypes, ContextType } from './types';

export const initialState: StateTypes = {
  hasAuth: LocalStorage.getItem('Login', 'auth', false),
  activeUser: LocalStorage.getItem('Login', 'activeUser')
};

const actions: ActionTypes = {
  setHasAuth: () => {
    /* */
  },
  setActiveUser: () => {
    /* */
  },
  setToggleFavoriteThingsData: () => {
    /* */
  }
};

export const context = createContext<ContextType>({
  state: initialState,
  actions
});

export const useAuth = () => useContext(context);
