import ProductKit from './models/ProductKit';
export const productKit = {
  namespaced: true,
  state: {
    getProductKits: false,
  },
  actions: {
    async getProductKits(context) {
      console.warn('STORE.MODULE.PRODUCT_KIT: getListProdKit');
      context.commit('SET_STATE_getProductKits');
      await ProductKit.api().getListProductKits();
      context.commit('SET_getProductKits_COMPLETE');
    },
  },
  getters: {
    STATUS_getProductKits: (state) => {
      return state.getProductKits;
    },
  },
  mutations: {
    SET_STATE_getProductKits: function (state) {
      console.warn('MODULE.PRODUCT_KIT: SET_STATE_getProductKits');
      state.getProductKits = true;
    },
    SET_getProductKits_COMPLETE: function (state) {
      state.getProductKits = false;
    },
  },
};
