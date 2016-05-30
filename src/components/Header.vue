<template>
  <header>
    <div class="title">
      <button v-if="showMenu" icon="menu" type="icon"></button>
      <span v-link="{ path: '/' }" class="name">Lingvino</span>
    </div>
    <button v-if="isSignedIn" @click="signOut" text-color="light" :colored="false" :raised="false">Sign Out</button>
    <button v-if="!isSignedIn && !isSignInPage" v-link="{ path: '/signin' }" text-color="light" :colored="false" :raised="false">Sign In</button>
  </header>
</template>

<script>
import firebase from 'firebase';
import Button from './Common/Button';

import {
  isSignedIn,
} from '../vuex/getters';

import {
  signedOut,
} from '../vuex/actions';

export default {
  computed: {
    showMenu() {
      let show = false;
      if (this.$route.path === '/learn') show = true;
      return show;
    },
    isSignInPage() {
      let signin = false;
      if (this.$route.path === '/signin') signin = true;
      return signin;
    },
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
    Button,
  },
};
</script>

<style scoped lang="scss">
@import '../mixins/colors';
@import '../mixins/typography';

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  background-color: $mainColor;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  z-index: 2;
  padding-right: 6px;
  box-sizing: border-box;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.name {
  @include header;
  
  display: block;
  position: relative;
  left: 16px;
  line-height: 1;
  box-sizing: border-box;
}

.menu {
  display: block;
  position: relative;
  width: 48px;
  height: 48px;
  cursor: pointer;
  background-image: url('/static/icons/ic_menu_white_24px.svg');
  background-size: 24px 24px;
  background-position: 12px 12px;
  background-repeat: no-repeat;
}
</style>