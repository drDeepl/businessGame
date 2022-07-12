import ProductService from '@/services/product.service';
export const products = {
  namespaced: true,
  state: {
    products: {}, // NOTE: {productId: data}
    productKits: {}, // NOTE: {productKit_id: data}
    arrays: {
      tabsAction: [
        {form: 'formAddProduct', label: 'Добавить продукт'},
        {form: 'formSellProduct', label: 'Продать продукт'}
      ],
      tabsView: [
        {view: 'product', label: 'Продукты'},
        {view: 'productKit', label: 'Продуктовые наборы'}
      ]
    }
  },
  actions: {
    async createProduct(context, name) {
      if (typeof name == 'string') {
        const createdProduct = await ProductService.createProduct(name);
        context.commit('SET_PRODUCT', createdProduct);
        return createdProduct;
      }
    },
    async getListProducts(context) {
      console.warn('MODULE.PRODUCTS: getListProduct');
      const listProducts = await ProductService.getListProducts();
      context.commit('SET_LIST_PRODUCTS', listProducts);
      return listProducts;
    }
  },
  getters: {
    GET_LIST_TABS_ACTION: state => {
      console.warn('MODULE.PRODUCTS: GET_LIST_TABS');
      return state.arrays.tabsAction;
    },
    GET_LIST_TABS_VIEW: state => {
      console.warn('MODULE.PRODUCTS: GET_LIST_TABS');
      return state.arrays.tabsView;
    },
    GET_LIST_PRODUCTS: state => {
      console.warn('MODULE.PRODUCTS: GET_LIST_PRODUCTS');
      return state.products;
    }
  },
  mutations: {
    SET_PRODUCT_ARRAY: function(state, createdProduct) {
      state.products[createdProduct.id] = createdProduct;
    },
    SET_LIST_PRODUCTS: function(state, listProducts) {
      console.warn('MODULE.PRODUCTS.VUE: SET_LIST_PRODUCTS');
      for (let key in listProducts) {
        const product = listProducts[key];
        state.products[product.id] = product;
      }
    }
  }
};
