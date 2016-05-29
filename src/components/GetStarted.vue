<template>
  <div id="get-strated">
    <audio-card text="Lesson Title" src="/static/audio/story1_1.mp3" v-on:audio-ended="audioEnded"></audio-card>
  </div>
</template>

<script>
import InfoCard from './Cards/InfoCard';
import AudioCard from './Cards/AudioCard';

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