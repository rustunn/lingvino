<template>
  <div>
    <info-card :text="text" :button="button" v-on:clicked="clicked"></info-card>
  </div>
</template>

<script>
import InfoCard from '../Cards/InfoCard';

export default {
  data() {
    return {
      text: 'Listen to the short story and rank how well you understood it',
      button: 'Start Listening',
    };
  },
  methods: {
    clicked() {
      this.$emit('clicked');
    },
  },
  components: {
    InfoCard,
  },
};
</script>