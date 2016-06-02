<template>
  <div class="page">
    <header-el title="My Lessons">
      <button slot="left" icon="menu" type="icon" @click="toggleDrawer"></button>
      <button slot="right" @click="signOut" text-color="light" :colored="false" :raised="false">Sign Out</button>
    </header-el>
    <drawer v-if="drawer" :list="" :first="" :opened="drawer"></drawer>
  </div>
</template>

<script>
import firebase from 'firebase';

import HeaderEl from './Common/Header';
import Button from './Common/Button';
import Drawer from './Common/Drawer';

import {
  isSignedIn,
} from '../vuex/getters';

import {
  signedOut,
} from '../vuex/actions';

export default {
  data() {
    return {
      drawer: false,
    };
  },
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
    toggleDrawer() {
      this.drawer = !this.drawer;
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
    Drawer,
  },
};
</script>

<style>
</style>