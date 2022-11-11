export const admin = {
  namespaced: true,
  state: {
    renderPage: true,
    forms: {
      createUser: {
        textFieldTeam: false,
      },
    },
    deleteUser: {
      active: false,
      dataUser: null,
      inProgress: false,
      error: {
        active: false,
      },
    },
    deleteAllUsers: {
      active: false,
      error: {
        active: false,
      },
    },
  },

  actions: {},
  getters: {
    GET_DELETE_USER: (state) => {
      return state.deleteUser.active;
    },
    GET_DELETE_USER_dataUser: (state) => {
      return state.deleteUser.dataUser;
    },
    GET_DELETE_USER_inProgress: (state) => {
      return state.deleteUser.inProgress;
    },
    GET_DELETE_USER_error: (state) => {
      return state.deleteUser.error.active;
    },
    GET_DELETE_ALL_USERS: (state) => {
      return state.deleteAllUsers.active;
    },
    GET_DELETE_ALL_USERS_ERROR: (state) => {
      return state.deleteAllUsers.error.active;
    },
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

    /**
     * @param {Object} state
     * @param {Boolean} flag
     */

    SET_DELETE_USER_ACTIVE: function (state, flag) {
      state.deleteUser.active = flag;
    },
    SET_DELETE_USER_DATA: function (state, flag) {
      state.deleteUser.dataUser = flag;
    },
    SET_DELETE_USER_inProgress: function (state, flag) {
      state.deleteUser.inProgress = flag;
    },
    SET_DELETE_USER_error: function (state, flag) {
      state.deleteUser.error.active = flag;
    },
    SET_DELETE_ALL_USERS: function (state, flag) {
      state.deleteAllUsers.active = flag;
    },
    SET_DELETE_ALL_USERS_ERROR: function (state, flag) {
      state.deleteAllUsers.error.active = flag;
    },
  },
};
