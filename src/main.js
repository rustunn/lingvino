import Vue from 'vue';
import Router from 'vue-router';
import App from './components/App';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Learn from './components/Learn';
import { sync } from 'vuex-router-sync';
import store from './vuex/store';
import VueValidator from 'vue-validator';

Vue.use(VueValidator);
Vue.use(Router);

/* eslint-disable no-new */
const router = new Router({ history: true });
sync(store, router);

router.map({
  '/': {
    component: Home,
  },
  '/signin': {
    component: SignIn,
  },
  '/learn': {
    component: Learn,
  },
});

router.start(App, '#app');
