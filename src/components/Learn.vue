<template>
  <div class="page">
    <header-el :title="say('my-lessons')">
      <button slot="left" icon="menu" type="icon" @click="toggleDrawer"></button>
    </header-el>
    
    <progress-card :progress="progress"></progress-card>
    
    <audio-card v-if="currentLesson" :src="audioSrc" :controls="true" :autoplay="autoplay" :loop="repeat" @next="nextLesson" @previous="prevLesson" @audio-ended="audioEnded">
      {{currentLesson.title}}
    </audio-card>
    
    <div class="dim" v-if="drawer" transition="dim" @click="toggleDrawer"></div>
    
    <drawer v-if="drawer" :list="" :first="" :opened.sync="drawer">
      <div v-for="section in lessons" class="section">
        <ul>
          <li v-for="lesson in section" :class="{ 'selected': lesson === currentLesson }" @click="lessonSelected($parent.$index, $index)">
            <span>{{lesson.title}}</span>
            <span v-if="getProgress($parent.$index, $index) > 0 && getProgress($parent.$index, $index) < 100" class="progress-badge">{{getProgress($parent.$index, $index)}}%</span>
            <div v-if="getProgress($parent.$index, $index) >= 100" class="progress-completed"></div>
          </li>
        </ul>
      </div>
    
      <div class="section">
        <ul>
          <li>
            <span @click="signOut">{{ say('sign-out') }}</span>
          </li>
          <li>
            <span>{{ say('change-password') }}</span>
          </li>
          <li>
            <span>{{say ('change-email') }}</span>
          </li>
          <li>
            <span>{{ say('feedback') }}</span>
          </li>
        </ul>
      </div>
    </drawer>
  </div>
</template>

<script>
import firebase from 'firebase';

import HeaderEl from './Common/Header';
import Button from './Common/Button';
import Drawer from './Common/Drawer';
import AudioCard from './Cards/AudioCard';
import ProgressCard from './Cards/ProgressCard';

import lessonsSets from '../data/lessons';

import {
  user,
  userData,
} from '../vuex/getters';

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
  },
  watch: {
    currentLesson() {
      if (this.currentLesson) {
        const storage = firebase.storage();
        const pathReference = storage.ref(this.currentLesson.src);
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
    signOut() {
      firebase.auth().signOut();
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
      if (!this.repeat) {
        this.nextLesson();
      }
      const section = this.userData.currentLesson[0];
      const lesson = this.userData.currentLesson[1];
      this.userData.progress[section][lesson]++;
      firebase.database().ref(`users/${this.user.uid}`).update({
        progress: this.userData.progress,
      });
    },
    getProgress(section, lesson) {
      const num = this.userData.progress[section][lesson] / this.lessons[section][lesson].reps;
      let final = Math.floor(num * 100);
      if (final > 100) final = 100;
      return final;
    },
  },
  vuex: {
    getters: {
      user,
      userData,
    },
  },
  components: {
    HeaderEl,
    Button,
    Drawer,
    AudioCard,
    ProgressCard,
  },
};
</script>

<style lang="scss" scoped>
.page {
  .dim.dim-transition {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);;
    transition: background 0.3s ease-in-out 0s;
    
    &.dim-enter, &.dim-leave {
      background: rgba(0, 0, 0, 0);
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
        padding: 16px;
        overflow: hidden;
        
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
          line-height: 1;
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