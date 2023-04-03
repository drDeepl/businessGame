import OfferSale from './models/OfferSale';
import OfferPurchase from './models/OfferPurchase';
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
      const responseWrap = await OfferSale.api().offerSalePlace(
        saleOfferProductKit
      );
      console.warn(responseWrap);

      return responseWrap.response.data;
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
    async getOffersPurchase(context) {
      console.warn('MODULE.OFFER: getListOffersPurchase');
      console.log(context);
      const responseWrap = await OfferPurchase.api().getListOfferPurchase();

      const offersPurchase = responseWrap.response.data.items
        ? responseWrap.response.data.items
        : responseWrap.response.data;
      return offersPurchase;
    },
    async createOfferPurchase(context, modelOfferPurchase) {
      console.warn('MODULE.OFFER: createOfferPurchase');
      console.log(modelOfferPurchase);
      let requestData = Object.assign({}, modelOfferPurchase);
      const responseWrap = await OfferPurchase.api().offerPurchasePlace(
        requestData
      );
      context.commit('SET_offerSale_COMPLETE');
      return responseWrap.response.data;
    },
    async offerPurchaseAcquire(context, offer_id) {
      const responseWrap = await OfferPurchase.api().offerPurchaseAcquire(
        offer_id
      );

      return responseWrap;
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
