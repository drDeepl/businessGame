export const shopState = {
  namespaced: true,
  state: {
    created: false,
    buyOffer: {
      RUNNING: false,
      ERROR: false,
      COMPLETE: false,
    },
    load: {
      mainLayout: false,
      offersTab: false,
      offerCard: false,
      longPoll: false,
      offersUpdate: false,
      prepareOffer: false,
    },
  },
  actions: {},
  getters: {
    GET_buyOffer_STATE_RUNNING: (state) => {
      return state.buyOffer.RUNNING;
    },
    GET_buyOffer_STATE_COMPLETE: (state) => {
      return state.buyOffer.COMPLETE;
    },
    GET_buyOffer_STATE_ERROR: (state) => {
      return state.buyOffer.ERROR;
    },
    GET_STATE_CREATED: (state) => {
      return state.created;
    },
    GET_STATE_PRODUCT: (state) => {
      return state.load.product;
    },
    GET_STATE_mainLayout: (state) => {
      return state.load.mainLayout;
    },
    GET_STATE_offersTab: (state) => {
      return state.load.offersTab;
    },
    GET_STATE_LONG_POLL: (state) => {
      return state.load.longPoll;
    },
    GET_prepareOffer_STATE: (state) => {
      return state.load.prepareOffer;
    },
    GET_OFFERS_UPDATE: (state) => {
      return state.load.offersUpdate;
    },
  },
  mutations: {
    SET_buyOffer_STATE: function (state, nameState) {
      console.warn('MODULE.SHOP.STATE');
      state.buyOffer[nameState] = true;
    },
    SET_buyOffer_STATE_COMPLETE: function (state, nameState) {
      console.warn('MODULE.SHOP.STATE');
      state.buyOffer[nameState] = false;
    },

    SET_STATE_CREATED: function (state) {
      state.created = true;
    },
    SET_STATE_CREATED_COMPLETE: function (state) {
      state.created = false;
    },

    SET_STATE_LOAD_mainLayout: function (state) {
      state.load.mainLayout = true;
    },
    SET_STATE_COMPLETE_mainLayout: function (state) {
      state.load.mainLayout = false;
    },
    SET_OFFER_PREPARE: function (state) {
      state.load.prepareOffer = true;
    },
    SET_OFFER_PREPARE_COMPLETE: function (state) {
      state.load.prepareOffer = false;
    },
    SET_OFFERS_UPDATE: function (state) {
      state.load.offersUpdate = true;
    },
    SET_OFFERS_UPDATED: function (state) {
      state.load.offersUpdate = false;
    },
    CHANGE_STATE_offersTab: function (state) {
      console.warn('MODULE.shop.state: CHANGE_STATE_offersTab');
      state.load.offersTab = !state.load.offersTab;
    },
    SET_LONG_POLL: function (state) {
      console.warn('MODULE.shop.state: SET_LONG_POLL');
      state.load.longPoll = true;
    },
    STOP_LONG_POLL: function (state) {
      console.warn('MODULE.shop.state: SET_LONG_POLL');
      state.load.longPoll = false;
    },
  },
};
