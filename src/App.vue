<template>
  <div id="app">
    <navBar />
    <Categories />
  </div>
</template>

<script>
import Categories from "./components/Categories.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    Categories,
    NavBar
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}
</style>
