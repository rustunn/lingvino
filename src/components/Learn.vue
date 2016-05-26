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
        console.log(1);
        transition.next();
      } else {
        console.log(2);
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