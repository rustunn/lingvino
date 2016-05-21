import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home';
import { sync } from 'vuex-router-sync';
import store from './vuex/store';
Vue.use(Router);

/* eslint-disable no-new */
const router = new Router();
sync(store, router);
const App = Vue.extend({});

router.map({
  '/': {
    component: Home,
  },
});

router.start(App, 'body');
