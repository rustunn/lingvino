<template>
  <div class="radio-button" @click="clicked">
    <div class="selector" :class="{ 'checked': checked }">
      <div v-if="checked" transition="fill" class="fill"></div>
    </div>
    <span>{{label}}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    value: {
      required: true,
    },
  },
  methods: {
    clicked() {
      this.checked = !this.checked;
      if (this.checked) this.$emit('checked', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../mixins/colors';
@import '../../mixins/typography';

.radio-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 6px;
  
  .selector {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    background: transparent;
    border: 2px solid $grey;
    border-radius: 50%;
    transition: 0.3s ease-in-out 0s;
    flex-shrink: 0;
    
    &.checked {
      border-color: $mainColor;
    }
    
    .fill {
      position: relative;
      width: 10px;
      height: 10px;
      left: 3px;
      top: 3px;
      background: $mainColor;
      border-radius: 50%;
      
      &.fill-transition {
        transform: scale(1);
        opacity: 1;
        transition: 0.2s ease-in 0s;
      }
      
      &.fill-enter, &.fill-leave {
        transform: scale(0);
        opacity: 0;
      }
    }
  }
  
  span {
    @include text;
    
    display: inline-block;
    margin: 0 6px;
  }
}
</style>