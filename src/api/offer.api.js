import instance from './main';
class OfferApi {
  pathPurchase = 'offers/purchase';
  pathSale = 'offers/sale';
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

  async getOfferPurchase(offerId) {
    console.warn('OFFER.API: getOfferPurchase');

    return instance.get(`${this.pathPurchase}/offer/${offerId}`);
  }

  async getOfferSale(offerId) {
    console.warn('OFFER.API: getOfferSale');
    return instance.get(`${this.pathSale}/offer/${offerId}`);
  }

  async getOffersSaleDone() {
    console.warn('MODEL.OFFER: getOfferSaleDone');
    return instance.get(`offers/sale/list/state/done`);
  }

  async getOffersPurchaseDone() {
    console.warn('MODEL.OFFER: getOfferPurchaseDone');
    return instance.get(`${this.pathPurchase}/list/state/done`);
  }

  async offerPurchaseSetAwait(offerId) {
    console.warn('OFFER.API: offerPurchaseToAwait');
    return instance.get(`offers/purchase/to-await/${offerId}`);
  }

  async offersPurchaseAwaited(customerId) {
    console.warn('OFFER.API: offersPurchaseAwaited');
    return instance.get(`offers/purchase/list/awaited/${customerId}`);
  }
}

export default new OfferApi();
