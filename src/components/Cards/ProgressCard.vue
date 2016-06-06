<template>
  <div class="card">
    <span v-if="progress < 100">Lesson Progress: {{progress}}%</span>
    <span v-else>Lesson Complete!</span>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../mixins/typography';
.card {
  min-height: 24px;

  span {
    @include text;
  }
}
</style>