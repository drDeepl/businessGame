import OfferApi from '@/api/offer.api';
import {decorateResponseApi, apiDecorator} from '@/services/utils.service';

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
    async getOfferPurchase(context, offerId) {
      console.warn('MODULE.OFFER: getOfferPurchase');
      const response = await apiDecorator(OfferApi.getOfferPurchase, offerId);
      return response.status === 200 ? response.data : null;
    },
    async getOffersSale(context, teamId) {
      console.warn('MODULE.OFFER: getOffers');

      const response = await apiDecorator(OfferApi.getListOffersSale, teamId);
      return response;
    },

    async getOfferAwaitedSell(context, teamId) {
      console.warn('MODULE.OFFER: getOffersSaleAwaited');

      const response = await apiDecorator(
        OfferApi.getOffersSaleAwaited,
        teamId
      );
      return response;
    },
    async getSaleOffersDone() {
      console.warn('MODULE.OFFER: getOfferSaleDone');
      const responseSaleOffersDone = await OfferApi.getOffersSaleDone();

      if (responseSaleOffersDone.status == 200) {
        return responseSaleOffersDone.data;
      } else {
        return [];
      }
    },

    async offerSalePlace(context, saleOfferProductKit) {
      const response = await apiDecorator(
        OfferApi.offerSalePlace,
        saleOfferProductKit
      );
      return response;
    },
    async offerSaleAcquire(context, payload) {
      const response = {status: 200, data: null, message: ''};
      const responseAccountAcquire = await OfferApi.offerSaleAcquire(
        payload.offerId,
        payload.teamId
      ).catch((resp) => (response.status = resp.status));
      response.data =
        response.status === 200 ? responseAccountAcquire.data : null;
      response.message = 'Произошла ошибка во время покупки';
      return response;
    },
    async getOfferState(context, offerId) {
      console.warn('MODULE.OFFER: getOfferState');
      // const response = await decorateResponseApi(
      //   OfferSale.api().getOfferState,
      //   offerId
      // );

      const response = await apiDecorator(OfferApi.getOfferState, offerId);

      return response;
    },

    async offerSaleChangeStateAwait(context, offerId) {
      console.warn('MODULE.OFFER: offerSaleChangeState');
      // const response = await decorateResponseApi(
      //   OfferSale.api().offerSaleChangeStateAwait,
      //   offerId
      // );
      const response = await decorateResponseApi(
        OfferApi.offerSaleChangeStateAwait,
        offerId
      );
      return response;
    },
    async getOffersPurchase(context) {
      console.warn('MODULE.OFFER: getListOffersPurchase');
      console.log(context);

      const response = await apiDecorator(OfferApi.getListOfferPurchase);

      const offersPurchase = response.data.items
        ? response.data.items
        : response.data;
      return offersPurchase;
    },
    async getPurchaseOffersDone() {
      console.warn('MODULE.OFFER: getPurchaseOffersDone');

      const responsePurchaseOffer = await OfferApi.getOffersPurchaseDone();

      return responsePurchaseOffer.status === 200
        ? responsePurchaseOffer.data
        : [];
    },
    async getOffersPurchaseAwaited(context, customerId) {
      console.warn('MODULE.OFFER: getOffersPurchaseAwaited');
      const responseOffersPurchaseAwaited =
        await OfferApi.offersPurchaseAwaited(customerId);
      if (responseOffersPurchaseAwaited.status == 200) {
        return responseOffersPurchaseAwaited.data;
      } else {
        return [];
      }
    },

    // NOTE: Что, если создать подобие декоратора для запросов?
    async createOfferPurchase(context, modelOfferPurchase) {
      console.warn('MODULE.OFFER: createOfferPurchase');
      console.log(modelOfferPurchase);
      const response = await apiDecorator(
        OfferApi.offerPurchasePlace,
        modelOfferPurchase
      );

      return response;
    },
    async offerPurchaseAcquire(context, model) {
      // INFO: model = {offerId: int, customer_id: int}

      const response = await decorateResponseApi(
        OfferApi.offerPurchaseAcquire,
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
