<template>
  <div class="container">
    <router-view transition="view"></router-view>
  </div>
  <footer></footer>
</template>

<script>
import firebase from 'firebase';

import store from '../vuex/store';

import {
  signedIn,
  signedOut,
} from '../vuex/actions';

export default {
  created() {
    const config = {
      apiKey: 'AIzaSyATjcg0lI0NERYfwrXElrkDl9D2_3eS6jc',
      authDomain: 'burning-inferno-7243.firebaseapp.com',
      databaseURL: 'https://burning-inferno-7243.firebaseio.com',
      storageBucket: 'burning-inferno-7243.appspot.com',
    };

    firebase.initializeApp(config);

    const user = firebase.auth().currentUser;
    if (user) {
      this.signedIn(user);
    } else {
      this.signedOut();
    }
  },
  vuex: {
    actions: {
      signedIn,
      signedOut,
    },
  },
  store,
};
</script>

<style lang="scss">
@import '../mixins/common';

* {
  margin: 0;
  padding: 0;
  border: 0;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

html, body {
  height: 100%;
}

.container {
  position: relative;
  min-height: 100%;
  margin-bottom: -2rem;
  padding-bottom: 2rem;
  box-sizing: border-box;
}

footer {
  width: 100%;
  box-sizing: border-box;
  padding: 0 1.8rem 0 1.8rem;
  background: #282828;
  height: 2rem;
  background: #424242;
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
