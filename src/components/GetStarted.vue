<template>
  <div id="get-strated">
    <ranking-card></ranking-card>
  </div>
</template>

<script>
import InfoCard from './Cards/InfoCard';
import AudioCard from './Cards/AudioCard';
import RankingCard from './Cards/RankingCard';

export default {
  data() {
    return {
    };
  },
  computed: {
    step() {
      return `step${this.$route.params.step}`;
    },
  },
  methods: {
    audioEnded() {
      console.log('ended');
    },
  },
  components: {
    InfoCard,
    AudioCard,
    RankingCard,
  },
};
</script>

<style lang="scss" scoped>
.step-transition {
  position: absolute;
  transition: 0.3s ease-in-out 0s;
  transform: translateX(0vw);
}
.step-leave {
  transform: translateX(-100vw);
}
.step-enter {
  transform: translateX(100vw);
}
</style>