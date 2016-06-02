<template>
  <div class="page">
    <header-el title="My Lessons">
      <button slot="left" icon="menu" type="icon"></button>
      <button slot="right" @click="signOut" text-color="light" :colored="false" :raised="false">Sign Out</button>
    </header-el>
  </div>
</template>

<script>
import firebase from 'firebase';

import HeaderEl from './Common/Header';
import Button from './Common/Button';

import {
  isSignedIn,
} from '../vuex/getters';

import {
  signedOut,
} from '../vuex/actions';

export default {
  methods: {
    signOut() {
      firebase.auth().signOut()
      .then(() => {
        this.signedOut();
        this.$route.router.go('/');
      }, (error) => {
        console.log(error);
      });
    },
  },
  route: {
    activate(transition) {
      if (this.isSignedIn) {
        transition.next();
      } else {
        transition.redirect('/');
      }
    },
  },
  vuex: {
    getters: {
      isSignedIn,
    },
    actions: {
      signedOut,
    },
  },
  components: {
    HeaderEl,
    Button,
  },
};
</script>

<style>
</style>