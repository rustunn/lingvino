<template>
  <div class="card audio-card">
    <h3 class="title">
      <slot></slot>
    </h3>
    <div class="player">
      <div class="timing">
        <span class="start-time text">{{ currentTime | toTime }}</span>
        <div v-if="buffering" class="buffer">
          <spinner :size="16" :colored="false"></spinner>
          <span class="buffering text">{{ say('buffering') }}</span>
        </div>
        <span v-if="duration !== 999999" class="end-time text">{{ duration | toTime }}</span>
      </div>
      <div class="progress-bar">
        <div class="bar" :style="bufferWidth"></div>
        <div class="bar" :style="barWidth"></div>
        <input v-if="controls" type="range" class="slider" min="0" :max="duration" v-model="currentTime" @touchStart="sliderTouched" @mouseDown="sliderTouched" @touchEnd="sliderReleased" @mouseUp="sliderReleased">
      </div>
      <div class="controls">
        <button v-if="controls" type="icon" icon="previous" @click="previousClicked"></button>
        <button type="icon" :icon="buttonIcon" @click="buttonClicked"></button>
        <button v-if="controls" type="icon" icon="next" @click="nextClicked"></button>
      </div>
      <audio :src="src">
        <source :src="src" type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>

<script>
import Button from '../Common/Button';
import Spinner from '../Common/Spinner';

import langMixin from '../../mixins/lang';

export default {
  mixins: [langMixin],
  props: {
    src: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      audio: undefined,
      playing: false,
      buffering: false,
      duration: 999999,
      currentTime: 0,
      buffered: 0,
      played: false,
    };
  },
  attached() {
    this.audio = this.$el.querySelector('audio');
    this.addAudioEvents();
  },
  beforeDestroy() {
    this.pause();
    this.audio.src = '';
  },
  computed: {
    barWidth() {
      return {
        width: `${this.currentTime / this.duration * 100}%`,
      };
    },
    bufferWidth() {
      return {
        width: `${this.buffered / this.duration * 100}%`,
      };
    },
    buttonIcon() {
      let icon;
      if (this.playing) {
        icon = 'pause';
      } else {
        if (this.played) icon = 'replay';
        else icon = 'play';
      }
      return icon;
    },
  },
  watch: {
    src() {
      this.playing = false;
      this.buffered = 0;
      this.currentTime = 0;
      this.played = false;
    },
  },
  methods: {
    addAudioEvents() {
      this.audio.ondurationchange = () => {
        this.duration = this.audio.duration;
      };

      this.audio.ontimeupdate = () => {
        if (this.playing) { // allows click on slider
          this.currentTime = this.audio.currentTime;
          this.buffered = this.audio.buffered.end(0);
        }
      };

      // does not triggered if loop = true
      this.audio.onended = () => {
        this.pause();
        this.$emit('audio-ended');
        if (this.loop) this.play();
        else this.played = true;
      };

      this.audio.onwaiting = () => {
        this.buffering = true;
      };

      this.audio.onplaying = () => {
        this.playing = true;
        if (this.buffering) this.buffering = false;
      };
    },
    sliderTouched() {
      this.pause();
    },
    sliderReleased() {
      this.audio.currentTime = this.currentTime;
      this.play();
    },
    play() {
      this.playing = true;
      if (this.played) this.played = true;
      this.audio.play();
    },
    pause() {
      this.playing = false;
      this.audio.pause();
    },
    buttonClicked() {
      if (this.playing) this.pause();
      else this.play();
    },
    nextClicked() {
      this.$emit('next');
    },
    previousClicked() {
      this.$emit('previous');
    },
  },
  filters: {
    toTime(value) {
      const seconds = Math.floor(value);
      let text;
      if (seconds < 10) {
        text = `00:0${seconds}`;
      } else if (seconds > 9 && seconds < 60) {
        text = `00:${seconds}`;
      } else if (seconds > 59 && seconds < 600) {
        text = `0${Math.floor(seconds / 60)}:`;
        if (seconds - Math.floor(seconds / 60) * 60 < 10) {
          text += `0${(seconds - Math.floor(seconds / 60) * 60)}`;
        } else if (seconds - Math.floor(seconds / 60) * 60 > 9) {
          text += (seconds - Math.floor(seconds / 60) * 60);
        }
      } else if (seconds > 599) {
        text = `${Math.floor(seconds / 60)}:`;
        if (seconds - Math.floor(seconds / 60) * 60 < 10) {
          text += `0${(seconds - Math.floor(seconds / 60) * 60)}`;
        } else if (seconds - Math.floor(seconds / 60) * 60 > 9) {
          text += (seconds - Math.floor(seconds / 60) * 60);
        }
      }
      return text;
    },
  },
  components: {
    Button,
    Spinner,
  },
};
</script>

<style lang="scss" scoped>
@import '../../mixins/colors';
@import '../../mixins/input';
@import '../../mixins/typography';

.audio-card {
  h3 {
    @include title;
    margin-bottom: 10px;
  }
  
  .player {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    
    .timing {
      width: 100%;
      height: 20px;
      line-heihgt: 20px;
      font-size: 0;
      color: $grey;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 4px;
      
      .buffer {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      
      span {
        @include text;
        
        text-align: center;
        
        &:first-child {
          text-align: left;
        }
        
        &:last-child {
          text-align: right;
        }
      }
    }
    
    .progress-bar {
      position: relative;
      width: 100%;
      height: 12px;
      font-size: 0;
      margin: 16px 0;
      
      .bar {
        position: absolute;
        left:0;
        top: 5px;
        height: 2px;
        background: $mainColor;
        
        &:first-child {
          background-color: transparentize($mainColor, 0.8);
        }
      }
      
      .slider {
        position: absolute;
        left: 0;
        top: 0;
        background: transparent;
      }
    }
    
    .controls {
      position: relative;
      display: flex;
      fles-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>