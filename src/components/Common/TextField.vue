<template>
  <div class="input">
    <div class="label placeholder" v-if="placeholder !== ''" :class="{ 'raised': focused || value }">{{placeholder}}</div>
    <input v-if="type === 'text'" type="text" v-model="realVal" @focus="focus" @blur="unfocus">
    <input v-if="type === 'password'" type="password" v-model="realVal" @focus="focus" @blur="unfocus">
    <input v-if="type === 'email'" type="email" v-model="realVal" @focus="focus" @blur="unfocus">
    <input v-if="type === 'number'" type="number" v-model="realVal" @focus="focus" @blur="unfocus">
    <div class="line" :class="{ 'shown': focused }"></div>
    <div v-if="error" class="error">{{error}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focused: false,
      realVal: null,
    };
  },
  props: {
    value: {
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      validator(val) {
        const values = ['text', 'password', 'email', 'number'];
        return values.includes(val);
      },
      default: 'text',
    },
    error: {
      type: String,
    },
  },
  created() {
    this.updateRealVal(this.value);
  },
  watch: {
    value(val) {
      this.updateRealVal(val);
    },
    realVal(val) {
      this.$emit('value-updated', val);
    },
  },
  methods: {
    focus() {
      this.focused = true;
    },
    unfocus() {
      this.focused = false;
    },
    updateRealVal(val) {
      this.realVal = val;
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
    outline: 0;
    box-sizing: border-box;
    border: none;
    border-bottom: 2px solid rgba(0,0,0,.12);
    font-size: 16px;
    font-family: "Helvetica","Arial",sans-serif;
    margin: 20px 0;
    padding: 4px;
    width: calc(100%);
    background: transparent;
    text-align: left;
    color: $grey;
    z-index: 3;
    user-select: text;
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
    z-index: 1;
    
    &.shown {
      transform: scale(1);
    }
  }

  .error {
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    height: 12px;
    font-size: 12px;
    font-family: "Helvetica","Arial",sans-serif;
    color: red;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 4px;
  }
}
</style>