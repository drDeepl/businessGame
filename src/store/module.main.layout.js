export const mainLayout = {
  namespaced: true,
  state: {
    loading: false,
    currentTab: null,
  },
  actions: {},
  getters: {
    GET_CURRENT_TAB: (state) => {
      return state.currentTab;
    },
    LOADING: (state) => {
      return state.loading;
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
  },
};
