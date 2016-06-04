<template>
  <div class="page">
    <header-el title="My Lessons">
      <button slot="left" icon="menu" type="icon" @click="toggleDrawer"></button>
      <button slot="right" @click="signOut" text-color="light" :colored="false" :raised="false">Sign Out</button>
    </header-el>
    <div class="dim" v-if="drawer" transition="dim" @click="toggleDrawer"></div>
    <drawer v-if="drawer" :list="" :first="" :opened.sync="drawer">
      <div class="section">
        <ul>
          <li>
            <span>Sign Out</span>
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

import {
  isSignedIn,
} from '../vuex/getters';

import {
  signedOut,
} from '../vuex/actions';

export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    signOut() {
      firebase.auth().signOut()
      .then(() => {
        this.signedOut();
        this.$route.router.go('/');
      }, (error) => {
        console.log(error);
      });
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
  route: {
    activate(transition) {
      if (this.isSignedIn) {
        transition.next();
      } else {
        transition.redirect('/');
      }
    },
  },
  vuex: {
    getters: {
      isSignedIn,
    },
    actions: {
      signedOut,
    },
  },
  components: {
    HeaderEl,
    Button,
    Drawer,
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
        
        &:hover {
          background-color: #eee;
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