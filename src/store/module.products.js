import ProductService from '@/services/product.service';
export const products = {
  namespaced: true,
  state: {
    products: {}, // NOTE: {productId: data}
    productsByName: {}, // NOTE: {product_name: data}
    productKits: {}, // NOTE: {productKit_id: data}
    arrays: {
      tabsAction: [
        {form: 'formAddProduct', label: 'Добавить продукт'},
        // {form: 'formSellProduct', label: 'Продать продукт'},
        {form: 'formSellProductKit', label: 'Продать продуктовый набор'}
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
    },
    GET_LIST_NAME_PRODUCT: state => {
      console.warn('MODULE.PRODUCTS:GET_LIST_NAME_PRODUCT');
      let listNameProduct = [];
      for (let key in state.products) {
        console.error(key);
        listNameProduct.push(state.products[key].name);
      }
      return listNameProduct;
    },
    GET_PRODUCT_BY_NAME: state => name => {
      console.warn('MODULE.PRODUCTS: GET_PRODUCT_BY_NAME', name);
      return state.productsByName[name];
    }
  },
  mutations: {
    SET_PRODUCT_ARRAY: function(state, createdProduct) {
      console.warn('MODULE.PRODUCTS: SET_PRODUCT_ARRAY');
      console.error(createdProduct);
      state.products[createdProduct.id] = createdProduct;
    },
    SET_LIST_PRODUCTS: function(state, listProducts) {
      console.warn('MODULE.PRODUCTS.VUE: SET_LIST_PRODUCTS');
      for (let key in listProducts) {
        const product = listProducts[key];
        state.products[product.id] = product;
        state.productsByName[product.name] = product;
      }
    }
  }
};
