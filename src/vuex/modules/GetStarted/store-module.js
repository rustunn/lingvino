import {
  NEXT_STEP,
  LEVEL_UP,
  LEVEL_DOWN,
  STORY_USED,
} from './mutation-types';

const state = {
  steps: [
    {
      component: 'info-card',
      text: "Before we begin, let's find out your level of english",
      button: 'Begin',
      completed: false,
    },
    {
      component: 'info-card',
      text: 'Listen to the short story and rank how well you understood it',
      button: 'Start Listening',
      completed: false,
    },
    {
      component: 'audio-card',
      completed: false,
    },
    {
      component: 'rate-card',
      completed: false,
    },
    {
      component: 'audio-card',
      completed: false,
    },
    {
      component: 'rate-card',
      completed: false,
    },
    {
      component: 'audio-card',
      completed: false,
    },
    {
      component: 'rate-card',
      completed: false,
    },
    {
      component: 'info-card',
      text: 'Congrats! We successfully identified your level of English!',
      button: 'Next',
      completed: false,
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
  pointsRange: {
    '0to1': 18,
    '1to2': 32,
  },
};

const mutations = {
  [NEXT_STEP]() {
    state.steps[state.currentStep].completed = true;
    state.currentStep++;
  },
  [LEVEL_DOWN]() {
    if (state.level > 0) state.level--;
  },
  [LEVEL_UP]() {
    if (state.level < 2) state.level++;
  },
  [STORY_USED](st, level, story) {
    state.stories[level][story].used = true;
  },
};

export default {
  state,
  mutations,
};
