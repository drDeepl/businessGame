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

        const schemaPurchsePlace = {
          price: modelOfferPurchasePlace.price,
          count: modelOfferPurchasePlace.count,
          to_customer: modelOfferPurchasePlace.to_customer,
          product_id: modelOfferPurchasePlace.product,
        };
        return this.post('offers/purchase/place', schemaPurchsePlace);
      },
      async offerPurchaseAcquire(context) {
        console.warn('MODEL.OFFER: offerPurchaseAcquire');
        const offerId = context.offerId;
        const customer_id = context.customerId;
        return this.post(
          'offers/purchase/acquire?offer_id=' +
            offerId +
            '&' +
            'customer_id=' +
            customer_id
        );
      },
    },
  };
}
