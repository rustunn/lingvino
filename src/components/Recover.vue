<template>
  <div class="page">
    <header-el :title="say('password-recovery')">
      <button slot="left" icon="back" type="icon" v-link="{ path: '/signin' }"></button>
    </header-el>
    <div v-if="!recovered" class="card">
      <text-field type="email" placeholder="Email" :value.sync="email" :error="emailError"></text-field>
      <button text-color="light" :raised="true" :colored="true" :disabled="!valid || disabled" @click="recover">{{ say('recover') }}</button>
    </div>
    <div v-else class="card">
      <h3 class="title">{{say('recovery-email-sent')}}</h3>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

import Button from './Common/Button';
import HeaderEl from './Common/Header';
import TextField from './Common/TextField';

import langMixin from '../mixins/lang';

export default {
  mixins: [langMixin],
  data() {
    return {
      email: '',
      emailError: '',
      disabled: false,
      recovered: false,
    };
  },
  computed: {
    valid() {
      let val = false;
      const emptyEmail = this.email.length === 0;
      const emailError = this.emailError.length > 0;
      if (!emptyEmail && !emailError) {
        val = true;
      }
      return val;
    },
  },
  watch: {
    email() {
      if (this.email.length > 5 && !this.validateEmail(this.email)) {
        this.emailError = 'This is not a valid email';
      } else {
        this.emailError = '';
      }
    },
  },
  methods: {
    recover() {
      if (this.valid) {
        this.disabled = true;
        firebase.auth().sendPasswordResetEmail(this.email)
        .then(() => {
          this.recovered = true;
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/user-not-found':
              this.emailError = 'User with such email does not exist';
              break;
            case 'auth/invalid-email':
              this.emailError = 'This is not a valid email';
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
    HeaderEl,
  },
};
</script>