import ProductKit from './models/ProductKit';
export const productKit = {
  namespaced: true,
  state: {
    getProductKits: false,
    getProductKit: null,
    createProductKit: false,
    deleteProductKit: {
      RUN: false,
      ERROR: false,
    },
  },
  actions: {
    async getProductKits(context) {
      console.warn('STORE.MODULE.PRODUCT_KIT: getListProdKit');
      context.commit('SET_STATE_getProductKits');
      const responseWrap = await ProductKit.api().getListProductKits();
      context.commit('SET_getProductKits_COMPLETE');
      return responseWrap.response.data;
    },
    async createProductKit(context, productKit) {
      context.commit('SET_CREATE_PRODUCT_KIT');
      await ProductKit.api().createProductKit(productKit);
    },
    async delProductKit(context, productKitId) {
      console.warn('STORE.MODULE.PRODUCT_KIT: deleteProductKit');
      const responseWrap = await ProductKit.api().deleteProductKit(
        productKitId
      );
      context.commit('SET_PRODUCT_KIT_RUN_DELETE_COMPLETE');
      return responseWrap.response.data;
    },
  },
  getters: {
    GET_PRODUCT_KIT_DELETE_RUN: (state) => {
      return state.deleteProductKit.RUN;
    },
    GET_PRODUCT_KIT_DELETE_ERROR: (state) => {
      return state.deleteProductKit.ERROR;
    },

    STATE_getProductKits: (state) => {
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
    SET_PRODUCT_KIT_DELETE_RUN: function (state) {
      state.deleteProductKit.RUN = true;
    },
    SET_PRODUCT_KIT_DELETE_RUN_COMPLETE: function (state) {
      state.deleteProductKit.RUN = false;
    },
    SET_PRODUCT_KIT_DELETE_ERROR: function (state) {
      state.deleteProductKit.ERROR = true;
    },
    SET_PRODUCT_KIT_DELETE_ERROR_COMPLETE: function (state) {
      state.deleteProductKit.ERROR = false;
    },
  },
};
