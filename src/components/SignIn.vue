<template>
  <div class="page">
    <header-el title="Sign In">
      <button slot="left" icon="back" type="icon" v-link="{ path: '/' }"></button>
    </header-el>
    <div class="card">
      <text-field type="email" placeholder="Email" :value.sync="email"></text-field>
      <text-field type="password" placeholder="Password" :value.sync="password"></text-field>
      <button text-color="light" :raised="true" :colored="true" @click="signin">Sign In</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

import Button from './Common/Button';
import HeaderEl from './Common/Header';
import TextField from './Common/TextField';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password);
    },
  },
  components: {
    Button,
    TextField,
    HeaderEl,
  },
};
</script>