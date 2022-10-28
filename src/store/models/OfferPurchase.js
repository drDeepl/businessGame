import {Model} from '@vuex-orm/core';
import TokenService from '@/services/token.service';

export default class OfferPurchase extends Model {
  static entity = 'offersPurchase';
  static fields() {
    return {
      id: this.attr(null),
      product: this.attr(null),
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
      async getListOfferPurchase() {
        console.warn('MODEL.OFFER: getListOfferPurchase');

        return this.get('offers/purchase/list');
      },
      async offerPurchasePlace(modelOfferPurchasePlace) {
        console.warn('MODEL.OFFER: offerPurchasePlace');
        console.log(modelOfferPurchasePlace);
        return this.post('offers/purchase/place', modelOfferPurchasePlace);
      },
      async offerPurchaseAcquire(offerId) {
        console.warn('MODEL.OFFER: offerPurchaseAcquire');

        return this.post('offers/purchase/acquire?offer_id=' + offerId);
      },
    },
  };
}
