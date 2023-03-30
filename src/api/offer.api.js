import instance from './main';
class OfferApi {
  offersSale() {
    return instance.get('offers/sale/list');
  }
  offersPurchase() {
    return instance.get('offers/purchase/list');
  }
}

export default new OfferApi();
