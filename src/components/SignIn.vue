<template>
  <div class="page">
    <header-el :title="say('sign-in')">
      <router-link :to="{ path: '/' }" slot="left">
        <custom-button icon="back" type="icon"></custom-button>
      </router-link>
    </header-el>
    <div class="card">
      <text-field type="email" placeholder="Email" :value="email" :error="say(emailError)" @value-updated="emailUpdated"></text-field>
      <text-field type="password" :placeholder="say('password')" :value="password" :error="say(passwordError)" @value-updated="passwordUpdated" @keyup.enter="signin"></text-field>
      <custom-button text-color="light" :raised="true" :colored="true" :disabled="!valid || disabled" @click.native="signin">{{ say('sign-in') }}</custom-button>
    </div>
    <div class="card">
      <router-link :to="{ path: '/recover' }">
        <custom-button text-color="dark" :raised="false" :colored="false">{{ say('forgot-password') }}</custom-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

import CustomButton from './Common/CustomButton';
import HeaderEl from './Common/Header';
import TextField from './Common/TextField';

import langMixin from '../mixins/lang';

export default {
  mixins: [langMixin],
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      disabled: false,
    };
  },
  computed: {
    valid() {
      let val = false;
      const emptyEmail = this.email.length === 0;
      const emptyPassword = this.password.length === 0;
      const emailError = this.emailError.length > 0;
      if (!emptyEmail && !emptyPassword && !emailError) {
        val = true;
      }
      return val;
    },
  },
  watch: {
    email() {
      if (this.email.length > 5 && !this.validateEmail(this.email)) {
        this.emailError = 'incorrect-email';
      } else {
        this.emailError = '';
      }
    },
  },
  methods: {
    signin() {
      if (this.valid) {
        this.disabled = true;
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .catch(error => {
          switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/invalid-credential':
              this.emailError = 'user-not-found';
              break;
            case 'auth/invalid-email':
              this.emailError = 'incorrect-email';
              break;
            case 'auth/wrong-password':
              this.passwordError = 'incorrect-password';
              break;
            case 'auth/user-disabled':
              this.emailError = 'check-recovery-email';
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
    HeaderEl,
  },
};
</script>