<template>
  <div class="card">
    <text-field type="email" placeholder="Email" :value.sync="email"></text-field>
    <text-field type="password" placeholder="Password" :value.sync="password"></text-field>
    <button text-color="light" :raised="true" :colored="true" @click="signup">Sign Up</button>
  </div>
</template>

<script>
import firebase from 'firebase';

import Button from '../Common/Button';
import TextField from '../Common/TextField';

import {
  signedIn,
} from '../../vuex/actions';

export default {
  props: {
    levels: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 3 && value <= 5;
      },
    },
  },
  data() {
    return {
      email: undefined,
      password: undefined,
    };
  },
  methods: {
    signup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.signedIn(user);
        firebase.database().ref(`users/${user.uid}`).set({
          levels: this.levels,
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