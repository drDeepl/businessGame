export const mainLayout = {
  namespaced: true,
  state: {
    loading: false,
    currentTab: null,
    alert: {
      currentState: null,
      success: false,
      info: false,
      error: false,
      message: '',
    },
    countAwaitedOffers: 0,
    offersAwaitedTeam: [],
  },
  actions: {},
  getters: {
    GET_CURRENT_TAB: (state) => {
      return state.currentTab;
    },
    LOADING: (state) => {
      return state.loading;
    },
    GET_STATE_ALERT: (state) => {
      return state.alert;
    },
  },
  mutations: {
    SET_CURRENT_TAB: function (state, nameTab) {
      state.currentTab = nameTab.toUpperCase();
    },
    SET_STATE_LOADING: function (state) {
      state.loading = false;
    },
    SET_STATE_LOADING_COMPLETE: function (state) {
      state.loading = true;
    },
    SET_STATE_ALERT: function (state, stateAlert, message) {
      state.alert.currentState = stateAlert;
      state.alert[stateAlert] = true;
      state.alert.message = message;
    },
    CLEAR_STATE_ALERT: function (state) {
      const currentState = state.alert.currentState;
      state.alert[currentState] = false;
      state.message = '';
    },
    SET_COUNT_AWAITED_OFFERS(state, count) {
      state.countAwaitedOffers = count;
    },
    SET_OFFERS_FOR_TEAM(state, offers) {
      console.error(offers);
      state.offersAwaitedTeam = offers.reverse();
    },
    SET_OFFER_FOR_TEAM(state, offer) {
      state.offersAwaitedTeam.unshift(offer);
    },
  },
};
