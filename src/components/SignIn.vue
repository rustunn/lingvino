<template>
  <div class="card">
    <input v-model="email" type="text" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <button class="button" @click="signin">Sign In</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../mixins/card';
@import '../mixins/input';
@import '../mixins/buttons';

.card {
  @include card;
  align-items: center;
  
  input[type="text"], input[type="password"] {
    @include textfeild;
  }
  
  .button {
    @include colored-button-white;
    @include colored-button-white;
    @include raised;
    // width: 100px;
  }
}
</style>