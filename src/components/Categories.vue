<template>
  <div>
    <h1>Categories page</h1>
    <div class="cardsContainer">
      <div v-for="category in categories" :key="category.id" class="card">
        <h3 class="title">{{ category.title }}</h3>
        <div class="numClues">
          Questions: <span>{{ category.clues_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      categories: null
    };
  },
  props: {
    msg: String
  },
  mounted() {
    axios.get("http://jservice.io/api/categories?count=20").then(response => {
      console.log(response.data);
      this.categories = response.data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cardsContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
}

.card {
  width: 400px;
  border: 2px solid #42b983;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 10px;
  /* width: 20%; */
}

.title {
  font-size: 22px;
}

.numClues {
  font-weight: bold;
}

.numClues span {
  color: #42b983;
}
</style>
