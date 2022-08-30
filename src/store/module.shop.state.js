export const shopState = {
  namespaced: true,
  state: {
    created: false,

    buyOffer: {
      RUNNING: false,
      ERROR: false,
      COMPLETE: false,
    },
    longPoll: null,
    offersUpdate: {
      RUNNING: false,
      COMPLETE: false,
      ERROR: false,
    },
    load: {
      mainLayout: false,
      offersTab: false,
      offerCard: false,

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
    GET_LONG_POLL_ID: (state) => {
      return state.longPoll;
    },
    GET_prepareOffer_STATE: (state) => {
      return state.load.prepareOffer;
    },
    GET_OFFERS_UPDATE_RUNNING: (state) => {
      return state.offersUpdate.RUNNING;
    },
    GET_OFFERS_UPDATE_COMPLETE: (state) => {
      return state.offersUpdate.COMPLETE;
    },
    GET_OFFERS_UPDATE_ERROR: (state) => {
      return state.offersUpdate.ERROR;
    },
    GET_OFFERS_UPDATED: state =>{
      return state.offers.Update.COMPLETE
    }
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
    SET_OFFERS_UPDATE_RUNNING: function (state) {
      state.offersUpdate.RUNNING = true;
    },
    SET_OFFERS_UPDATE_ERROR: function (state) {
      state.offersUpdate.RUNNING = false;
      state.offersUpdate.ERROR = true;
    },
    SET_OFFERS_UPDATE_COMPLETE: function (state) {
      state.offersUpdate.ERROR = false;
      state.offersUpdate.RUNNING = false;
      state.offersUpdate.COMPLETE = true;
    },

    SET_OFFERS_UPDATED: function (state) {
      state.offersUpdate.COMPLETE = false;
    },
    CHANGE_STATE_offersTab: function (state) {
      console.warn('MODULE.shop.state: CHANGE_STATE_offersTab');
      state.load.offersTab = !state.load.offersTab;
    },
    SET_LONG_POLL_ID: function (state, longPollId) {
      console.warn('MODULE.shop.state: SET_LONG_POLL');
      state.longPoll = longPollId;
    },
  },
};
