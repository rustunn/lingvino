<template>
  <div class="info-card">
    <h3 class="text">{{text}}</h3>
    <button @click="clicked" class="button">{{button}}</button>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    button: String,
  },
  methods: {
    clicked() {
      this.$emit('clicked');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../mixins/buttons';
@import '../../mixins/card';

.info-card {
  @include card;
  align-items: center;

  h3 {
    font-size: 20px;
    font-weight: 400;
    padding: 34px;
    color: $grey;
  }
  
  .button {
    @include colored-button-white;
    @include raised;
  }
}
</style>