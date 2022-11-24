import { SET_AUTH, SET_ACTIVE_USER, StateTypes, ActionsTypes } from './types';

export default function loginReducers(
  state: StateTypes,
  actions: ActionsTypes
): StateTypes {
  const { type, payload } = actions;

  if (type === SET_AUTH) {
    return { ...state, hasAuth: payload };
  }

  if (type === SET_ACTIVE_USER) {
    return { ...state, activeUser: payload };
  }

  return state;
}
