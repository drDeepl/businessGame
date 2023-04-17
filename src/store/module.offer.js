import OfferSale from './models/OfferSale';
import OfferPurchase from './models/OfferPurchase';
import {decorateResponseApi} from '@/services/utils.service';
export const offer = {
  namespaced: true,
  state: {
    // INFO: leanrMore = {offer_id: true/false}
    offerSale: false,
    load: {
      offerPrepare: false,
    },
  },
  actions: {
    async offerSalePlace(context, saleOfferProductKit) {
      console.warn('MODULE.OFFER: offerSalePlace');

      const response = await decorateResponseApi(
        OfferSale.api().offerSalePlace,
        saleOfferProductKit
      );
      return response;
    },
    async offerSaleAcquire(context, payload) {
      const response = {status: 200, data: null, message: ''};
      const responseAccountAcquire = await OfferSale.api()
        .offerSaleAcquire(payload.offerId, payload.teamId)
        .catch((resp) => (response.status = resp.status));
      response.data =
        response.status === 200 ? responseAccountAcquire.response.data : null;
      response.message = 'Произошла ошибка во время покупки';
      return response;
    },
    async getOfferState(context, offerId) {
      console.warn('MODULE.OFFER: getOfferState');
      const response = await decorateResponseApi(
        OfferSale.api().getOfferState,
        offerId
      );

      return response;
    },

    async offerSaleChangeStateAwait(context, offerId) {
      console.warn('MODULE.OFFER: offerSaleChangeState');
      const response = await decorateResponseApi(
        OfferSale.api().offerSaleChangeStateAwait,
        offerId
      );
      return response;
    },
    async getOffersPurchase(context) {
      console.warn('MODULE.OFFER: getListOffersPurchase');
      console.log(context);

      const responseWrap = await OfferPurchase.api().getListOfferPurchase();

      const offersPurchase = responseWrap.response.data.items
        ? responseWrap.response.data.items
        : responseWrap.response.data;
      return offersPurchase;
    },
    // NOTE: Что, если создать подобие декоратора для запросов?
    async createOfferPurchase(context, modelOfferPurchase) {
      console.warn('MODULE.OFFER: createOfferPurchase');
      console.log(modelOfferPurchase);
      const response = await decorateResponseApi(
        OfferPurchase.api().offerPurchasePlace,
        modelOfferPurchase
      );

      return response;
    },
    async offerPurchaseAcquire(context, model) {
      // INFO: model = {offerId: int, customer_id: int}
      const response = await decorateResponseApi(
        OfferPurchase.api().offerPurchaseAcquire,
        model
      );
      return response;
    },
  },
  getters: {
    GET_STATE_OFFER_PREPARE: (state) => {
      return state.load.offerPrepare;
    },
    GET_OFFERS: (state) => {
      return state.offers;
    },
  },
  mutations: {
    SET_OFFER_PREPARE: function (state) {
      console.warn('MODULE.OFFER: SET_OFFER_PREPARE');
      state.load.offerPrepare = true;
    },
    SET_OFFER_PREPARE_COMPLETE: function (state) {
      console.warn('MODULE.OFFER: SET_OFFER_PREPARE_COMPLETE');
      state.load.offerPrepare = false;
    },
  },
};
