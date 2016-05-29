<template>
  <div class="audio-card">
    <h3 class="text">{{text}}</h3>
    <div class="player">
      <div class="timing">
        <span class="start-time">{{ currentTime | toTime }}</span>
        <span class="end-time">{{ duration | toTime }}</span>
      </div>
      <div class="progress-bar">
        <div class="bar" :style="bufferWidth"></div>
        <div class="bar" :style="barWidth"></div>
      </div>
      <!-- <input type="range" class="slider" min="0" :max="duration" v-model="currentTime" @touchStart="sliderTouched" @touchEnd="sliderReleased"> -->
      <audio :src="src"></audio>
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
    this.audio.pause();
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
        this.currentTime = this.audio.currentTime;
        this.buffered = this.audio.buffered.end(0);
      };

      this.audio.onended = () => {
        this.$emit('audio-ended');
      };

      this.audio.onprogress = () => {
        this.audio.play();
      };
    },
    sliderTouched() {
      console.log(1);
      this.audio.pause();
      this.audio.currentTime = this.currentTime;
    },
    sliderReleased() {
      console.log(2);
      this.audio.currentTime = this.currentTime;
      this.audio.play();
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
    width: 100%;
    
    .timing {
      width: 100%;
      height: 20px;
      line-heihgt: 20px;
      font-size: 0;
      color: #607D8B;
      
      span {
        display: inline-block;
        width: 50%;
        text-align: left;
        font-size: 16px;
        
        &:last-child {
          text-align: right;
        }
      }
    }
    
    .slider {
      @include range;
      width: 100%;
      height: 2px;
    }
    
    .progress-bar {
      position: relative;
      width: 100%;
      height: 2px;
      font-size: 0;
      
      .bar {
        position: absolute;
        left:0;
        top: 0;
        height: 100%;
        background: $mainColor;
        
        &:first-child {
          background-color: transparentize($mainColor, 0.8);
        }
      }
    }
  }
}
</style>