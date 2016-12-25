<template>
  <div class="card info-card">
    <h3>
      <slot></slot>
    </h3>
    <custom-button text-color="light" :raised="true" :colored="true" @click.native="clicked">{{button}}</custom-button>
  </div>
</template>

<script>
import CustomButton from '../Common/CustomButton';

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
    CustomButton,
  },
};
</script>

<style lang="scss" scoped>
@import '../../mixins/colors';
@import '../../mixins/typography';

.info-card {
  h3 {
    @include title;
    
    padding: 34px;
  }
}
</style>