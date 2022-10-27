export const customer = {
  namespaced: true,
  state: {
    arrays: {
      teams: null,
      products: null,
    },
  },
  actions: {},
  getters: {
    GET_PRODUCTS_TEAMS: (state) => {
      return state.arrays.products;
    },
  },
  mutatations: {
    SET_TEAM_PRODUCTS: function (state, teamsProducts) {
      state.arrays.products = teamsProducts;
    },
  },
};
