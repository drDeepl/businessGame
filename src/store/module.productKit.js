import ProductKit from './models/ProductKit';
export const productKit = {
  namespaced: true,
  state: {
    getProductKits: false,
    getProductKit: null,
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
    GET_PRODUCT_KIT: () => {
      console.warn('MODULE.productKit: GET_PRODUCT_KIT_FOR_SHOW');
      return (productKitId) => {
        const productKit = ProductKit.query().where('id', productKitId).first();
        return productKit;
      };
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
