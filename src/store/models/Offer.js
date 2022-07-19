import {Model} from '@vuex-orm/core';
import TokenService from '@/services/token.service';

export default class Offer extends Model {
  static entity = 'offers';
  static fields() {
    return {
      id: this.attr(null),
      product_kit: this.attr(null),
      price: this.attr(null),
      trader: this.attr(null),
      timestamp: this.attr(''),
      state: this.attr(''),
    };
  }
  static apiConfig = {
    headers: {
      Authorization: TokenService.getLocalAccessToken(),
    },
    actions: {
      async getListSaleOffers() {
        console.warn('MODEL.OFFER: getListSaleOffers');

        return this.get('offers/sale/list');
      },
      async offerSalePlace(modelPlaceOffer) {
        console.warn('MODEL.OFFER: offerSalePlace');

        return this.post('offers/sale/place', modelPlaceOffer);
      },
      async offerSaleAcquire(modelOfferSaleAcquire) {
        console.warn('MODEL.OFFER: offerSaleAcquire');

        return this.post('offers/sale/place', modelOfferSaleAcquire);
      },
      async getListOfferPurchase() {
        console.warn('MODEL.OFFER: getListOfferPurchase');

        return this.get('offers/purchase/list');
      },
      async offerPurchasePlace(modelOfferPurchasePlace) {
        console.warn('MODEL.OFFER: offerPurchasePlace');

        return this.post('offers/purchase/place', modelOfferPurchasePlace);
      },
      async offerPurchaseAcquire(modelOfferPurchaseAcquire) {
        console.warn('MODEL.OFFER: offerPurchaseAcquire');

        return this.post('offers/purchase/acquir', modelOfferPurchaseAcquire);
      },
    },
  };
}
