import {
  NEXT_STEP,
  LEVEL_UP,
  LEVEL_DOWN,
  STORY_USED,
} from './mutation-types';

export function nextStep({ dispatch }) {
  dispatch(NEXT_STEP);
}

export function levelUp({ dispatch }) {
  dispatch(LEVEL_UP);
}

export function levelDown({ dispatch }) {
  dispatch(LEVEL_DOWN);
}

export function storyUsed({ dispatch }, level, story) {
  dispatch(STORY_USED, level, story);
}
