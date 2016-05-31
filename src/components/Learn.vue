<template>
  <div id="learn">
    
  </div>
</template>

<script>
import {
  isSignedIn,
} from '../vuex/getters';

export default {
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
  },
};
</script>

<style>
</style>