import ProductService from '@/services/product.service';
import ProductStorage from '@/store/models/ProductStorage';

import Product from './models/Product';
export const products = {
  namespaced: true,
  state: {
    getProductsStore: true,
    products: {}, // NOTE: {productId: data}
    productsByName: {}, // NOTE: {product_name: data}
    productKits: {}, // NOTE: {productKit_id: data}
    arrays: {
      tabsAction: [
        {form: 'formAddProduct', label: 'Добавить продукт'},
        // {form: 'formSellProduct', label: 'Продать продукт'},
      ],
      tabsView: [
        {view: 'product', label: 'Продукты'},
        {view: 'productKit', label: 'Продуктовые наборы'},
      ],
    },
  },
  actions: {
    async getListProductInStore(context, team_id) {
      console.warn('MODULE.PRODUCTS: getListProductInStore');
      context.commit('SET_STATE_GET_PRODUCTS_STORE');
      const response = await ProductStorage.api().getListProducts(team_id);

      const listProductsStore = response.response.data;
      context.commit('SET_STATE_GET_PRODUCTS_STORE_COMPLETE');
      return listProductsStore;
    },
    async getListProducts() {
      console.warn('MODULE.PRODUCTS: getListProduct');
      // const listProducts = await ProductService.getListProducts();
      // context.commit('SET_LIST_PRODUCTS', listProducts);
      console.warn(Product.api());
    },
    async deleteProduct(context, productId) {
      console.warn('MODULE.PRODUCTS: deleteProduct');
      const detailDelete = await ProductService.deleteProduct(productId);
      console.log(detailDelete);
      return context.dispatch('getListProducts');
    },
    async productCreate(context, createdProduct) {
      console.warn('MODULE.PRODUCTS: createProduct');
      const product = await ProductService.createProduct(createdProduct);
      context.commit('SET_PRODUCT_ARRAY', product);
      return product;
    },
  },
  getters: {
    GET_STATE_getProductsStore: (state) => {
      console.warn('MODULE.PRODUCTS: GET_STATE_getProductsStore');
      return state.getProductsStore;
    },
    GET_LIST_TABS_ACTION: (state) => {
      console.warn('MODULE.PRODUCTS: GET_LIST_TABS');
      return state.arrays.tabsAction;
    },
    GET_LIST_TABS_VIEW: (state) => {
      console.warn('MODULE.PRODUCTS: GET_LIST_TABS');
      return state.arrays.tabsView;
    },
    GET_LIST_PRODUCTS: (state) => {
      console.warn('MODULE.PRODUCTS: GET_LIST_PRODUCTS');
      return state.products;
    },
    GET_LIST_NAME_PRODUCT: (state) => {
      console.warn('MODULE.PRODUCTS:GET_LIST_NAME_PRODUCT');
      let listNameProduct = [];
      for (let key in state.products) {
        console.error(key);
        listNameProduct.push(state.products[key].name);
      }
      return listNameProduct;
    },
    GET_PRODUCT_BY_NAME: (state) => (name) => {
      console.warn('MODULE.PRODUCTS: GET_PRODUCT_BY_NAME', name);
      return state.productsByName[name];
    },
  },
  mutations: {
    SET_STATE_GET_PRODUCTS_STORE: function (state) {
      console.warn('MODULE.PRODUCTS: SET_STATE_GET_PRODUCTS_STORE');
      state.getProductsStore = true;
    },
    SET_STATE_GET_PRODUCTS_STORE_COMPLETE: function (state) {
      console.warn('MODULE.PRODUCTS: SET_STATE_GET_PRODUCTS_STORE');
      state.getProductsStore = false;
    },
  },
};
