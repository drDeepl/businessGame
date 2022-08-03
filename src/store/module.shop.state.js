export const shopState = {
  namespaced: true,
  state: {
    mainLayout: false,
  },
  actions: {},
  getters: {
    GET_STATE_mainLayout: (state) => {
      return state.mainLayout;
    },
  },
  mutations: {
    SET_STATE_LOAD_mainLayout: function (state) {
      state.mainLayout = true;
    },
    SET_STATE_COMPLETE_mainLayout: function (state) {
      state.mainLayout = false;
    },
  },
};
