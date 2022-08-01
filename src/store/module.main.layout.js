export const mainLayout = {
  namespaced: true,
  state: {
    loading: false,
  },
  actions: {},
  getters: {
    LOADING: (state) => {
      return state.loading;
    },
  },
  mutations: {
    SET_STATE_LOADING: function (state) {
      state.loading = false;
    },
    SET_STATE_LOADING_COMPLETE: function (state) {
      state.loading = true;
    },
  },
};
