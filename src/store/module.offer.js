import Offer from './models/Offer';
export const offer = {
  namespaced: true,
  state: {
    // INFO: leanrMore = {offer_id: true/false}
    learnMore: {},
    offerSale: false,
    load: {
      offerPrepare: false,
    },
  },
  actions: {
    async offerSalePlace(context, saleOfferProductKit) {
      console.warn('MODULE.OFFER: offerSalePlace');
      const responseWrap = await Offer.api().offerSalePlace(
        saleOfferProductKit
      );
      console.warn(responseWrap);
      context.commit('SET_offerSale_COMPLETE');
    },
  },
  getters: {
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
  },
};
