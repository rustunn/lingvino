<template>
  <div class="container">
    <header-el></header-el>
    <main>
      <h1>Spoken Engish for Everyone</h1>
      <div class="button">Get started</div>
    </main>
  </div>
  <footer></footer>
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
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

html, body {
  height: 100%;
}

.container {
  min-height: 100%;
  margin-bottom: -2rem;
  padding-bottom: 2rem;
  box-sizing: border-box;
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
  width: 100%;
  box-sizing: border-box;
  padding: 0 1.8rem 0 1.8rem;
  background: #282828;
  height: 2rem;
  background: #424242;
}
</style>
