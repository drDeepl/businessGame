import OfferSale from './models/OfferSale';
import OfferPurchase from './models/OfferPurchase';
export const offer = {
  namespaced: true,
  state: {
    // INFO: leanrMore = {offer_id: true/false}
    learnMore: {},
    offerSale: false,
    offersListUpdate: false,
    load: {
      offerPrepare: false,
    },
    offerAcquire: {
      error: false,
      complete: false,
      run: false,
    },
  },
  actions: {
    async getOffersSale(context) {
      console.warn('MODULE.OFFER: getOffers');
      const responseWrap = await OfferSale.api().getListOffersSale();
      context.commit('SET_OFFERS_LIST_UPDATE_COMPLETE');
      const offers = responseWrap.response.data.items
        ? responseWrap.response.data.items
        : responseWrap.response.data;
      return offers;
    },
    async offerSalePlace(context, saleOfferProductKit) {
      console.warn('MODULE.OFFER: offerSalePlace');
      const responseWrap = await OfferSale.api().offerSalePlace(
        saleOfferProductKit
      );
      console.warn(responseWrap);
      context.commit('SET_offerSale_COMPLETE');

      return responseWrap.response.data;
    },
    async offerSaleAcquire(context, payload) {
      const responseAccountAcquire = await OfferSale.api().offerSaleAcquire(
        payload.offerId,
        payload.teamId
      );
      context.commit('SET_OFFER_ACQUIRE_COMPLETE');
      return responseAccountAcquire.response;
    },
    async getOffersPurchase(context) {
      context.commit('SET_GET_OFFERS_PURCHASE');
      console.warn('MODULE.OFFER: getListOffersPurchase');
      const responseWrap = await OfferPurchase.api().getListOfferPurchase();
      context.commit('SET_GET_OFFERS_PURCHASE_COMPLETE');
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
      context.commit('SET_OFFER_ACQUIRE_COMPLETE');
      return responseWrap;
    },
  },
  getters: {
    GET_OFFER_ACQUIRE_COMPLETE: (state) => {
      return state.offerAcquire.complete;
    },
    GET_OFFER_ACQUIRE_RUN: (state) => {
      return state.offerAcquire.run;
    },
    GET_OFFER_ACQUIRE_ERROR: (state) => {
      state.offerAcquire.error;
    },
    GET_STATE_getOffersPurchase: (state) => {
      return state.getOffersPurchase;
    },
    GET_OFFERS_LIST_UPDATE: (state) => {
      return state.offersListUpdate;
    },
    GET_offerSale: (state) => {
      console.warn('MODULE.OFFER: GET_offerSale');
      return state.offerSale;
    },
    GET_STATE_learnMore: (state) => (offer_id) => {
      console.warn('MODULE.offer: GET_STATE_learnMore');
      const learnMore = state.learnMore;
      return learnMore[offer_id] ? learnMore[offer_id] : false;
    },
    GET_STATES: (state) => {
      return state.learnMore;
    },
    GET_STATE_OFFER_PREPARE: (state) => {
      return state.load.offerPrepare;
    },
  },
  mutations: {
    SET_OFFERS_LIST_UPDATE: function (state) {
      state.offersListUpdate = true;
    },
    SET_OFFERS_LIST_UPDATE_COMPLETE: function (state) {
      state.offersListUpdate = false;
    },
    SET_GET_OFFERS_PURCHASE: function (state) {
      state.getOffersPurchase = true;
    },
    SET_GET_OFFERS_PURCHASE_COMPLETE: function (state) {
      state.getOffersPurchase = false;
    },
    SET_offerSale: function (state) {
      console.warn('MODULE.OFFER: SET_offerSale');
      state.offerSale = true;
    },
    SET_offerSale_COMPLETE: function (state) {
      console.warn('MODULE.OFFER: SET_offerSale_COMPLETE');
      state.offerSale = false;
    },
    SET_OPEN_learnMore: function (state, offer_id) {
      console.warn('MODULE.offer: SET_OPEN_learnMORE');
      state.learnMore[offer_id] = true;
    },
    SET_CLOSE_learnMore: function (state, offer_id) {
      console.warn('MODULE.offer: SET_CLOSE_learnMore');
      state.learnMore[offer_id] = false;
    },
    SET_OFFER_PREPARE: function (state) {
      console.warn('MODULE.OFFER: SET_OFFER_PREPARE');
      state.load.offerPrepare = true;
    },
    SET_OFFER_PREPARE_COMPLETE: function (state) {
      console.warn('MODULE.OFFER: SET_OFFER_PREPARE_COMPLETE');
      state.load.offerPrepare = false;
    },
    SET_OFFER_ACQUIRE: function (state) {
      console.warn('MODULE.OFFER: SET_OFFER_ACQUIRE_COMPLETE');
      state.offerAcquire.run = true;
    },
    SET_OFFER_ACQUIRE_COMPLETE: function (state) {
      console.warn('MODULE.OFFER: SET_OFFER_ACQUIRE_COMPLETE');
      state.offerAcquire.run = false;
      state.offerAcquire.complete = true;
    },
    SET_OFFER_ACQUIRE_ERROR: function (state) {
      state.offerAcquire.run = false;
      state.offerAcquire.error = true;
    },
    CLEAR_OFFER_ACQUIRE_ERROR: function (state) {
      state.offerAcquire.error = false;
    },
    CLEAR_STATES_OFFER_AQUIRE: function (state) {
      for (let key in Object.keys(state.offerAcquire)) {
        state.offerAcquire[key] = false;
      }
    },
  },
};
