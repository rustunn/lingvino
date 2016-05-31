<template>
  <div class="card info-card">
    <h3 class="text">
      <slot></slot>
    </h3>
    <button text-color="light" :raised="true" :colored="true" @click="clicked">{{button}}</button>
  </div>
</template>

<script>
import Button from '../Common/Button';

export default {
  props: {
    button: {
      type: String,
      required: true,
    },
  },
  methods: {
    clicked() {
      this.$emit('clicked');
    },
  },
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
@import '../../mixins/colors';

.info-card {
  h3 {
    font-size: 20px;
    font-weight: 400;
    padding: 34px;
    color: $grey;
  }
}
</style>