<template>
  <div>
    <h1 class="header">Categories</h1>
    <h2>Score: {{score}}</h2>
    <div class="cardsContainer">
      <router-link
        :to="{ name: 'category', params: { id: category.id, score: score } }"
        v-for="category in categories"
        :key="category.id"
        class="card"
      >
        <h3 class="title">{{ category.title }}</h3>
        <div class="numClues">
          Questions:
          <span>{{ category.clues_count }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "HelloWorld",
  data() {
    return {
      categories: null,
      score: 0
    };
  },
  mounted() {
    axios.get("http://jservice.io/api/categories?count=20").then(response => {
      console.log(response.data);
      this.categories = response.data;
    });
    eventBus.$on("scoreIncremented", score => {
      console.log("***Getting the score from bus: ", score);
      this.score = score;
    });
  },
  created() {
    // eventBus.$on("scoreIncremented", score => {
    //   console.log("***Getting the score from bus: ", score);
    //   this.score = score;
    // });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  width: 100%;
  text-align: center;
  margin: 20px 0;
  color: blueviolet;
  font-size: 55px;
}
.cardsContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.card {
  width: 400px;
  border: 2px solid #343a40;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 10px;
}

.title {
  font-size: 22px;
}

.numClues {
  font-weight: bold;
}

.numClues span {
  color: blueviolet;
}
</style>
