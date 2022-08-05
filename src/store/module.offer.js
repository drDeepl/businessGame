export const offer = {
  namespaced: true,
  state: {
    // INFO: leanrMore = {offer_id: true/false}
    learnMore: {},
    load: {
      offerPrepare: false,
    },
  },
  actions: {},
  getters: {
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
