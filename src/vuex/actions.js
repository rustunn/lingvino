import {
  SET_USER,
  SIGN_OUT,
  SET_USER_DATA,
  SET_LANG,
} from './mutation-types';

export function setUser({ dispatch }, user) {
  dispatch(SET_USER, user);
}

export function signOut({ dispatch }) {
  dispatch(SIGN_OUT);
}

export function setUserData({ dispatch }, data) {
  dispatch(SET_USER_DATA, data);
}

export function setLang({ dispatch }, lang) {
  dispatch(SET_LANG, lang);
}
