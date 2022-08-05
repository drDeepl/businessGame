import ProductKit from './models/ProductKit';
export const productKit = {
  namespaced: true,
  state: {
    getProductKits: false,
    getProductKit: null,
    createProductKit: false,
  },
  actions: {
    async getProductKits(context) {
      console.warn('STORE.MODULE.PRODUCT_KIT: getListProdKit');
      context.commit('SET_STATE_getProductKits');
      await ProductKit.api().getListProductKits();
      context.commit('SET_getProductKits_COMPLETE');
    },
    async createProductKit(context, productKit) {
      context.commit('SET_CREATE_PRODUCT_KIT');
      await ProductKit.api().createProductKit(productKit);
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
    GET_PRODUCT_KIT_CREATE: (state) => {
      return state.createProductKit;
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
    SET_CREATE_PRODUCT_KIT: function (state) {
      state.createProductKit = true;
    },
    SET_CREATE_PRODUCT_KIT_COMPLETE: function (state) {
      state.createProductKit = false;
    },
  },
};
