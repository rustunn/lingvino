<template>
  <div class="ranking-card">
    <radio label="Didn't get that at all" selected="false" value="1"></radio>
  </div>
</template>

<script>
import Radio from '../Common/Radio';

export default {
  components: {
    Radio,
  },
};
</script>

<style lang="scss" scoped>
@import '../../mixins/buttons';
@import '../../mixins/card';

.ranking-card {
  @include card;
  align-items: center;
}
</style>