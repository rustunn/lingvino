<template>
  <div class="input">
    <div class="label" v-if="placeholder !== ''" class="placeholder" :class="{ 'raised': focused || value }">{{placeholder}}</div>
    <input :type="type" v-model="value" @focus="focus" @blur="unfocus">
    <div class="line" :class="{ 'shown': focused }"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focused: false,
    };
  },
  props: {
    value: {
      required: true,
      twoWay: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      validator(value) {
        return value === 'text' || value === 'password' || value === 'email' || value === 'number';
      },
      default: 'text',
    },
  },
  methods: {
    focus() {
      this.focused = true;
    },
    unfocus() {
      this.focused = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../mixins/colors';

.input {
  position: relative;
  display: inline-block;
  min-width: 240px;
  width: 100%;
  max-width: 320px;
  height: 66px;
  
  input {
    position: absolute;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    appearance: none;
    background-color: white;
    user-select: none;
    outline: 0;
    box-sizing: border-box;
    border: none;
    border-bottom: 2px solid rgba(0,0,0,.12);
    font-size: 16px;
    font-family: "Helvetica","Arial",sans-serif;
    margin: 20px 0;
    padding: 4px;
    width: calc(100%);
    background: 0 0;
    text-align: left;
    color: inherit;
    z-index: 3;
  }
  
  .label {
    position: absolute;
    top: 24px;
    left: 4px;
    transition: all 0.3s ease-in-out 0s;
    color: $grey;
    font-size: 16px;
    font-family: "Helvetica","Arial",sans-serif;
    transform-origin: 0% 50%;
    z-index: 0;
    
    &.raised {
      transform: translateY(-20px) scale(0.75);
      color: $mainColor;
    }
  }
  
  .line {
    position: absolute;
    left: 0px;
    top: 46px;
    height: 2px;
    width: calc(100%);
    background: $mainColor;
    transform: scale(0, 1);
    transition: all 0.3s ease-in-out 0s;
    
    &.shown {
      transform: scale(1);
    }
  }
}
</style>