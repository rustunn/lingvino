<template>
  <div class="audio-card">
    <h3 class="text">{{text}}</h3>
    <div class="player">
      <div class="timing">
        <span class="start-time">{{ currentTime | toTime }}</span>
        <div v-if="buffering" class="buffer">
          <svg class="spinner" width="16px" height="16px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
          </svg>
          <span class="buffering">Buffering...</span>
        </div>
        <span class="end-time">{{ duration | toTime }}</span>
      </div>
      <div class="progress-bar">
        <div class="bar" :style="bufferWidth"></div>
        <div class="bar" :style="barWidth"></div>
        <input v-if="controls" type="range" class="slider" min="0" :max="duration" v-model="currentTime" @touchStart="sliderTouched" @touchEnd="sliderReleased">
      </div>
      <div v-if="controls" class="button" :class="{ 'replay': (!playing && currentTime === duration), 'play': (!playing && currentTime !== duration), 'pause': playing }" @click="buttonClicked"></div>
      <audio :src="src"></audio>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    src: String,
    controls: Boolean,
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
};
</script>

<style lang="scss" scoped>
@import '../../mixins/buttons';
@import '../../mixins/card';
@import '../../mixins/colors';
@import '../../mixins/input';

.audio-card {
  @include card;
  align-items: center;

  h3 {
    font-size: 20px;
    font-weight: 400;
    padding: 34px;
    color: #607D8B;
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
      color: #607D8B;
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
    
    .button {
      position: relative;
      width: 48px;
      height: 48px;
      cursor: pointer;
      background-size: 24px 24px;
      background-position: 12px 12px;
      background-repeat: no-repeat;
      
      &.play {
        background-image: url('/static/icons/ic_play_arrow_black_24px.svg');
      }
      
      &.pause {
        background-image: url('/static/icons/ic_pause_black_24px.svg');
      }
      
      &.replay {
        background-image: url('/static/icons/ic_replay_black_24px.svg');
      }
    }
  }
}

$offset: 187;
$duration: 1.4s;

.spinner {
  margin-right: 6px;
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  stroke: #607D8B;
  animation:
    dash $duration ease-in-out infinite;
}

@keyframes colors {
	0% { stroke: #4285F4; }
	25% { stroke: #DE3E35; }
	50% { stroke: #F7C223; }
	75% { stroke: #1B9A59; }
  100% { stroke: #4285F4; }
}

@keyframes dash {
 0% { stroke-dashoffset: $offset; }
 50% {
   stroke-dashoffset: $offset/4;
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: $offset;
   transform:rotate(450deg);
 }
}
</style>