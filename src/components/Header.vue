<template>
  <header>
    <div class="title">
      <div v-if="showMenu"  class="menu"></div>
      <span v-link="{ path: '/' }" class="name">Lingvino</span>
    </div>
    <button v-link="{ path: 'signin' }" class="button">Sign In</button>
  </header>
</template>

<sctipt>
export default {
  computed: {
    showMenu() {
      let show = false;
      if (this.$route.path !== '/') show = true;
    },
  },
};
</sctipt>

<style scoped lang="scss">
@import '../mixins/colors';
@import '../mixins/buttons';

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  background-color: $mainColor;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  z-index: 2;
}

.button {
  @include colored-button-white;
  margin-right: 6px;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.name {
  display: block;
  position: relative;
  font-size: 20px;
  color: white;
  left: 16px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
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