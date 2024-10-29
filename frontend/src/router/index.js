import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "../components/UserLogin.vue";
import UserRegister from "../components/UserRegister.vue";
import Timeline from "../components/Timeline.vue";
import PostDetail from "../components/PostDetail.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "UserLogin", component: UserLogin },
  { path: "/register", name: "UserRegister", component: UserRegister },
  { path: "/timeline", name: "Timeline", component: Timeline },
  { path: "/post/:id", name: "PostDetail", component: PostDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
