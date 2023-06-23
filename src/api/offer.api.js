import instance from './main';
class OfferApi {
  offersSale() {
    return instance.get('offers/sale/list');
  }
  offersPurchase() {
    return instance.get('offers/purchase/list');
  }
  getOfferSaleState(offerId) {
    console.warn('MODEL.OFFER: getOfferState');
    return instance.get('offers/sale/state-offer/' + offerId);
  }

  async offerPurchaseToAwait(offerId) {
    console.warn('OFFER.API: offerPurchaseToAwait');
    return instance.get(`offers/purchase/to-await/${offerId}`);
  }
}

export default new OfferApi();
