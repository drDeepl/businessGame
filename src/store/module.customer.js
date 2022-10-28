export const customer = {
  namespaced: true,
  state: {
    createTeamProducts: false,
  },
  actions: {},
  getters: {
    GET_CREATE_TEAM_PRODUCTS: (state) => {
      return state.createTeamProducts;
    },
  },
  mutations: {
    SET_CREATE_TEAM_PRODUCTS_IN_PROCESS: function (state) {
      state.createTeamProducts = true;
    },
    SET_CREATE_TEAM_PRODUCTS_COMPLETE: function (state) {
      state.createTeamProducts = false;
    },
  },
};
