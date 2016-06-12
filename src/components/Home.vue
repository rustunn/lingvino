<template>
  <div class="page">
    <component :is="page"></component>
  </div>
</template>

<script>
import Splash from './Splash';
import Learn from './Learn';

import {
  user,
} from '../vuex/getters';

export default {
  data() {
    return {
      page: 'splash',
    };
  },
  watch: {
    user() {
      this.changePage();
    },
  },
  route: {
    activate(transition) {
      this.changePage();
      transition.next();
    },
  },
  methods: {
    changePage() {
      if (this.user) {
        this.page = 'learn';
      } else {
        this.page = 'splash';
      }
    },
  },
  vuex: {
    getters: {
      user,
    },
  },
  components: {
    Splash,
    Learn,
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
    font-size: 32px;
    font-weight: 400;
    padding: 34px;
    color: $grey;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
}
</style>
