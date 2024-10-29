import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem("token"),
    userName: localStorage.getItem("userName") || "",
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    userName: (state) => state.userName,
  },
  mutations: {
    setLogin(state, user) {
      state.isLoggedIn = true;
      state.userName = user.name;
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.userName = "";
    },
  },
  actions: {
    login({ commit }, user) {
      commit("setLogin", user);
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      commit("setLogout");
    },
  },
});
