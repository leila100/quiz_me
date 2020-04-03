<template>
  <div class="container">
    <h1>-- {{ category }} --</h1>
    <h2>
      Score: <span class="score">{{ score }}</span>
    </h2>
    <div class="cardsContainer">
      <div v-for="question in questions" :key="question.id">
        <div class="value" v-if="!question.clicked" align="center" @click="toggleQuestion(question.id)">
          {{ question.value }}
        </div>
      </div>
    </div>
    <div class="message">{{ message }}</div>
    <div v-if="showQuestion">
      <!-- <div class="text">{{ value }} ---- {{ questionText }}</div>
      <input v-model="userAnswer" placeholder="type answer here" class="input" @keypress.enter="checkAnswer" /> -->
      <b-card :header="value.toString()">
        <b-card-text>
          <div class="text">{{ questionText }}</div>
          <input v-model="userAnswer" placeholder="type answer here" class="input" @keypress.enter="checkAnswer" />
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
      questions: null,
      category: "",
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
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.score = this.$route.params.score;
    axios.get(`http://jservice.io/api/clues?category=${id}`).then(response => {
      this.questions = response.data.map(clue => {
        return {
          id: clue.id,
          question: clue.question,
          value: clue.value,
          answer: clue.answer,
          clicked: false
        };
      });
      this.questions.sort((a, b) => parseInt(a.value) - parseInt(b.value));
      this.category = response.data[0].category.title;
      console.log(this.questions);
      this.message = "";
    });
  },
  methods: {
    toggleQuestion(questionId) {
      if (this.showQuestion === false) this.showQuestion = true;
      // const selectedQuestion = this.questions.find(question => question.id === questionId);
      const questionIndex = this.questions.findIndex(question => question.id === questionId);
      console.log("index: ", questionIndex);
      const selectedQuestion = this.questions[questionIndex];
      console.log("selected question: ", selectedQuestion);
      if (selectedQuestion.clicked) return;
      this.questions[questionIndex].clicked = true;
      this.questionText = selectedQuestion.question;
      this.answer = selectedQuestion.answer;
      this.value = selectedQuestion.value;
      this.message = "";
    },
    checkAnswer() {
      console.log("answer", this.answer);
      console.log("user answer", this.userAnswer);
      if (this.userAnswer !== null && this.answer.toLowerCase() === this.userAnswer.trim().toLowerCase()) {
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
