<template>
  <div class="card">
    <text-field type="text" placeholder="Email" :value.sync="email"></text-field>
    <text-field type="password" placeholder="Password" :value.sync="password"></text-field>
    <button text-color="light" :raised="true" :colored="true" @click="signin">Sign In</button>
  </div>
</template>

<script>
import firebase from 'firebase';

import Button from './Common/Button';
import TextField from './Common/TextField';

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
    TextField,
  },
};
</script>