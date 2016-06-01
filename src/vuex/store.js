import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {
  SIGNED_IN,
  SIGNED_OUT,
  SET_USER_DATA,
} from './mutation-types';

const state = {
  user: {
    isSignedIn: false,
  },
  userData: undefined,
};

const mutations = {
  [SIGNED_IN](st, data) {
    state.user.isSignedIn = true;
    state.user.uid = data.uid;
    state.user.email = data.email;
  },

  [SIGNED_OUT]() {
    state.user.isSignedIn = false;
    delete state.user.uid;
    delete state.user.email;
    delete state.userData;
  },
  [SET_USER_DATA](st, data) {
    state.userData = data;
  },
};

export default new Vuex.Store({
  state,
  mutations,
});
