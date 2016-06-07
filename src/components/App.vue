<template>
  <div class="container">
    <router-view :user="user" :user-data="userData"></router-view>
  </div>
  <footer>&#169; Lingvion 2016</footer>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      user: null,
      userData: null,
    };
  },
  created() {
    const config = {
      apiKey: 'AIzaSyATjcg0lI0NERYfwrXElrkDl9D2_3eS6jc',
      authDomain: 'burning-inferno-7243.firebaseapp.com',
      databaseURL: 'https://burning-inferno-7243.firebaseio.com',
      storageBucket: 'burning-inferno-7243.appspot.com',
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        firebase.database().ref(`users/${user.uid}`).on('value', snapshot => {
          this.userData = snapshot.val();
        });
        this.$router.go('/');
      } else {
        this.user = null;
        this.userData = null;
        this.$router.go('/');
      }
    });
  },
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
  user-select: none;
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
