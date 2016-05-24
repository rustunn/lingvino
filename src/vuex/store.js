import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  user: {
    isAnonymous: true,
  },
};

const mutations = {};

export default new Vuex.Store({
  state,
  mutations,
});
