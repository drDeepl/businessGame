import {Model} from '@vuex-orm/core';
import Product from './Product';
// import ProductProductKit from './ProductProductKit';
import TokenService from '@/services/token.service';

console.warn('MODEL.PRODUCT_KIT');

export default class ProductKit extends Model {
  static entity = 'productKits';
  static fields() {
    return {
      id: this.attr(null),
      product: this.attr(null),
      product_data: this.belongsTo(Product, 'product'),
      count: this.attr(null),
      time: this.attr(null),
    };
  }
  static apiConfig = {
    headers: {
      Authorization: TokenService.getLocalAccessToken(),
    },
    actions: {
      async createProductKit(productKit) {
        console.warn('STORE.MODEL.PRODUCT_KIT: createProductKit');

        return this.post('product-kits', productKit);
      },
      async getListProductKits() {
        console.warn('STORE.MODEL.PRODUCT_KIT: getListProductKits');
        return this.get('product-kits');
      },
      async getProductKit(productKitId) {
        console.warn('STORE.MODEL.PRODUCT_KIT: getProductKit');
        return this.get('product-kits/' + productKitId);
      },
      async getProductFromProductKit(productKitId) {
        console.warn('STORE.MODEL.PRODUCT_KIT: getProductKit');
        return this.get('product-kits/product/' + productKitId);
      },
      async deleteProductKit(productKitId) {
        console.warn('STORE.MODEL.PRODUCT_KIT: deleteProductKit');
        return this.delete('product-kits/' + productKitId, {
          delete: productKitId,
        });
      },
      async setStateDeletedProductKit(productKitId) {
        return this.get(`product-kits/delete/${productKitId}`);
      },
    },
  };
}
