<template>
  <div class="page">
    <header-el title="Lingvino">
      <selector slot="left" :options="langs" :selected-id="lang" @selected="langChanged"></selector>
      <router-link :to="{ path: '/signin' }" slot="right">
        <custom-button text-color="light" :colored="false" :raised="false">{{ say('sign-in') }}</custom-button>
      </router-link>
    </header-el>
    <main>
      <div class="card">
        <h1>{{ say('home-title') }}</h1>
        <router-link :to="{ path: '/get-started' }">
          <custom-button :colored="true" text-color="light" :raised="true">{{ say('get-started') }}</custom-button>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import HeaderEl from './Common/Header';
import CustomButton from './Common/CustomButton';
import Selector from './Common/Selector';

import langMixin from '../mixins/lang';

export default {
  mixins: [langMixin],
  computed: mapState(['langs']),
  methods: {
    langChanged(lang) {
      this.setLang(lang);
    },
    ...mapMutations(['setLang']),
  },
  components: {
    CustomButton,
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
