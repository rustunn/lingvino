<template>
  <div :class="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    colored: {
      type: Boolean,
      default: false,
    },
    raised: {
      type: Boolean,
      default: false,
    },
    textColor: {
      type: String,
      validator(value) {
        return value === 'dark' || value === 'light';
      },
      default: 'dark',
    },
  },
  computed: {
    styles() {
      return {
        colored: this.colored,
        light: this.textColor === 'light',
        dark: this.textColor === 'dark',
        raised: this.raised,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../mixins/colors';

div {
  border-radius: 2px;
  position: relative;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  display: inline-block;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0;
  overflow: hidden;
  will-change: box-shadow;
  transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 36px;
  vertical-align: middle;
  background: 0 0;
  
  &.colored {
    background-color: $mainColor;
  }
  
  &.raised {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  }
  
  &.dark {
    color: $grey;
  }
  
  &.light {
    color: white;
  }
  
  &:hover {
    background-color: rgba(158,158,158,.2);
  }
  
  &:active {
    background-color: rgba(158,158,158,.4);
  }
  
  &:focus {
    background-color: rgba(0,0,0,.12);
  }
}
</style>