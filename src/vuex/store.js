import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {
  SET_USER,
  SIGN_OUT,
  SET_USER_DATA,
  SET_LANG,
} from './mutation-types';

const state = {
  user: null,
  userData: null,
  lang: 'en',
};

const mutations = {
  [SET_USER](st, user) {
    state.user = user;
  },
  [SIGN_OUT]() {
    state.user = null;
    state.userData = null;
  },
  [SET_USER_DATA](st, data) {
    state.userData = data;
    state.lang = data.lang;
    localStorage.setItem('lingvino-lang', data.lang);
  },
  [SET_LANG](st, lang) {
    state.lang = lang;
  },
};

export default new Vuex.Store({
  state,
  mutations,
});
