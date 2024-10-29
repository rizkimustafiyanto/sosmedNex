import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "../components/UserLogin.vue";
import UserRegister from "../components/UserRegister.vue";
import Timeline from "../components/Timeline.vue";
import PostDetail from "../components/PostDetail.vue";
import store from "../store";

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "UserLogin",
    component: UserLogin,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "UserRegister",
    component: UserRegister,
    meta: { requiresGuest: true },
  },
  {
    path: "/timeline",
    name: "Timeline",
    component: Timeline,
    meta: { requiresAuth: true },
  },
  {
    path: "/post/:id",
    name: "PostDetail",
    component: PostDetail,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);
  const isLoggedIn = store.getters.isLoggedIn;

  if (requiresAuth && !isLoggedIn) {
    next("/login");
  } else if (requiresGuest && isLoggedIn) {
    next("/timeline");
  } else {
    next();
  }
});

export default router;
