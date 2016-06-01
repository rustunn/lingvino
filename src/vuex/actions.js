import {
  SIGNED_IN,
  SIGNED_OUT,
  SET_USER_DATA,
} from './mutation-types';

export const signedIn = ({ dispatch }, data) => {
  dispatch(SIGNED_IN, data);
};

export function signedOut({ dispatch }) {
  dispatch(SIGNED_OUT);
}

export function setUserData({ dispatch }, data) {
  dispatch(SET_USER_DATA, data);
}
