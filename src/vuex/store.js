import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {
  SIGNED_IN,
  SIGNED_OUT,
} from './mutation-types';

const state = {
  user: {
    isSignedIn: false,
  },
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
  },
};

export default new Vuex.Store({
  state,
  mutations,
});
