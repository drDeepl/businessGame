export const storageTeam = {
  namespaced: true,
  state: {
    prepareProduct: {
      progress: 0,
      prepare: false,
    },
  },
  actions: {
    async prepareProduct(context, time) {
      console.warn('MODULE.STORAGE.TEAM');
      console.warn(time);
      let prepareProduct = setInterval(() => console.log(100 / time), 1000);
      setTimeout(() => {
        clearInterval(prepareProduct);
      }, 5000);
      context.commit('SET_CREATE_PRODUCT');
    },
  },
  getters: {
    GET_STATE_CREATE_PRODUCT: (state) => {
      return state.prepareProduct.prepare;
    },
  },
  mutations: {
    SET_CREATE_PRODUCT: function (state) {
      console.warn('MODULE.STORAGE.TEAM: set_create_product');
      state.prepareProduct.prepare = true;
    },
    SET_CREATE_PRODUCT_COMPLETE: function (state) {
      console.warn('MODULE.STORAGE.TEAM: set_create_product_complete');
      state.prepareProduct.prepare = false;
    },
  },
};
