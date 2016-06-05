<template>
  <div :class="styles">
    <img v-if="icon" :src="iconSrc">
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
    icon: {
      type: String,
      validator(value) {
        let val = false;
        switch (value) {
          case 'play':
          case 'pause':
          case 'replay':
          case 'menu':
          case 'back':
          case 'next':
          case 'previous':
            val = true;
            break;
          default:
            break;
        }
        return val;
      },
    },
    type: {
      type: String,
      validator(value) {
        return value === 'icon';
      },
    },
  },
  computed: {
    styles() {
      return {
        colored: this.colored,
        light: this.textColor === 'light',
        dark: this.textColor === 'dark',
        raised: this.raised,
        icon: this.type === 'icon',
      };
    },
    iconSrc() {
      let imgName;
      switch (this.icon) {
        case 'play':
          imgName = 'ic_play_arrow_black_24px.svg';
          break;
        case 'pause':
          imgName = 'ic_pause_black_24px.svg';
          break;
        case 'replay':
          imgName = 'ic_replay_black_24px.svg';
          break;
        case 'menu':
          imgName = 'ic_menu_white_24px.svg';
          break;
        case 'back':
          imgName = 'ic_arrow_back_white_24px.svg';
          break;
        case 'next':
          imgName = 'ic_skip_next_black_24px.svg';
          break;
        case 'previous':
          imgName = 'ic_skip_previous_black_24px.svg';
          break;
        default:
          break;
      }
      return `/static/icons/${imgName}`;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  
  &.icon {
    width: 48px;
    min-width: 48px;
    height: 48px;
    padding: 0;
    
    img {
      margin-right: 0px;
    }
  }
  
  // &:hover {
  //   background-color: rgba(158,158,158,.2);
  // }
  
  &:active {
    background-color: rgba(158,158,158,.4);
  }
  
  &:focus {
    background-color: rgba(0,0,0,.12);
  }
  
  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
}
</style>