<template>
  <div class="info-card">
    <h3 class="text">{{text}}</h3>
    <button text-color="light" :raised="true" :colored="true" @click="clicked">{{button}}</button>
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
@import '../../mixins/card';
@import '../../mixins/colors';

.info-card {
  @include card;
  align-items: center;

  h3 {
    font-size: 20px;
    font-weight: 400;
    padding: 34px;
    color: $grey;
  }
}
</style>