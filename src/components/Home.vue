<template>
  <div id="home">
    <div class="container">
      <header-el></header-el>
      <main>
        <h1>Spoken Engish for Everyone</h1>
        <div class="button">Get started</div>
      </main>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import Header from './Header';
export default {
  components: {
    'header-el': Header,
  },
};
</script>

<style lang="scss">
@import '../mixins/buttons';

* {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
}

html, body {
  height: 100%;
}

#home {
  display: block;
  min-height: 100%;
}

.container {
  position: relative;
  left: 0;
  top: 0;
  min-height: 100%;
}

main {
  position: relative;
  display: block;
  text-align: center;
  box-sizing: border-box;
  // background: #FFEB3B;
  
  h1 {
    font-size: 34px;
    font-weight: 400;
    padding: 34px;
    color: #607D8B;
  }
  
  .button {
    @include colored-button-white;
    @include raised;
  }
}

footer {
  position: relative;
  margin-top: -56px;
  height: 56px;
  background: #424242;
}
</style>
