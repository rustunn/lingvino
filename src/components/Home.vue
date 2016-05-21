<template>
  <div id="home">
    <header></header>
    <main></main>
    <footer></footer>
  </div>
</template>

<script>

export default {
  components: {

  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
}

body {
  min-height: 100%;
}

#home {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

header {
  height: 54px;
  background-color: green;
}

main {
  background-color: blue;
}

footer {
  background-color: orange;
  height: 54px;
}
</style>
