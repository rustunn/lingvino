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
      text: "Before we begin, let's find out your level of english",
      button: 'Begin',
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