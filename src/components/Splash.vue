<template>
  <div class="page">
    <header-el title="Lingvino">
      <selector slot="left" :slot="[]"></selector>
      <button slot="right" v-link="{ path: '/signin' }" text-color="light" :colored="false" :raised="false">{{ say('sign-in') }}</button>
    </header-el>
    <main>
      <div class="card">
        <h1>{{ say('home-title') }}</h1>
        <button v-link:="{ path: 'get-started'}" :colored="true" text-color="light" :raised="true">{{ say('get-started') }}</button>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderEl from './Common/Header';
import Button from './Common/Button';
import Selector from './Common/Selector';

import langMixin from '../mixins/lang';

export default {
  mixins: [langMixin],
  components: {
    Button,
    HeaderEl,
    Selector,
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
