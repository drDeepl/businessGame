<template>
  <div>
    <div class="player-layout">
      <Load v-if="render.offersContainer || render.page"></Load>
      <div v-else-if="offersAwaited.length > 0" class="cards-container">
        <OfferCard
          class="ma-1"
          v-for="offer in offersAwaited"
          :key="offer.id"
          :title="`${offer.product_kit}`"
          :item="offer"
          :modelItem="model.offerSale"
          :propsItemToShow="['product_kit', 'trader', 'price', '']"
          :isGetNameProductFromProductKit="offer.is_canceled ? false : true"
          :isGetTraderUserName="offer.is_canceled ? false : true"
        >
          <v-btn
            class="btn-apply"
            @click="onClickBuyOffer(offer)"
            :loading="render.buyOffer"
            >Купить</v-btn
          >
        </OfferCard>
        <v-overlay :value="stateAlert.success">
          <Alert title="Готово!" :showAlertSuccess="stateAlert.success">
            <v-btn class="ma-3 mb-2 btn-apply" @click="onClickSuccessApply">
              продолжить
            </v-btn>
          </Alert>
        </v-overlay>
      </div>
      <Empty v-else title="Предложений ещё нет..."></Empty>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import OfferCard from '@/UI/OfferCard.vue';
import Alert from '@/UI/Alert.vue';
import Load from '@/UI/Load.vue';
import Empty from '@/UI/Empty.vue';
import SaleOffer from '@/models/model.offer.sale';
export default {
  components: {OfferCard, Alert, Load, Empty},
  data() {
    return {
      currentUserData: null,
      render: {
        page: true,
        offersContainer: false,
        buyOffer: false,
      },
      model: {
        offerSale: SaleOffer,
      },
      arrays: {
        offersSale: [],
      },
    };
  },

  computed: {
    ...mapGetters({
      stateAlert: 'mainLayout/GET_STATE_ALERT',
    }),
    currentUser() {
      return this.$store.state.auth.user;
    },
    offersAwaitedCount() {
      return this.$store.state.mainLayout.countAwaitedOffers;
    },
    offersAwaited() {
      return this.$store.state.mainLayout.offersAwaitedTeam;
    },
  },

  async created() {
    this.render.page = true;
    if (this.currentUser) {
      const currentUsername = this.currentUser.username;
      console.log(currentUsername);
      const responseUser = await this.$store.dispatch(
        'user/getUserDataByUsername',
        currentUsername
      );
      const currentUserData = responseUser.data;
      this.currentUserData = currentUserData;

      // let offersSale = await this.$store.dispatch(
      //   'offer/getOfferAwaitedSell',
      //   currentUserData.team
      // );

      // console.error('OFFERS ACTIVE');
      // console.log(offersActive);
      // const offersToSell = offersActive.concat(offersSale);
      // console.error(offersToSell);
      // this.arrays.offersSale = offersToSell.reverse();
    } else {
      this.$router.push('/login');
    }

    this.render.page = false;
  },

  methods: {
    async onClickBuyOffer(offerSalePlace) {
      console.warn('PLAYER: onClickBuyOffer');
      this.render.buyOffer = true;
      let offerId = offerSalePlace.id;
      const teamId = offerSalePlace.team;
      const responseOfferSaleAcquire = await this.$store.dispatch(
        'offer/offerSaleAcquire',
        {offerId: offerId, teamId: teamId}
      );
      if (responseOfferSaleAcquire.status == 200) {
        this.$store.commit('mainLayout/SET_STATE_ALERT', 'success');

        this.$store.dispatch('team/updateTeamBalance', teamId);
        const offerSaleCount = this.offersAwaitedCount - 1;
        this.$store.commit(
          'mainLayout/SET_COUNT_AWAITED_OFFERS',
          offerSaleCount
        );
        await this.updateListOffers();
      }

      this.render.buyOffer = false;
    },

    async updateListOffers() {
      console.warn('PLAYER: updateListOffers');
      this.render.offersContainer = true;
      const offersAwaited = await this.$store.dispatch(
        'offer/getOfferAwaitedSell',
        this.currentUserData.team
      );
      const offersSale = offersAwaited;

      this.$store.commit('mainLayout/SET_OFFERS_FOR_TEAM', offersSale);
      this.render.offersContainer = false;
    },

    async onClickSuccessApply() {
      console.warn('PLAYER: onClickSuccessApply');
      await this.updateListOffers();
      this.$store.commit('mainLayout/CLEAR_STATE_ALERT');
    },
  },
};
</script>
