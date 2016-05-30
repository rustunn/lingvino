<template>
  <div class="ranking-card">
    <div class="options-container">
      <radio v-for="option in options" :checked="option === checkedOption" :value="option.value" v-on:checked="optionChecked">{{option.label}}</radio>
    </div>
    <button :raised="true" :colored="true" text-color="light" @click="buttonClicked">Rate</button>
  </div>
</template>

<script>
import Radio from '../Common/Radio';
import Button from '../Common/Button';

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
    buttonClicked() {
      this.$emit('clicked', value);
    },
  },
  components: {
    Radio,
    Button,
  },
};
</script>

<style lang="scss" scoped>
@import '../../mixins/buttons';
@import '../../mixins/card';

.ranking-card {
  @include card;
  align-items: center;
  
  .options-container {
    margin: 6px 0;
  }
}
</style>