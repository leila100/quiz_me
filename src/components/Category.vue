<template>
  <div class="container">
    <h1>-- {{ category }} --</h1>
    <h2>
      Score:
      <span class="score">{{ score }}</span>
    </h2>
    <div class="cardsContainer">
      <div v-for="question in selectedQuestions" :key="question.id">
        <div
          class="value"
          v-if="!question.clicked && question.value"
          align="center"
          @click="toggleQuestion(question.id)"
        >{{ question.value }}</div>
      </div>
    </div>
    <div class="message">{{ message }}</div>
    <div v-if="showQuestion">
      <b-card :header="value.toString()">
        <b-card-text>
          <div class="text">{{ questionText }}</div>
          <input
            v-model="userAnswer"
            placeholder="type answer here"
            class="input"
            @keypress.enter="checkAnswer"
          />
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selectedQuestions: null,
      category: "",
      categoryId: null,
      showQuestion: false,
      questionText: "",
      answer: "",
      value: null,
      userAnswer: null,
      message: ""
    };
  },
  computed: {
    score() {
      return this.$store.state.score;
    },
    questions() {
      return this.$store.state.questions;
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.categoryId = id;
    if (!this.$store.state.questions[id]) {
      axios
        .get(`http://jservice.io/api/clues?category=${id}`)
        .then(response => {
          const clues = response.data.map(clue => {
            return {
              category: response.data[0].category.title,
              id: clue.id,
              question: clue.question,
              value: clue.value,
              answer: clue.answer,
              clicked: false
            };
          });
          clues.sort((a, b) => parseInt(a.value) - parseInt(b.value));
          const newQuestions = {
            ...this.$store.state.questions,
            [id]: clues
          };
          this.$store.state.questions = newQuestions;
          this.category = response.data[0].category.title;
          this.selectedQuestions = newQuestions[id];
        });
    } else {
      this.category = this.$store.state.questions[id][0].category;
      this.selectedQuestions = this.$store.state.questions[id];
    }
    this.message = "";
  },
  methods: {
    toggleQuestion(questionId) {
      if (this.showQuestion === false) this.showQuestion = true;
      // const selectedQuestion = this.questions.find(question => question.id === questionId);
      const questionIndex = this.selectedQuestions.findIndex(
        question => question.id === questionId
      );
      const selectedQuestion = this.selectedQuestions[questionIndex];
      if (selectedQuestion.clicked) return;
      this.selectedQuestions[questionIndex].clicked = true;
      this.questionText = selectedQuestion.question;
      this.answer = selectedQuestion.answer;
      this.value = selectedQuestion.value;
      this.message = "";
      this.$store.state.questions = {
        ...this.$store.state.questions,
        [this.categoryId]: this.selectedQuestions
      };
    },
    checkAnswer() {
      if (
        this.userAnswer !== null &&
        this.answer.toLowerCase() === this.userAnswer.trim().toLowerCase()
      ) {
        this.message = `Good answer. +${this.value}`;
        this.$store.state.score += this.value;
      } else this.message = `Wrong answer - the answer was ${this.answer} `;
      this.showQuestion = false;
      this.userAnswer = "";
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}
.cardsContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.value {
  width: 200px;
  margin: 10px;
  padding: 10px;
  background-color: blueviolet;
  color: white;
}
.card {
  width: 60%;
  margin: 50px auto;
}
.card-header {
  background-color: blueviolet;
  color: white;
}
.text {
  font-size: 18px;
  margin-top: 20px;
}
.input {
  padding: 10px;
  margin-top: 10px;
  width: 90%;
}
.message {
  margin-top: 20px;
  font-size: 20px;
}
.score {
  color: blueviolet;
}
</style>
