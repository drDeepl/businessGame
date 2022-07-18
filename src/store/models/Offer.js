import {Model} from '@vuex-orm/core';
import {createAuthHeader} from '@/helpers/JWT.helper';

export default class Offer extends Model {
  static entity = 'offers';
  static fields() {
    return {
      id: this.attr(null),
      trader: this.attr(null),
      price: this.attr(null),
      timestamp: this.attr(''),
      state: this.attr(''),
      product_kit: this.attr(null),
    };
  }
  static apiConfig = {
    actions: {
      async getListSaleOffers(jwt) {
        console.warn('MODEL.OFFER: getListSaleOffers');
        const config = createAuthHeader(jwt);
        return this.get('offers/sale/list', config);
      },
      async offerSalePlace(modelPlaceOffer, jwt) {
        console.warn('MODEL.OFFER: offerSalePlace');
        const config = createAuthHeader(jwt);
        this.post('offers/sale/place', modelPlaceOffer, config);
      },
      async offerSaleAcquire(modelOfferSaleAcquire, jwt) {
        console.warn('MODEL.OFFER: offerSaleAcquire');
        const config = createAuthHeader(jwt);
        return this.post('offers/sale/place', modelOfferSaleAcquire, config);
      },
      async getListOfferPurchase(jwt) {
        console.warn('MODEL.OFFER: getListOfferPurchase');
        const config = createAuthHeader(jwt);
        return this.get('offers/purchase/list', config);
      },
      async offerPurchasePlace(modelOfferPurchasePlace, jwt) {
        console.warn('MODEL.OFFER: offerPurchasePlace');
        const config = createAuthHeader(jwt);
        return this.post(
          'offers/purchase/place',
          modelOfferPurchasePlace,
          config
        );
      },
      async offerPurchaseAcquire(modelOfferPurchaseAcquire, jwt) {
        console.warn('MODEL.OFFER: offerPurchaseAcquire');
        const config = createAuthHeader(jwt);
        return this.post(
          'offers/purchase/acquir',
          modelOfferPurchaseAcquire,
          config
        );
      },
    },
  };
}
