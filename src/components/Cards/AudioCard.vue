<template>
  <div class="card audio-card">
    <h3 class="text">
      <slot></slot>
    </h3>
    <div class="player">
      <div class="timing">
        <span class="start-time">{{ currentTime | toTime }}</span>
        <div v-if="buffering" class="buffer">
          <spinner :size="16" :colored="false"></spinner>
          <span class="buffering">Buffering...</span>
        </div>
        <span class="end-time">{{ duration | toTime }}</span>
      </div>
      <div class="progress-bar">
        <div class="bar" :style="bufferWidth"></div>
        <div class="bar" :style="barWidth"></div>
        <input v-if="controls" type="range" class="slider" min="0" :max="duration" v-model="currentTime" @touchStart="sliderTouched" @touchEnd="sliderReleased">
      </div>
      <button v-if="controls" type="icon" :icon="buttonIcon" @click="buttonClicked"></button>
      <audio :src="src"></audio>
    </div>
  </div>
</template>

<script>
import Button from '../Common/Button';
import Spinner from '../Common/Spinner';

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      audio: undefined,
      playing: false,
      buffering: false,
      duration: 0,
      currentTime: 0,
      buffered: 0,
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
        if (this.currentTime === this.duration) icon = 'replay';
        else icon = 'play';
      }
      return icon;
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

      this.audio.onended = () => {
        this.pause();
        this.$emit('audio-ended');
      };

      this.audio.onprogress = () => {
        this.play();
      };

      this.audio.onwaiting = () => {
        this.buffering = true;
      };

      this.audio.onplaying = () => {
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

.audio-card {
  h3 {
    font-size: 20px;
    font-weight: 400;
    padding: 34px;
    color: $grey;
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
        text-align: center;
        font-size: 16px;
        
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
  }
}
</style>