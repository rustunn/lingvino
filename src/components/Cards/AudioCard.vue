<template>
  <div class="audio-card">
    <h3 class="text">{{text}}</h3>
    <div class="player">
      <span class="start-time"></span>
      <span class="end-time"></span>
      <div class="progress-bar"></div>
      <audio></audio>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    src: String,
  },
  data() {
    return {
      audio: undefined,
    };
  },
  created() {
    this.audio = document.querySelector('.audio-card audio');
  },
  computed: {
    endTime() {
      return this.audio.duration;
    },
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
@import '../../mixins/buttons';
@import '../../mixins/card';

.audio-card {
  @include card;
  align-items: center;

  h3 {
    font-size: 20px;
    font-weight: 400;
    padding: 34px;
    color: #607D8B;
  }
  
  
}
</style>