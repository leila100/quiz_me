import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    score: 0,
    categories: [],
    questions: {}
  }
});
