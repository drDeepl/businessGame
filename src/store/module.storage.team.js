export const storageTeam = {
  namespaced: true,
  state: {
    createProduct: false,
  },
  actions: {},
  getters: {
    GET_STATE_CREATE_PRODUCT: (state) => {
      return state.createProduct;
    },
  },
  mutations: {
    SET_CREATE_PRODUCT: function (state) {
      console.warn('MODULE.STORAGE.TEAM: set_create_product');
      state.createProduct = true;
    },
    SET_CREATE_PRODUCT_COMPLETE: function (state) {
      console.warn('MODULE.STORAGE.TEAM: set_create_product_complete');
      state.createProduct = false;
    },
  },
};
