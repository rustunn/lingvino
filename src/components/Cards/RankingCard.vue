<template>
  <div class="ranking-card">
    <radio v-for="option in options" :label="option.label" :checked="option === checkedOption" :value="option.value" v-on:checked="optionChecked"></radio>
  </div>
</template>

<script>
import Radio from '../Common/Radio';

export default {
  data() {
    return {
      options: [
        {
          label: "Didn't understand anything",
          value: 1,
        },
        {
          label: 'Understood some words',
          value: 2,
        },
        {
          label: 'Understood general idea',
          value: 3,
        },
        {
          label: 'Understood everythihng exept some words',
          value: 4,
        },
        {
          label: 'Understood everythihng',
          value: 5,
        },
      ],
      checkedValue: 3,
    };
  },
  computed: {
    checkedOption() {
      /* eslint-disable */
      const items = this.options.filter((option) => {
        return option.value === this.checkedValue;
      });
      return items[0];
    },
  },
  methods: {
    optionChecked(value) {
      this.checkedValue = value;
    },
  },
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
  align-items: left;
}
</style>