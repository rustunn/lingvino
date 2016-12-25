<template>
  <div class="page">
    <header-el :title="say('get-started')">
      <router-link :to="{ path: '/' }" slot="left">
        <custom-button icon="back" type="icon"></custom-button>
      </router-link>
    </header-el>   
    <info-card v-if="step.component === 'info-card'" :button="say(step.button)" @clicked="clicked">{{ say(step.text) }}</info-card>
    <audio-card v-if="step.component === 'audio-card'" :src="audioSrc" :autoplay="true" @audio-ended="audioEnded">{{ say('listen-carefully') }}</audio-card>
    <rate-card v-if="step.component === 'rate-card'" @rated="rated"></rate-card>
    <sign-up v-if="step.component === 'sign-up'" :levels="levelsInCourse"></sign-up>
  </div>
</template>

<script>
import firebase from 'firebase';

import InfoCard from './Cards/InfoCard';
import AudioCard from './Cards/AudioCard';
import RateCard from './Cards/RateCard';
import SignUp from './Cards/SignUp';

import HeaderEl from './Common/Header';
import CustomButton from './Common/CustomButton';

import langMixin from '../mixins/lang';

export default {
  mixins: [langMixin],
  data() {
    return {
      steps: [
        {
          component: 'info-card',
          text: 'need-your-level',
          button: 'begin',
        },
        {
          component: 'info-card',
          text: 'listen-to-stories',
          button: 'start-listening',
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
          text: 'level-found',
          button: 'next',
        },
        {
          component: 'sign-up',
        },
      ],
      stories: [
        [
          {
            src: 'stories/story_1.mp3',
            used: false,
          },
          {
            src: 'stories/story_2.mp3',
            used: false,
          },
          {
            src: 'stories/story_3.mp3',
            used: false,
          },
        ],
        [
          {
            src: 'stories/story_4.mp3',
            used: false,
          },
          {
            src: 'stories/story_5.mp3',
            used: false,
          },
          {
            src: 'stories/story_6.mp3',
            used: false,
          },
        ],
        [
          {
            src: 'stories/story_7.mp3',
            used: false,
          },
          {
            src: 'stories/story_8.mp3',
            used: false,
          },
          {
            src: 'stories/story_9.mp3',
            used: false,
          },
        ],
      ],
      currentStep: 0,
      level: 1,
      points: 0,
      pointsRange: [18, 32],
      audioSrc: '',
    };
  },
  computed: {
    step() {
      return this.steps[this.currentStep];
    },
    levelsInCourse() {
      let levels = 4;
      if (this.points > this.pointsRange[1]) levels = 3;
      else if (this.points < this.pointsRange[0]) levels = 5;
      return levels;
    },
  },
  watch: {
    step() {
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
        const storage = firebase.storage();
        const pathReference = storage.ref(this.stories[this.level][num].src);
        pathReference.getDownloadURL().then(url => {
          this.audioSrc = url;
        }).catch(error => {
          switch (error.code) {
            case 'storage/object_not_found':
              // File doesn't exist
              break;

            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
            default:
              break;
          }
        });
      }
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
  route: {
    activate(transition) {
      if (this.isSignedIn) {
        transition.redirect('/');
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
    CustomButton,
  },
};
</script>
