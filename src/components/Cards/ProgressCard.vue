<template>
  <div class="card">
    <span v-if="progress < 100">{{ say('lesson-progress') }}: {{progress}}%</span>
    <span v-else>{{ say('lesson-complete') }}</span>
  </div>
</template>

<script>
import langMixin from '../../mixins/lang';

export default {
  mixins: [langMixin],
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