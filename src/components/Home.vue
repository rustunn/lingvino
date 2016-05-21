<template>
  <div id="home">
    <header-el></header-el>
    <main></main>
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

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
}

body {
  min-height: 100%;
}

#home {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

main {
  background-color: blue;
}

footer {
  background-color: orange;
  height: 54px;
}
</style>
