import {
  SIGNED_IN,
  SIGNED_OUT,
} from './mutation-types';

export const signedIn = ({ dispatch }, data) => {
  dispatch(SIGNED_IN, data);
};

export function signedOut({ dispatch }) {
  dispatch(SIGNED_OUT);
}
