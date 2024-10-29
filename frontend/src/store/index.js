import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
  },
  mutations: {
    setLogin(state) {
      state.isLoggedIn = true;
    },
    setLogout(state) {
      state.isLoggedIn = false;
    },
  },
  actions: {
    login({ commit }) {
      commit("setLogin");
    },
    logout({ commit }) {
      commit("setLogout");
    },
  },
});
