<template>
  <div>
    <h1>-- {{ category }} --</h1>
    <div v-for="question in questions" :key="question.id">
      <div @click="toggleQuestion(question.id)">{{ question.value }}</div>
    </div>
    <div :class="[{ visible: showQuestion }, { questionContainer: true }]">
      <div>{{ questionText }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      questions: null,
      category: "",
      showQuestion: false,
      questionText: ""
    };
  },
  mounted() {
    const id = this.$route.params.id;
    axios.get(`http://jservice.io/api/clues?category=${id}`).then(response => {
      console.log(response.data);
      this.questions = response.data.map(clue => {
        return { id: clue.id, question: clue.question, value: clue.value, answer: clue.answer };
      });
      this.questions.sort((a, b) => parseInt(a.value) - parseInt(b.value));
      this.category = response.data[0].category.title;
      console.log(this.questions);
    });
  },
  methods: {
    toggleQuestion(questionId) {
      console.log(this.showQuestion);
      if (this.showQuestion === false) this.showQuestion = true;
      this.questionText = this.questions.find(question => question.id === questionId).question;
    }
  }
};
</script>

<style scoped>
.questionContainer {
  display: none;
}
.visible {
  display: block;
  margin: 20px;
}
</style>
