import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home';
Vue.use(Router);

/* eslint-disable no-new */
const router = new Router();
const App = Vue.extend({});

router.map({
  '/': {
    component: Home,
  },
});

router.start(App, 'body');
