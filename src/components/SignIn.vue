<template>
  <div class="card">
    <input v-model="email" type="text" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <button text-color="light" :raised="true" :colored="true" @click="signin">Sign In</button>
  </div>
</template>

<script>
import firebase from 'firebase';

import Button from './Common/Button';

import {
  signedIn,
} from '../vuex/actions';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.signedIn(user);
        firebase.database().ref(`users/${user.uid}`).set({
          levels: 5,
        });
        this.$router.go('/learn');
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  vuex: {
    actions: {
      signedIn,
    },
  },
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
@import '../mixins/input';

.card {
  input[type="text"], input[type="password"] {
    @include textfeild;
  }
}
</style>