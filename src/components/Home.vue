<template>
  <main>
    <div class="card">
      <h1>Spoken English for Everyone</h1>
      <button v-link:="{ path: 'get-started'}" :colored="true" text-color="light" :raised="true">Get started</button>
    </div>
  </main>
</template>

<script>
import Button from './Common/Button';

import {
  isSignedIn,
} from '../vuex/getters';

export default {
  route: {
    activate(transition) {
      if (this.isSignedIn) {
        transition.redirect('/learn');
      } else {
        transition.next();
      }
    },
  },
  vuex: {
    getters: {
      isSignedIn,
    },
  },
  components: {
    Button,
  },
};
</script>

<style lang="scss">
@import '../mixins/colors';

main {
  position: relative;
  display: block;
  text-align: center;
  box-sizing: border-box;
  
  h1 {
    font-size: 34px;
    font-weight: 400;
    padding: 34px;
    color: $grey;
  }
}
</style>
