<template>
  <transition name="open">
    <div v-if="opened" class="drawer">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
  },
};
</script>

<style lang="scss" scoped>

.drawer {
  position: absolute;
  left: 0;
  top: 0;
  width: 66%;
  max-width: 400px;
  height: 100vh;
  overflow-y: scroll;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  box-sizing: border-box;
  border-right: 1px solid #e0e0e0;
  background: #fafafa;
  will-change: transform;
  transform: translateX(0px);
  transition: transform 0.3s ease-in-out 0s;
  
  &.open-enter, &.open-enter-acitve, &.open-leave-active {
    transform: translateX(-100%);
  }
}
</style>