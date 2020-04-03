import Vue from "vue";
import VueRouter from "vue-router";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import routes from "./routes";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { store } from "./store/store";
import App from "./App.vue";

const router = new VueRouter({
  mode: "history",
  routes
});

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
