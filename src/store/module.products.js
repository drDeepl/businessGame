import ProductService from '@/services/product.service';
import ProductStorage from '@/store/models/ProductStorage';
import Product from './models/Product';

import {decorateResponseApi} from '@/services/utils.service';

export const products = {
  namespaced: true,
  state: {
    createProduct: false,
    getListProducts: false,
    listProductsUpdate: false,
    getProductsStore: true,
    deleteProduct: {
      RUN: false,
      COMPLETE: false,
      ERROR: false,
    },
    deleteAllProducts: {
      active: false,
      error: false,
    },
    arrays: {
      tabsAction: [{form: 'formAddProduct', label: 'Добавить продукт'}],
      tabsView: [
        {view: 'product', label: 'Продукты'},
        {view: 'productKit', label: 'Продуктовые наборы'},
      ],
    },
  },
  actions: {
    async createProduct(context, dataToCreate) {
      console.warn('MODULE.product: createProduct');
      context.commit('SET_PRODUCT_CREATE');
      const responseWrap = await Product.api().createProduct(dataToCreate);
      context.commit('SET_PRODUCT_CREATED');
      return responseWrap.response.data;
    },
    async getListProductInStore(context, team_id) {
      console.warn('MODULE.PRODUCTS: getListProductInStore');
      context.commit('SET_STATE_GET_PRODUCTS_STORE');
      console.error(team_id);
      try {
        const response = await ProductStorage.api()
          .getListProducts(team_id)
          .catch((err) => err);
        let listProductsStore = response.response.data;
        return listProductsStore;
      } catch {
        return;
      } finally {
        context.commit('SET_STATE_GET_PRODUCTS_STORE_COMPLETE');
      }
    },
    async getProducts(context) {
      const responseWrap = await Product.api().getListProducts();
      const products = responseWrap.response.data.items
        ? responseWrap.response.data.items
        : responseWrap.response.data;
      context.commit('SET_GET_LIST_PRODUCTS_COMPLETE');
      return products;
    },
    async getProduct(context, productId) {
      console.warn('module.productKit: getProductKit');

      const responseWrap = await decorateResponseApi(
        Product.api().getProduct,
        productId
      );

      return responseWrap.data;
    },
    async setStateDeletedProduct(context, productId) {
      console.warn('MODULE.PRODUCTS: setStateDeletedProduct');
      const response = await decorateResponseApi(
        Product.api().setStateDeletedProduct,
        productId
      );
      return response;
    },
    async deleteProduct(context, productId) {
      console.warn('MODULE.PRODUCTS: deleteProduct');
      const id = Number.parseInt(productId);

      const responseDeleteProduct = await decorateResponseApi(
        Product.api().deleteProduct,
        id
      );
      context.commit('SET_DELETE_PRODUCT_COMPLETE');
      return responseDeleteProduct;
    },
    async deleteProducts(context, flag) {
      console.warn('deleteProducts');

      const responseWrap = await Product.api().deleteProducts(flag);
      context.commit('SET_DELETE_ALL_PRODUCTS_COMPLETE');
      return responseWrap.response.data;
    },
    async productCreate(context, createdProduct) {
      console.warn('MODULE.PRODUCTS: createProduct');
      const product = await ProductService.createProduct(createdProduct);
      context.commit('SET_PRODUCT_ARRAY', product);
      return product;
    },
  },
  getters: {
    GET_LIST_PRODUCTS_UPDATE: (state) => {
      return state.listProductsUpdate;
    },
    GET_STATE_DELETE_PRODUCT_RUN: (state) => {
      return state.deleteProduct.RUN;
    },
    GET_STATE_DELETE_PRODUCT_ERROR: (state) => {
      return state.deleteProduct.ERROR;
    },
    GET_DELETE_ALL_PRODUCTS: (state) => {
      return state.deleteAllProducts.active;
    },
    GET_DELETE_ALL_PRODUCTS_ERROR: (state) => {
      return state.deleteAllProducts.error;
    },
    GET_STATE_getListProducts: (state) => {
      return state.getListProducts;
    },
    GET_STATE_createProduct: (state) => {
      console.warn('MODULE.product: GET_STATE_createProduct');
      return state.createProduct;
    },
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
  },
  mutations: {
    SET_GET_LIST_PRODUCTS_RUN: function (state) {
      state.getListProducts = true;
    },
    SET_GET_LIST_PRODUCTS_COMPLETE: function (state) {
      state.getListProducts = false;
    },

    SET_PRODUCT_CREATE: function (state) {
      console.warn('MODULE.product: SET_PRODUCT_CREATE');
      state.createProduct = true;
    },
    SET_PRODUCT_CREATED: function (state) {
      console.warn('MODULE.product: SET_PRODUCT_CREATE');
      state.createProduct = false;
    },
    SET_STATE_GET_PRODUCTS_STORE: function (state) {
      console.warn('MODULE.PRODUCTS: SET_STATE_GET_PRODUCTS_STORE');
      state.getProductsStore = true;
    },
    SET_STATE_GET_PRODUCTS_STORE_COMPLETE: function (state) {
      console.warn('MODULE.PRODUCTS: SET_STATE_GET_PRODUCTS_STORE');
      state.getProductsStore = false;
    },
    SET_DELETE_PRODUCT_RUN: function (state) {
      state.deleteProduct.RUN = true;
    },
    SET_DELETE_PRODUCT_COMPLETE: function (state) {
      state.deleteProduct.RUN = false;
      state.deleteProduct.COMPLETE = true;
    },
    SET_DELETE_PRODUCT_ERROR: function (state) {
      state.deleteProduct.RUN = false;
      state.deleteProduct.ERROR = true;
    },
    CLEAR_STATE_DELETE_PRODUCT: function (state) {
      for (let i = 0; i < state.deleteProduct.length; i++) {
        state.deleteProduct[i] = false;
      }
    },
    SET_DELETE_ALL_PRODUCTS_START: function (state) {
      state.deleteAllProducts.active = true;
    },
    SET_DELETE_ALL_PRODUCTS_COMPLETE: function (state) {
      state.deleteAllProducts.active = false;
    },
    SET_DELETE_ALL_PRODUCTS_ERROR: function (state, flag) {
      state.deleteAllProducts.error = flag;
    },
    SET_LIST_PRODUCT_UPDATE_RUN: function (state) {
      state.listProductsUpdate = true;
    },
    SET_LIST_PRODUCT_UPDATE_COMPLETE: function (state) {
      state.listProductsUpdate = false;
    },
  },
};
