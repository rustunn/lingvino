<template>
  <div class="audio-card">
    <h3 class="text">{{text}}</h3>
    <div class="player">
      <div class="timing">
        <span class="start-time">{{ currentTime | toTime }}</span>
        <span class="end-time">{{ duration | toTime }}</span>
      </div>
      <div class="progress-bar">
        <div class="bar" :style="barWidth"></div>
      </div>
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
  },
  methods: {
    addAudioEvents() {
      this.audio.onloadedmetadata = () => {
        this.duration = this.audio.duration;
        this.audio.play();
      };

      this.audio.ontimeupdate = () => {
        this.currentTime = this.audio.currentTime;
      };

      this.audio.onended = () => {
        this.$emit('audio-ended');
      };
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
    
    .progress-bar {
      width: 100%;
      height: 5px;
      font-size: 0;
      background-color: transparentize($mainColor, 0.8);
      
      .bar {
        position: relative;
        display: inline-block;
        height: 100%;
        background: $mainColor;
      }
    }
  }
}
</style>