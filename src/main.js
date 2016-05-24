import Vue from 'vue';
import Router from 'vue-router';
import App from './components/App';
import Home from './components/Home';
import SignIn from './components/SignIn';
import { sync } from 'vuex-router-sync';
import store from './vuex/store';
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
});

router.start(App, '#app');
