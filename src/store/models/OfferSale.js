import {Model} from '@vuex-orm/core';
import TokenService from '@/services/token.service';
import ProductKit from './ProductKit';

export default class OfferSale extends Model {
  static entity = 'offersSale';
  static fields() {
    return {
      id: this.attr(null),
      product_kit: this.attr(null),
      productKit_data: this.belongsTo(ProductKit, 'product_kit'),
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
      async getListOffersSale(teamId) {
        console.warn('MODEL.OFFER: getListOffersSale');
        if (!teamId) {
          return this.get('offers/sale/list');
        } else {
          return this.get(`offers/sale/list/${teamId}`);
        }
      },
      async offerSalePlace(modelPlaceOffer) {
        console.warn('MODEL.OFFER: offerSalePlace');

        return this.post('offers/sale/place', modelPlaceOffer);
      },
      async getOfferState(offerId) {
        console.warn('MODEL.OFFER: getOfferState');
        return this.get('offers/sale/state-offer/' + offerId);
      },

      async getOffersSaleAwaited(teamId) {
        console.warn('OFFER.API: getOffersSaleAwaited');
        return this.get('offers/sale/list/state/await/' + teamId);
      },

      async offerSaleChangeStateAwait(offerId) {
        return this.post('offers/sale/offer-to-await?offer_id=' + offerId);
      },

      async offerSaleAcquire(offerId, teamId) {
        console.warn('MODEL.OFFER: offerSaleAcquire');
        console.log(TokenService.getLocalAccessToken());
        return this.post(
          'offers/sale/acquire?offer_id=' + offerId + '&team_id=' + teamId
        );
      },
    },
  };
}
