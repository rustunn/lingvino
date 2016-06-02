<template>
  <div class="drawer" :class="{ 'opened': opened }">
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    },
    first: {
      type: Object,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer {
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-250px);
  width: 240px;
  height: 100vh;
  overflow: scroll;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  box-sizing: border-box;
  border-right: 1px solid #e0e0e0;
  background: #fafafa;
  transition: all 0.3s ease-in-out 0s;
  
  &.opened {
    transform: translateX(0);
  }
}
</style>