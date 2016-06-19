<template>
  <div v-if="opened" transition="open" class="drawer">
    <slot></slot>
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
  methods: {
    toggle() {
      this.opened = !this.opened;
    },
  },
};
</script>

<style lang="scss" scoped>

.drawer.open-transition {
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
  transform: translateX(0%);
  transition: transform 0.3s ease-in-out 0s;
  
  &.open-enter, &.open-leave {
    transform: translateX(-100%);
  }
}
</style>