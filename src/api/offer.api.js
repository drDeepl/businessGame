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

  async getListOfferPurchase() {
    console.warn('MODEL.OFFER: getListOfferPurchase');

    return instance.get('offers/purchase/list');
  }

  async getOfferPurchase(offerId) {
    console.warn('OFFER.API: getOfferPurchase');

    return instance.get(`${this.pathPurchase}/offer/${offerId}`);
  }

  async offerPurchasePlace(modelOfferPurchasePlace) {
    console.warn('MODEL.OFFER: offerPurchasePlace');
    console.log(modelOfferPurchasePlace);

    const schemaPurchsePlace = {
      price: modelOfferPurchasePlace.price,
      count: modelOfferPurchasePlace.count,
      to_customer: modelOfferPurchasePlace.to_customer,
      product_id: modelOfferPurchasePlace.product,
    };
    return instance.post('offers/purchase/place', schemaPurchsePlace);
  }

  async getOfferSale(offerId) {
    console.warn('OFFER.API: getOfferSale');
    return instance.get(`${this.pathSale}/offer/${offerId}`);
  }

  async offerPurchaseAcquire(context) {
    console.warn('MODEL.OFFER: offerPurchaseAcquire');
    const offerId = context.offerId;
    const customer_id = context.customerId;
    return instance.post(
      'offers/purchase/acquire?offer_id=' +
        offerId +
        '&' +
        'customer_id=' +
        customer_id
    );
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

  async getListOffersSale(teamId) {
    console.warn('MODEL.OFFER: getListOffersSale');
    if (!teamId) {
      return instance.get('offers/sale/list');
    } else {
      return instance.get(`offers/sale/list/${teamId}`);
    }
  }

  async offerSalePlace(modelPlaceOffer) {
    console.warn('MODEL.OFFER: offerSalePlace');

    return instance.post('offers/sale/place', modelPlaceOffer);
  }

  async getOffersSaleDone() {
    console.warn('MODEL.OFFER: getOfferSaleDone');
    return instance.get(`offers/sale/list/state/done`);
  }

  async getOfferState(offerId) {
    console.warn('MODEL.OFFER: getOfferState');
    return instance.get('offers/sale/state-offer/' + offerId);
  }

  async getOffersSaleAwaited(teamId) {
    console.warn('OFFER.API: getOffersSaleAwaited');
    return instance.get('offers/sale/list/state/await/' + teamId);
  }
  async offerSaleChangeStateAwait(offerId) {
    return instance.post('offers/sale/offer-to-await?offer_id=' + offerId);
  }

  async offerSaleAcquire(offerId, teamId) {
    console.warn('MODEL.OFFER: offerSaleAcquire');

    return instance.post(
      'offers/sale/acquire?offer_id=' + offerId + '&team_id=' + teamId
    );
  }
}

export default new OfferApi();
