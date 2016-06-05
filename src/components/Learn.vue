<template>
  <div class="page">
    <header-el title="My Lessons">
      <button slot="left" icon="menu" type="icon" @click="toggleDrawer"></button>
    </header-el>
    
    <audio-card v-if="currentLesson" :src="currentLesson.src" :controls="true" :autoplay="autoplay" @next="nextLesson" @previous="prevLesson">
      {{currentLesson.title}}
    </audio-card>
    
    <div class="dim" v-if="drawer" transition="dim" @click="toggleDrawer"></div>
    
    <drawer v-if="drawer" :list="" :first="" :opened.sync="drawer">
      <div v-for="section in lessons" class="section">
        <ul>
          <li v-for="lesson in section" :class="{ 'selected': lesson === currentLesson }" @click="lessonSelected($parent.$index, $index)">
            <span>{{lesson.title}}</span>
          </li>
        </ul>
      </div>
    
      <div class="section">
        <ul>
          <li>
            <span @click="signOut">Sign Out</span>
          </li>
          <li>
            <span>Change Password</span>
          </li>
          <li>
            <span>Change Email</span>
          </li>
          <li>
            <span>Feedback</span>
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

import lessonsSets from '../data/lessons';

export default {
  props: ['user', 'userData'],
  data() {
    return {
      lessonsSets,
      drawer: false,
      autoplay: false,
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
  },
  components: {
    HeaderEl,
    Button,
    Drawer,
    AudioCard,
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
      }
    }
  }
}
</style>