<template>
  <div class="page">
    <header-el :title="say('my-lessons')">
      <custom-button slot="left" icon="menu" type="icon" @click.native="showDrawer"></custom-button>
    </header-el>
    
    <progress-card :progress="progress"></progress-card>
    
    <audio-card v-if="currentLesson" :src="audioSrc" :controls="true" :autoplay="autoplay" :loop="repeat" @next="nextLesson" @previous="prevLesson" @audio-ended="audioEnded">
      {{ say(currentLesson.title) }}
    </audio-card>
    
    <div class="dim" v-if="drawer" transition="dim" @touchstart="hideDrawer" @mousedown="hideDrawer"></div>
    
    <drawer v-if="drawer" :opened="drawer" @toggle="toggleDrawer">
      <div v-for="(section, sectionIdx) in lessons" class="section">
        <ul>
          <li v-for="(lesson, lessonIdx) in section" :class="{ 'selected': lesson === currentLesson }" @click="lessonSelected(sectionIdx, lessonIdx)">
            <span>{{ say(lesson.title) }}</span>
            <span v-if="getProgress(sectionIdx, lessonIdx) > 0 && getProgress(sectionIdx, lessonIdx) < 100" class="progress-badge">{{getProgress(sectionIdx, lessonIdx)}}%</span>
            <div v-if="getProgress(sectionIdx, lessonIdx) >= 100" class="progress-completed"></div>
          </li>
        </ul>
      </div>
    
      <div class="section">
        <ul>
          <li>
            <span @click="signOut">{{ say('sign-out') }}</span>
          </li>
          <!-- <li>
            <span>{{ say('change-password') }}</span>
          </li>
          <li>
            <span>{{ say ('change-email') }}</span>
          </li>
          <li>
            <span>{{ say('feedback') }}</span>
          </li> -->
        </ul>
      </div>
    </drawer>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapState } from 'vuex';

import HeaderEl from './Common/Header';
import CustomButton from './Common/CustomButton';
import Drawer from './Common/Drawer';
import AudioCard from './Cards/AudioCard';
import ProgressCard from './Cards/ProgressCard';

import lessonsSets from '../data/lessons';

import langMixin from '../mixins/lang';

export default {
  mixins: [langMixin],
  data() {
    return {
      lessonsSets,
      drawer: false,
      autoplay: false,
      audioSrc: '',
    };
  },
  created() {
    this.updateAudioSrc();
  },
  computed: {
    lessons() {
      let data = null;
      if (this.userData && this.userData.levels) data = this.lessonsSets[5 - this.userData.levels];
      return data;
    },
    currentLesson() {
      let data = null;
      if (this.lessons && this.userData && this.userData.currentLesson) {
        data = this.lessons[this.userData.currentLesson[0]][this.userData.currentLesson[1]];
      }
      return data;
    },
    progress() {
      let final = 0;
      if (this.userData) {
        const section = this.userData.currentLesson[0];
        const lesson = this.userData.currentLesson[1];
        const num = this.userData.progress[section][lesson] / this.lessons[section][lesson].reps;
        final = Math.floor(num * 100);
        if (final > 100) final = 100;
      }
      return final;
    },
    repeat() {
      const section = this.userData.currentLesson[0];
      const lesson = this.userData.currentLesson[1];
      return this.userData.progress[section][lesson] + 1 < this.lessons[section][lesson].reps;
    },
    ...mapState(['user', 'userData']),
  },
  watch: {
    currentLesson() {
      this.updateAudioSrc();
    },
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
    },
    showDrawer() {
      if (!this.drawer) this.toggleDrawer();
    },
    hideDrawer() {
      if (this.drawer) this.toggleDrawer();
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    lessonSelected(section, lesson) {
      this.drawer = false;
      this.autoplay = true;
      firebase.database().ref(`users/${this.user.uid}`).update({
        currentLesson: [section, lesson],
      });
    },
    nextLesson() {
      const lessonsInModule = this.lessons[this.userData.currentLesson[0]].length;
      if (this.userData.currentLesson[1] < lessonsInModule - 1) {
        this.lessonSelected(this.userData.currentLesson[0], this.userData.currentLesson[1] + 1);
      } else if (this.userData.currentLesson[0] < this.lessons.length - 1) {
        this.lessonSelected(this.userData.currentLesson[0] + 1, 0);
      }
    },
    prevLesson() {
      if (this.userData.currentLesson[1] > 0) {
        this.lessonSelected(this.userData.currentLesson[0], this.userData.currentLesson[1] - 1);
      } else if (this.userData.currentLesson[0] > 0) {
        const lessonsInPrevModule = this.lessons[this.userData.currentLesson[0] - 1].length;
        this.lessonSelected(this.userData.currentLesson[0] - 1, lessonsInPrevModule - 1);
      }
    },
    audioEnded() {
      const section = this.userData.currentLesson[0];
      const lesson = this.userData.currentLesson[1];
      this.userData.progress[section][lesson]++;
      firebase.database().ref(`users/${this.user.uid}`).update({
        progress: this.userData.progress,
      });
      if (!this.repeat) {
        this.nextLesson();
      }
    },
    getProgress(section, lesson) {
      const num = this.userData.progress[section][lesson] / this.lessons[section][lesson].reps;
      let final = Math.floor(num * 100);
      if (final > 100) final = 100;
      return final;
    },
    updateAudioSrc() {
      if (this.currentLesson) {
        const storage = firebase.storage();
        let src = this.currentLesson.src;
        if (this.currentLesson.translate) {
          src += `_${this.lang}`;
        }
        src += '.mp3';
        const pathReference = storage.ref(src);
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
  components: {
    HeaderEl,
    CustomButton,
    Drawer,
    AudioCard,
    ProgressCard,
  },
};
</script>

<style lang="scss" scoped>
.page {
  .dim {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    will-change: opacity;

    &.dim-transition {
      transition: opacity 0.3s ease-in-out 0s;
      opacity: 1;
    }
    
    &.dim-enter, &.dim-leave {
      opacity: 0;
    }
  }
  
  .section {
    position: relative;
    width: 100%;
    display: block;
    padding: 24px 0;
    border-top: 1px rgba(0,0,0,0.12) solid;
    
    &:first-child {
      border: 0;
    }
  
    ul {
      position: relative;
      width: 100%;
      list-style-type: none;
      list-style: none;
      display: block;
      box-sizing: border-box;
      
      li {
        position: relative;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        min-height: 48px;
        padding: 8px 16px;
        overflow: hidden;
        cursor: pointer;
        
        &:hover, &.selected {
          background-color: #eee;
        }
        
        &.selected {
          color: black;
        }
        
        span {
          order: 0;
          flex-grow: 2;
          text-decoration: none;
          font-family: "Roboto","Helvetica","Arial",sans-serif;
          font-size: 16px;
          font-weight: 400;
          letter-spacing: .04em;
          line-height: 24px;
          color: rgba(0,0,0,.87);
        }
        
        .progress-badge {
          position: relative;
          width: 40px;
          flex-grow: 0;
          flex-shrink: 0;
          text-align: right;
          font-size: 12px;
        }
        
        .progress-completed {
          position: relative;
          width: 16px;
          height: 16px;
          flex-grow: 0;
          flex-shrink: 0;
          background-image: url('/static/icons/ic_done_black_24px.svg');
          background-size: 16px 16px;
        }
      }
    }
  }
}
</style>