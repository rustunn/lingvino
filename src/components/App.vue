<template>
  <div class="container">
    <header-el></header-el>
    <router-view></router-view>
  </div>
  <footer></footer>
</template>

<script>
import firebase from 'firebase';
import Header from './Header';

export default {
  created() {
    const config = {
      apiKey: 'AIzaSyATjcg0lI0NERYfwrXElrkDl9D2_3eS6jc',
      authDomain: 'burning-inferno-7243.firebaseapp.com',
      databaseURL: 'https://burning-inferno-7243.firebaseio.com',
      storageBucket: 'burning-inferno-7243.appspot.com',
    };

    firebase.initializeApp(config);
  },
  components: {
    'header-el': Header,
  },
};
</script>

<style lang="scss">
@import '../mixins/buttons';

* {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

html, body {
  height: 100%;
}

.container {
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
</style>
