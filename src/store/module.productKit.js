import ProductKit from './models/ProductKit';
export const productKit = {
  namespaced: true,
  state: {
    productKitList: {
      // NOTE: ['ACTIVE', 'UPDATED']
      status: null,
    },
  },
  actions: {
    async getListProdKit(context) {
      console.warn('STORE.MODULE.PRODUCT_KIT: getListProdKit');
      await ProductKit.api().getListProductKits();
      context.commit('SET_PRODUCT_KIT_LIST_UPDATED');
    },
  },
  getters: {
    GET_STATUS_LIST_PRODUCT_KIT: (state) => {
      return state.productKitList.status;
    },
  },
  mutations: {
    SET_PRODUCT_KIT_LIST_UPDATED: function (state) {
      console.warn('MODULE.PRODUCT_KIT: SET_PRODUCT_KIT_LIST_UPDATED');
      state.productKitList.status = 'UPDATED';
      console.warn(state.productKitList.status);
    },
  },
};
