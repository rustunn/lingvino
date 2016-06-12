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

function isRu(address) {
  let found = false;
  /* eslint-disable max-len */
  const countries = ['Russia', 'Belarus', 'Ukraine', 'Kazakhstan', 'Moldova', 'Estonia', 'Latvia', 'Lithuania', 'Georgia', 'Armenia', 'Azerbaijan', 'Uzbekistan', 'Turkmenistan', 'Kyrgyzstan', 'Tajikistan'];
  countries.forEach(country => {
    if (address.indexOf(country) !== -1) found = true;
  });
  return found;
}

function findLanguage(address) {
  if (isRu(address)) localStorage.setItem('lingvino-lang', 'ru');
  else localStorage.setItem('lingvino-lang', 'en');
}

if (localStorage.getItem('lingvino-lang')) {
  // console.log(localStorage.getItem('lingvinoLang'));
} else {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const decoder = new google.maps.Geocoder;
      const latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
      decoder.geocode({ location: latlng }, (results) => {
        findLanguage(results[0].formatted_address);
      });
    });
  }
}
