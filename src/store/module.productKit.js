import ProductKitService from '@/services/productKit.service';

export const productKit = {
  namespaced: true,
  state: {
    productKits: {}, // INFO: { id_productKit: data_productKit}
    productKits_By_Product: {} // INFO: {productId: data_productKit}
  },
  actions: {
    async createProductKit(context, productKit) {
      console.warn('MODULE.PRODUCT_KIT', productKit);
      const createdProductKit = await ProductKitService.createProdKit(
        productKit
      );
      context.commit('SET_PRODUCT_KIT', createdProductKit);
      console.error(createdProductKit);
      return createdProductKit;
    },
    async getProductsKit(context) {
      console.warn('MODULE.PRODUCT_KIT');
      console.log(context);
    }
  },
  getters: {
    GET_LIST_PRODUCT_KITS: state => {
      return state.productKits;
    }
  },
  mutations: {
    SET_PRODUCT_KIT: function(state, createdProductKit) {
      console.warn('MODULE.PRODUCT_KIT', 'SET_PRODUCT_KIT');
      // NOTE: функия сохранает готовый набор продуктов
      // NOTE: в state по id productKit и id product(product)
      state.productKits[createdProductKit.id] = createdProductKit;
      state.productKits_By_Product[
        createdProductKit.product
      ] = createdProductKit;
    }
  }
};
