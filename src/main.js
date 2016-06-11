import Vue from 'vue';
import Router from 'vue-router';
import App from './components/App';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Recover from './components/Recover';
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

if (localStorage.getItem('lingvinoLang')) {
  console.log(localStorage.getItem('lingvinoLang'));
} else {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      /* eslint-disable */
      const decoder = new google.maps.Geocoder;
      const latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
      decoder.geocode({ location: latlng }, (results) => {
        findLanguage(results[0].formatted_address);
      });
    });
  }
}

function findLanguage(address) {
  const isRu = address.indexOf('Russia');
  const isEn = address.indexOf('USA');
  if (isRu !== -1) localStorage.setItem('lingvinoLang', 'ru');
  else localStorage.setItem('lingvinoLang', 'en');
}
