export const shopState = {
  namespaced: true,
  state: {
    load: {
      mainLayout: false,
      offersTab: false,
      offerCard: false,
      longPoll: false,
    },
  },
  actions: {},
  getters: {
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
  },
  mutations: {
    SET_STATE_LOAD_mainLayout: function (state) {
      state.load.mainLayout = true;
    },
    SET_STATE_COMPLETE_mainLayout: function (state) {
      state.load.mainLayout = false;
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
