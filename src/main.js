import Vue from 'vue';
import Router from 'vue-router';
import store from './vuex/store';
import App from './components/App';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Recover from './components/Recover';
import GetStarted from './components/GetStarted';

Vue.use(Router);

const routes = [
  { path: '/', component: Home },
  { path: '/signin', component: SignIn },
  { path: '/recover', component: Recover },
  { path: '/get-started', component: GetStarted },
];

const router = new Router({ routes, mode: 'history' });

// router.beforeEach((transition) => {
//   console.log(transition);
//   transition.next();
// });

// router.redirect({
//   // redirect any not-found route to home
//   '*': '/',
// });

new Vue({
  router,
  store,
  ...App,
}).$mount('app');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

window.initMap = () => {};
