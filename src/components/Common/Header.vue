<template>
  <header>
    <div class="title">
      <slot name="left"></slot>
      <span class="name">{{title}}</span>
    </div>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../mixins/colors';
@import '../../mixins/typography';

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
</style>