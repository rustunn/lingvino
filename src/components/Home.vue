<template>
  <main>
    <h1>Spoken Engish for Everyone</h1>
    <div class="button">Get started</div>
  </main>
</template>

<script>
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
};
</script>

<style lang="scss">
@import '../mixins/buttons';

main {
  position: relative;
  display: block;
  text-align: center;
  box-sizing: border-box;
  
  h1 {
    font-size: 34px;
    font-weight: 400;
    padding: 34px;
    color: #607D8B;
  }
  
  .button {
    @include colored-button-white;
    @include raised;
  }
}
</style>
