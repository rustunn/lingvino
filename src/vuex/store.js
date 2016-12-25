import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function saveLangToLocalStore(lang) {
  localStorage.setItem('lingvino-lang', lang);
}

export default new Vuex.Store({
  state: {
    user: null,
    userData: null,
    lang: 'en',
    langs: [
      {
        id: 'en',
        name: 'English',
      },
      {
        id: 'ru',
        name: 'Русский',
      },
    ],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserData(state, data) {
      state.userData = data;
      state.lang = data.lang;
      saveLangToLocalStore(data.lang);
    },
    signOut(state) {
      state.user = null;
      state.userData = null;
    },
    setLang(state, lang) {
      state.lang = lang;
      saveLangToLocalStore(lang);
    },
  },
});
