<template>
  <div class="card ranking-card">
    <div class="options-container">
      <radio v-for="option in options" :checked="option === checkedOption" :value="option.value" @checked="optionChecked">{{ say(option.label) }}</radio>
    </div>
    <custom-button :raised="true" :colored="true" text-color="light" @click.native="buttonClicked">{{ say('rate') }}</custom-button>
  </div>
</template>

<script>
import Radio from '../Common/Radio';
import CustomButton from '../Common/CustomButton';

import langMixin from '../../mixins/lang';

export default {
  mixins: [langMixin],
  data() {
    return {
      options: [
        {
          label: 'rate5',
          value: 5,
        },
        {
          label: 'rate4',
          value: 4,
        },
        {
          label: 'rate3',
          value: 3,
        },
        {
          label: 'rate2',
          value: 2,
        },
        {
          label: 'rate1',
          value: 1,
        },
      ],
      checkedValue: 3,
    };
  },
  computed: {
    checkedOption() {
      const items = this.options.filter(option => option.value === this.checkedValue);
      return items[0];
    },
  },
  methods: {
    optionChecked(value) {
      this.checkedValue = value;
    },
    buttonClicked() {
      this.$emit('rated', this.checkedValue);
    },
  },
  components: {
    Radio,
    CustomButton,
  },
};
</script>

<style lang="scss" scoped>
.ranking-card {
  .options-container {
    margin: 6px 0;
  }
}
</style>