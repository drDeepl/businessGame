export const profile = {
  namespaced: true,
  state: {offersPurchase: []},
  actions: {},
  getters: {
    GET_OFFERS_PURCHASE: (state) => {
      return state.offersPurchase;
    },
  },
  mutations: {
    ADD_OFFER_PURCHASE: function (state, offer) {
      state.offersPurchase.push(offer);
    },
  },
};
