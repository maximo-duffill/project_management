import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      user: "",
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = { email: user.email.split('@')[0] };
    },
    clearUser(state) {
      state.user = "";
    },
  },
});
