<template>
  <div>
    <h1>-- {{ category }} --</h1>
    <h2>Score: {{ score }}</h2>
    <div class="cardsContainer">
      <div v-for="question in questions" :key="question.id" class="card">
        <!-- <div @click="toggleQuestion(question.id)">{{ question.value }}</div> -->
        <div align="center" @click="toggleQuestion(question.id)">{{ question.value }}</div>
      </div>
    </div>
    {{ message }}
    <div v-if="showQuestion">
      <div class="text">---- {{ questionText }} ----</div>
      <input v-model="userAnswer" placeholder="type answer here" class="input" @keypress.enter="checkAnswer" />
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
          answer: clue.answer
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
      const selectedQuestion = this.questions.find(question => question.id === questionId);
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
.cardsContainer {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 200px;
  margin: 10px;
  padding: 10px;
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
}
</style>
