import ProductKit from './models/ProductKit';
import Messages from '@/models/model.messages';
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
      const productKits = responseWrap.response.data.items
        ? responseWrap.response.data.items
        : responseWrap.response.data;
      return productKits;
    },
    async createProductKit(context, productKit) {
      context.commit('SET_CREATE_PRODUCT_KIT');

      const responseWrap = await ProductKit.api()
        .createProductKit(productKit)
        .catch((error) => console.log(error));
      const data = responseWrap.response.data;
      return data;
    },
    async getProductKit(context, productKitId) {
      console.warn('module.productKit: getProductKit');
      let response = {status: 200, error: false, data: null, message: ''};
      const responseWrap = await ProductKit.api()
        .getProductKit(productKitId)
        .catch((error) => (response.status = error.status));
      if (response.status === 200) {
        response.data = responseWrap.response.data;
      } else {
        response.message = Messages.error;
        response.error = true;
      }
      return response;
    },

    async getProductFromProductKit(context, productKitId) {
      console.warn('module.productKit: getProductKit');
      let response = {status: 200, error: false, data: null, message: ''};
      const responseWrap = await ProductKit.api()
        .getProductFromProductKit(productKitId)
        .catch((error) => (response.status = error.status));
      if (response.status === 200) {
        response.data = responseWrap.response.data;
      } else {
        response.message = Messages.error;
        response.error = true;
      }
      return response;
    },
    async delProductKit(context, productKitId) {
      console.warn('STORE.MODULE.PRODUCT_KIT: deleteProductKit');
      // FIX: Как обработать ошибку?

      const responseWrap = await ProductKit.api()
        .deleteProductKit(productKitId)
        .catch((response) => response.response);
      const status = responseWrap.response
        ? responseWrap.response.status
        : responseWrap.status;
      const isSuccess = status === 200;
      const response = {success: isSuccess, data: null, message: null};
      if (isSuccess) {
        response.data = responseWrap.response.data;
      } else {
        response.message = 'При удалении произошла ошибка...';
      }
      return response;
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
