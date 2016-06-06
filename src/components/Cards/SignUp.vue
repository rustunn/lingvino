<template>
  <div class="card">
    <text-field type="email" placeholder="Email" :value.sync="email"></text-field>
    <text-field type="password" placeholder="Password" :value.sync="password"></text-field>
    <button text-color="light" :raised="true" :colored="true" @click="signup">Sign Up</button>
  </div>
</template>

<script>
import firebase from 'firebase';

import lessonsSets from '../../data/lessons';

import Button from '../Common/Button';
import TextField from '../Common/TextField';

export default {
  props: {
    levels: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 3 && value <= 5;
      },
    },
  },
  data() {
    return {
      email: null,
      password: null,
      lessonsSets,
      progress: null,
    };
  },
  created() {
    const lessons = this.lessonsSets[5 - this.levels];
    const data = [];
    lessons.forEach(section => {
      const sectionData = [];
      section.forEach(() => {
        sectionData.push(0);
      });
      data.push(sectionData);
    });
    this.progress = data;
  },
  methods: {
    signup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        firebase.database().ref(`users/${user.uid}`).set({
          levels: this.levels,
          currentLesson: [0, 0],
          progress: this.progress,
        });
      });
    },
  },
  components: {
    Button,
    TextField,
  },
};
</script>