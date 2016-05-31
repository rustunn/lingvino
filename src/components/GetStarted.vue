<template>
  <div id="get-strated">    
    <info-card v-if="step.component === 'info-card'" :button="step.button" v-on:clicked="clicked" transition="step">{{step.text}}</info-card>
    <audio-card v-if="step.component === 'audio-card'" :src="audioSrc" v-on:audio-ended="audioEnded" transition="step">Listen carefully!</audio-card>
    <rate-card v-if="step.component === 'rate-card'" v-on:rated="rated" transition="step"></rate-card>
  </div>
</template>

<script>
import InfoCard from './Cards/InfoCard';
import AudioCard from './Cards/AudioCard';
import RateCard from './Cards/RateCard';

import {
  steps,
  currentStep,
  level,
  stories,
} from '../vuex/modules/GetStarted/getters';

import {
  nextStep,
  levelDown,
  levelUp,
  storyUsed,
} from '../vuex/modules/GetStarted/actions';

export default {
  data() {
    return {
    };
  },
  computed: {
    requestedStep() {
      return parseInt(this.$route.params.step, 10) - 1;
    },
    step() {
      return this.steps[this.requestedStep];
    },
    audioSrc() {
      let found = false;
      let num;
      while (found !== true) {
        num = Math.floor(Math.random() * this.stories[this.level].length);
        if (this.stories[this.level][num].used === false) {
          this.storyUsed(this.level, num);
          found = true;
        }
      }
      return this.stories[this.level][num].src;
    },
  },
  methods: {
    clicked() {
      this.countinue();
    },
    audioEnded() {
      this.countinue();
    },
    rated(value) {
      if (value < 3) this.levelDown();
      else if (value > 3) this.levelUp();
      this.countinue();
    },
    countinue() {
      this.nextStep();
      this.$route.router.go({ name: 'get-started', params: { step: this.currentStep + 1 } });
    },
  },
  route: {
    activate(transition) {
      if (this.requestedStep !== this.currentStep) {
        transition.redirect({ name: 'get-started', params: { step: this.currentStep + 1 } });
      } else {
        transition.next();
      }
    },
  },
  vuex: {
    getters: {
      steps,
      currentStep,
      level,
      stories,
    },
    actions: {
      nextStep,
      levelDown,
      levelUp,
      storyUsed,
    },
  },
  components: {
    InfoCard,
    AudioCard,
    RateCard,
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