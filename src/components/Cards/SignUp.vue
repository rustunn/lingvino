<template>
  <div class="card">
    <text-field type="email" placeholder="Email" :value.sync="email" :error="emailError"></text-field>
    <text-field type="password" placeholder="Password" :value.sync="password" :error="passwordError"></text-field>
    <button text-color="light" :raised="true" :colored="true" :disabled="disabled || !valid" @click="signup">Sign Up</button>
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
      emailError: '',
      passwordError: '',
      disabled: false,
    };
  },
  computed: {
    valid() {
      let val = false;
      const emptyEmail = !this.email || this.email.length === 0;
      const emptyPassword = !this.password || this.password.length === 0;
      const emailError = this.emailError.length > 0;
      const passwordError = this.passwordError.length > 0;
      if (!emptyEmail && !emptyPassword && !emailError && !passwordError) {
        val = true;
      }
      return val;
    },
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
  watch: {
    email() {
      if (this.email.length > 5 && !this.validateEmail(this.email)) {
        this.emailError = 'This is not a valid email';
      } else {
        this.emailError = '';
      }
    },
    password() {
      if (this.password.length < 6) {
        this.passwordError = 'Password should be at least 6 characters long';
      } else {
        this.passwordError = '';
      }
    },
  },
  methods: {
    signup() {
      if (this.valid) {
        this.disabled = true;
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          firebase.database().ref(`users/${user.uid}`).set({
            levels: this.levels,
            currentLesson: [0, 0],
            progress: this.progress,
          });
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              this.emailError = 'User with such email already exist';
              break;
            case 'auth/invalid-email':
              this.emailError = 'This is not a valid email';
              break;
            case 'auth/weak-password':
              this.passwordError = 'This password is too weak. Pick stronger one';
              break;
            default:
              this.emailError = 'Unknown error. Try again';
              break;
          }
          this.disabled = false;
        });
      }
    },
    validateEmail(email) {
      /* eslint-disable max-len */
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
  components: {
    Button,
    TextField,
  },
};
</script>