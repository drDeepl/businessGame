import CreateProductKit from '@/models/model.productKit.create';
import ProductKitAPI from '@/api/productKit.api';

class ProductKitService {
  filename = 'PRODUCT_KIT.SERVICE: ';
  async createProdKit(productKit) {
    console.warn(this.filename, 'createProdKit');
    console.log(productKit);
    console.warn(new CreateProductKit());
    const ruleValidate = new CreateProductKit().ruleValidate;
    for (let key in productKit) {
      console.error(key);
      if (ruleValidate[key].toLowerCase() == 'integer') {
        productKit[key] = Number.parseInt(productKit[key]);
      }
    }
    console.warn(productKit);
    const response = await ProductKitAPI.createProductKit(productKit);
    return response.data;
  }
}
export default new ProductKitService();
