<template>
  <div>
    <div class="player-layout">
      <p>
        <span v-if="currentUserData"
          >Привет, {{ currentUserData.username }}
        </span>
        <v-skeleton-loader v-else type="list-item"></v-skeleton-loader>
        <!-- {{ currentUserData }} -->
        <span>сделать показ офферов</span>
      </p>
      <div>
        <OfferCard
          v-for="offer in arrays.offersSale"
          :key="offer.id"
          :title="`${offer.product_kit}`"
          :item="offer"
          :modelItem="model.offerSale"
          :propsItemToShow="['product_kit', 'trader', 'price', '']"
          :isGetNameProduct="true"
        >
          <v-btn class="btn-apply" @click="onClickBuyOffer(offer)"
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
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import OfferCard from '@/UI/OfferCard.vue';
import Alert from '@/UI/Alert.vue';
import SaleOffer from '@/models/model.offer.sale';
export default {
  components: {OfferCard, Alert},
  data() {
    return {
      currentUserData: null,
      render: {
        page: true,
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

      // const responseOffersSale = await this.$store.dispatch(
      //   'offer/getOffersSale',
      //   this.currentUserData.team
      // );
      const responseOffersAwaited = await this.$store.dispatch(
        'offer/getOfferAwaitedSell',
        this.currentUserData.team
      );
      console.log(responseOffersAwaited);
      const offersSale = responseOffersAwaited.data;
      this.arrays.offersSale = offersSale;
    } else {
      this.$router.push('/login');
    }

    this.render.page = false;
  },
  methods: {
    async onClickBuyOffer(offerSalePlace) {
      console.warn('PLAYER: onClickBuyOffer');
      let offerId = offerSalePlace.id;
      const teamId = offerSalePlace.team;
      const responseOfferSaleAcquire = await this.$store.dispatch(
        'offer/offerSaleAcquire',
        {offerId: offerId, teamId: teamId}
      );
      if (responseOfferSaleAcquire.status == 200) {
        this.$store.commit('mainLayout/SET_STATE_ALERT', 'success');
      }
      console.log(responseOfferSaleAcquire);
    },
    onClickSuccessApply() {
      console.warn('PLAYER: onClickSuccessApply');
      this.$store.commit('mainLayout/CLEAR_STATE_ALERT');
    },
  },
};
</script>
