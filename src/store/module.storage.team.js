import ProductKitStorage from '@/store/models/ProductKitStorage';
export const storageTeam = {
  namespaced: true,
  state: {
    prepareProduct: {
      progress: 0,
      prepare: false,
      time: 0,
    },
    getProducts: {
      RUN: false,
      ERROR: false,
    },
    getProductKits: {
      RUN: false,
      ERROR: false,
    },
  },
  actions: {
    async prepareProduct(context, time) {
      console.warn('MODULE.STORAGE.TEAM');
      // console.warn(time);
      const intervalTime = 1;
      const intervalTimeToPercent = (100 * intervalTime) / time;
      context.commit('SET_PREPARE_PRODUCT_TIME', time);
      let prepare = setInterval(() => {
        context.commit('SET_PREPARE_PRODUCT_PROGRESS', intervalTimeToPercent);
        const timeToEnd = context.getters.GET_prepareProduct_TIME;
        context.commit('SET_PREPARE_PRODUCT_TIME', timeToEnd - intervalTime);
      }, intervalTime * 1000);
      setTimeout(() => {
        clearInterval(prepare);
        context.commit('SET_PREPARE_PRODUCT_COMPLETE');
        context.commit('SET_PREPARE_PRODUCT_CLEAR_PROGRESS');
      }, time * 1000);
    },
    async getTeamProductKits(context, teamId) {
      const responseWrap = await ProductKitStorage.api().getListProductKits(
        teamId
      );

      if (responseWrap.response.status == 200) {
        return responseWrap.response.data;
      } else {
        context.commit('SET_GET_PRODUCTS_KIT_TEAM_ERROR');
        return [];
      }
    },
    async getTeamProducts(context, teamId) {
      const responseWrap = await ProductKitStorage.api().getListProducts(
        teamId
      );

      if (responseWrap.response.status == 200) {
        return responseWrap.response.data;
      } else {
        // TODO: добавить состояние ошибки для списка продуктов
        console.warn(context);
        // context.commit('SET_GET_PRODUCTS_KIT_TEAM_ERROR');
        return [];
      }
    },
    async checkCreatedProductKits(context, teamId) {
      await ProductKitStorage.api().checkCreatedProductKits(teamId);
    },
  },
  getters: {
    GET_STATE_TEAM_PRODUCTS_KIT_RUN: (state) => {
      return state.getProductKits.RUN;
    },
    GET_STATE_TEAM_PRODUCTS_KIT_ERROR: (state) => {
      return state.getProductKits.ERROR;
    },
    GET_STATE_PREPARE_PRODUCT: (state) => {
      return state.prepareProduct.prepare;
    },
    GET_prepareProduct_PROGRESS: (state) => {
      return state.prepareProduct.progress;
    },
    GET_prepareProduct_TIME: (state) => {
      return state.prepareProduct.time;
    },
  },
  mutations: {
    SET_GET_PRODUCTS_KIT_TEAM_RUN: function (state) {
      state.getProductKits.RUN = true;
    },
    SET_GET_PRODUCTS_KIT_TEAM_ERROR: function (state) {
      state.getProductKits.RUN = false;
      state.getProductKits.ERROR = true;
    },
    SET_GET_PRODUCTS_KIT_TEAM_RUN_COMPLETE: function (state) {
      state.getProductKits.ERROR = false;
      state.getProductKits.RUN = false;
    },
    SET_PREPARE_PRODUCT: function (state) {
      console.warn('MODULE.STORAGE.TEAM: set_create_product');
      state.prepareProduct.prepare = true;
    },
    SET_PREPARE_PRODUCT_COMPLETE: function (state) {
      console.warn('MODULE.STORAGE.TEAM: set_create_product_complete');
      state.prepareProduct.prepare = false;
    },
    SET_PREPARE_PRODUCT_PROGRESS: function (state, progress) {
      console.warn('MODULE.STORAGE.TEAM: SET_PREPARE_PRODUCT_PROGRESS');
      state.prepareProduct.progress += progress;
    },
    SET_PREPARE_PRODUCT_CLEAR_PROGRESS: function (state) {
      state.prepareProduct.progress = 0;
    },
    SET_PREPARE_PRODUCT_TIME: function (state, time) {
      state.prepareProduct.time = time;
    },
  },
};
