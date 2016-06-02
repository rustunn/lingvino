<template>
  <header-el title="Get Started">
    <button slot="left" icon="back" type="icon" v-link="{ path: '/' }"></button>
  </header-el>
  <div id="get-strated">    
    <info-card v-if="step.component === 'info-card'" :button="step.button" v-on:clicked="clicked" transition="step">{{step.text}}</info-card>
    <audio-card v-if="step.component === 'audio-card'" :src="audioSrc" v-on:audio-ended="audioEnded" transition="step">Listen carefully!</audio-card>
    <rate-card v-if="step.component === 'rate-card'" v-on:rated="rated" transition="step"></rate-card>
    <sign-up v-if="step.component === 'sign-up'" :levels="levelsInCourse" transition="step"></sign-up>
  </div>
</template>

<script>
import InfoCard from './Cards/InfoCard';
import AudioCard from './Cards/AudioCard';
import RateCard from './Cards/RateCard';
import SignUp from './Cards/SignUp';

import HeaderEl from './Common/Header';
import Button from './Common/Button';

import {
  isSignedIn,
} from '../vuex/getters';

export default {
  data() {
    return {
      steps: [
        {
          component: 'info-card',
          text: "Before we begin, let's find out your level of english",
          button: 'Begin',
        },
        {
          component: 'info-card',
          text: 'Listen to the short story and rank how well you understood it',
          button: 'Start Listening',
        },
        {
          component: 'audio-card',
        },
        {
          component: 'rate-card',
        },
        {
          component: 'audio-card',
        },
        {
          component: 'rate-card',
        },
        {
          component: 'audio-card',
        },
        {
          component: 'rate-card',
        },
        {
          component: 'info-card',
          text: 'Congrats! We successfully identified your level of English!',
          button: 'Next',
        },
        {
          component: 'sign-up',
        },
      ],
      stories: [
        [
          {
            src: '/static/audio/story1_1.mp3',
            used: false,
          },
          {
            src: '/static/audio/story1_2.mp3',
            used: false,
          },
        ],
        [
          {
            src: '/static/audio/story2_1.mp3',
            used: false,
          },
          {
            src: '/static/audio/story2_2.mp3',
            used: false,
          },
          {
            src: '/static/audio/story2_3.mp3',
            used: false,
          },
        ],
        [
          {
            src: '/static/audio/story3_1.mp3',
            used: false,
          },
          {
            src: '/static/audio/story3_2.mp3',
            used: false,
          },
        ],
      ],
      currentStep: 0,
      level: 1,
      points: 0,
      pointsRange: [18, 32],
    };
  },
  computed: {
    step() {
      return this.steps[this.currentStep];
    },
    audioSrc() {
      let src = '';
      if (this.step.component === 'audio-card') {
        let found = false;
        let num;
        while (found !== true) {
          num = Math.floor(Math.random() * this.stories[this.level].length);
          if (this.stories[this.level][num].used === false) {
            this.storyUsed(this.level, num);
            found = true;
          }
        }
        src = this.stories[this.level][num].src;
      }
      return src;
    },
    levelsInCourse() {
      let levels = 4;
      if (this.points > this.pointsRange[1]) levels = 3;
      else if (this.points < this.pointsRange[0]) levels = 5;
      return levels;
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
      this.addPoints(value * (this.level + 1));
      if (value < 3) this.levelDown();
      else if (value > 3) this.levelUp();
      this.countinue();
    },
    countinue() {
      this.nextStep();
    },
    nextStep() {
      this.currentStep++;
    },
    levelUp() {
      if (this.level < 2) this.level++;
    },
    levelDown() {
      if (this.level > 0) this.level--;
    },
    storyUsed(level, story) {
      this.stories[level][story].used = true;
    },
    addPoints(points) {
      this.points += points;
    },
  },
  vuex: {
    getters: {
      isSignedIn,
    },
  },
  route: {
    activate(transition) {
      if (this.isSignedIn) {
        transition.redirect('/learn');
      } else {
        transition.next();
      }
    },
  },
  components: {
    InfoCard,
    AudioCard,
    RateCard,
    SignUp,
    HeaderEl,
    Button,
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