<template>
  <div class="container">
    <router-view></router-view>
  </div>
  <footer>&#169; Lingvion 2016</footer>
</template>

<script>
import store from '../vuex/store';
import firebase from 'firebase';

import {
  setUser,
  signOut,
  setUserData,
  setLang,
} from '../vuex/actions';

export default {
  created() {
    let lang = localStorage.getItem('lingvino-lang');
    if (lang) {
      this.setLang(lang);
    } else {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const decoder = new google.maps.Geocoder;
          const latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
          decoder.geocode({ location: latlng }, (results) => {
            lang = this.findLanguage(results[0].formatted_address);
            localStorage.setItem('lingvino-lang', lang);
            this.setLang(lang);
          });
        });
      }
    }

    const config = {
      apiKey: 'AIzaSyATjcg0lI0NERYfwrXElrkDl9D2_3eS6jc',
      authDomain: 'burning-inferno-7243.firebaseapp.com',
      databaseURL: 'https://burning-inferno-7243.firebaseio.com',
      storageBucket: 'burning-inferno-7243.appspot.com',
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUser(user);
        firebase.database().ref(`users/${user.uid}`).on('value', snapshot => {
          this.setUserData(snapshot.val());
        });
        this.$router.go('/');
      } else {
        this.signOut();
        this.$router.go('/');
      }
    });
  },
  methods: {
    isRu(address) {
      let found = false;
      /* eslint-disable max-len */
      const countries = ['Russia', 'Belarus', 'Ukraine', 'Kazakhstan', 'Moldova', 'Estonia', 'Latvia', 'Lithuania', 'Georgia', 'Armenia', 'Azerbaijan', 'Uzbekistan', 'Turkmenistan', 'Kyrgyzstan', 'Tajikistan'];
      countries.forEach(country => {
        if (address.indexOf(country) !== -1) found = true;
      });
      return found;
    },
    findLanguage(address) {
      let lang;
      if (this.isRu(address)) lang = 'ru';
      else lang = 'en';
      return lang;
    },
  },
  vuex: {
    actions: {
      setUser,
      signOut,
      setUserData,
      setLang,
    },
  },
  store,
};
</script>

<style lang="scss">
@import '../mixins/common';
@import '../mixins/typography';

* {
  margin: 0;
  padding: 0;
  border: 0;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  /*user-select: none;*/
}

html, body {
  height: 100%;
}

.container {
  position: relative;
  min-height: 100%;
  margin-bottom: -20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}

footer {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1.8rem 0 1.8rem;
  background: #616161;
  height: 20px;
  color: white;
  line-height: 20px;
  font-size: 12px;
  text-align: right;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}

.view-transition {
  opacity: 1;
  transition: all 0.3s ease-in-out 0s;
}

.view-enter, .view-leave {
  opacity: 0;
}

.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
}
</style>
