<template>
  <div class="card">
    <text-field type="email" :placeholder="say('email')" :value="email" :error="say(emailError)" @value-updated="emailUpdated"></text-field>
    <text-field type="password" :placeholder="say('password')" :value="password" :error="say(passwordError)" @value-updated="passwordUpdated" @keyup.enter="signup"></text-field>
    <custom-button text-color="light" :raised="true" :colored="true" :disabled="disabled || !valid" @click.native="signup">{{ say('sign-up') }}</custom-button>
  </div>
</template>

<script>
import firebase from 'firebase';

import lessonsSets from '../../data/lessons';

import CustomButton from '../Common/CustomButton';
import TextField from '../Common/TextField';

import langMixin from '../../mixins/lang';

export default {
  mixins: [langMixin],
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
        this.emailError = 'incorrect-email';
      } else {
        this.emailError = '';
      }
    },
    password() {
      if (this.password.length < 6) {
        this.passwordError = 'short-password';
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
        .then(user => {
          firebase.database().ref(`users/${user.uid}`).set({
            levels: this.levels,
            currentLesson: [0, 0],
            progress: this.progress,
            lang: this.lang,
          });
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              this.emailError = 'email-in-use';
              break;
            case 'auth/invalid-email':
              this.emailError = 'incorrect-password';
              break;
            case 'auth/weak-password':
              this.passwordError = 'weak-password';
              break;
            default:
              this.emailError = 'unknown-error';
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
    emailUpdated(val) {
      this.email = val;
    },
    passwordUpdated(val) {
      this.password = val;
    },
  },
  components: {
    CustomButton,
    TextField,
  },
};
</script>
