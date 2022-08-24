export const storageTeam = {
  namespaced: true,
  state: {
    prepareProduct: {
      progress: 0,
      prepare: false,
      time: 0,
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

      // const changeProgress = new Promise((resolve, reject) => {
      //   try {
      //     let progressPrepare =
      //       context.getters.GET_prepareProduct_PROGRESS == 100;
      //     while (progressPrepare != 100) {
      //       context.commit('SET_PREPARE_PRODUCT_PROGRESS', 10);
      //     }
      //     resolve(context.commit('SET_CREATE_PRODUCT_COMPLETE'));
      //   } catch (e) {
      //     reject(e);
      //   }
      // });

      // queueMicrotask(() => {});
    },
  },
  getters: {
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
