import Vue from 'vue';
import Router from 'vue-router';
import App from './components/App';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Learn from './components/Learn';
import GetStarted from './components/GetStarted';
import VueValidator from 'vue-validator';

Vue.use(VueValidator);
Vue.use(Router);

/* eslint-disable no-new */
const router = new Router({ history: true });

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
  '/get-started': {
    component: GetStarted,
  },
});

router.beforeEach((transition) => {
  console.log(transition);
  transition.next();
});

router.redirect({
  // redirect any not-found route to home
  '*': '/',
});

router.start(App, 'app');
