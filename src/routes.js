import Categories from "./components/Categories.vue";
import Category from "./components/Category.vue";
import Random from "./components/Random.vue";

const routes = [
  { path: "/", component: Categories },
  { path: "/random", component: Random },
  { path: "/category/:id", component: Category, name: "category" }
];

export default routes;
