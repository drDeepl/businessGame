export const admin = {
  namespaced: true,
  state: {
    renderPage: true,
    forms: {
      createUser: {
        textFieldTeam: false,
      },
    },
  },
  actions: {},
  getters: {
    GET_RENDER_PAGE: (state) => {
      return state.renderPage;
    },
    GET_textFieldTeam: (state) => {
      console.warn('MODULE.ADMIN: gGET_textFieldTeam');
      return state.forms.createUser.textFieldTeam;
    },
  },
  mutations: {
    SET_textFieldTeam: function (state) {
      console.warn('MODULE.ADMIN: SET_textFieldTeam');
      state.forms.createUser.textFieldTeam = true;
    },
    SET_textFieldTeam_COMPLETE: function (state) {
      console.warn('MODULE.ADMIN: SET_textFieldTeam_COMPLETE');
      state.forms.createUser.textFieldTeam = false;
    },
    SET_RENDER_PAGE_START: function (state) {
      state.renderPage = true;
    },
    SET_RENDER_PAGE_COMPLETE: function (state) {
      state.renderPage = false;
    },
  },
};
