import Vue from 'vue';
import Router from 'vue-router';
import App from './components/App';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Recover from './components/Recover';
import GetStarted from './components/GetStarted';

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
  '/recover': {
    component: Recover,
  },
  '/get-started': {
    component: GetStarted,
  },
});

// router.beforeEach((transition) => {
//   console.log(transition);
//   transition.next();
// });

// router.redirect({
//   // redirect any not-found route to home
//   '*': '/',
// });

router.start(App, 'app');

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/lingvino-service-worker.js');
// }
