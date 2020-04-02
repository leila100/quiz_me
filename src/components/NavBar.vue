<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item to="/" class="item" href="#">Home</b-nav-item>
        <b-nav-item to="/random" class="item" href="#">Random</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="item">Score --- {{score}}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { eventBus } from "../main";
export default {
  data() {
    return {
      score: 0
    };
  },
  created() {
    eventBus.$on("scoreIncremented", score => {
      console.log("Getting the score from bus: ", score);
      this.score = score;
    });
  }
};
</script>

<style>
.navbar-dark .navbar-nav .nav-link {
  color: blueviolet;
  font-size: 20px;
}
</style>
