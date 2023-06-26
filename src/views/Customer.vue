<template>
  <div class="md-body">
    <div>
      <v-card-title class="d-flex justify-center">
        <v-skeleton-loader
          v-if="render.main"
          type="text"
          class="loader-text-layout"
        ></v-skeleton-loader>
        <span v-else>Привет, {{ currentUserData.username }}</span>
      </v-card-title>
      <div v-if="!render.main" class="pforile-content cards-container">
        <div
          class="ma-1"
          v-for="offerPurchase in arrays.offersPurchase"
          :key="offerPurchase.id"
        >
          <OfferCard
            :item="offerPurchase"
            :modelItem="offerPurchaseModel.model"
            :propsItemToShow="['product', 'trader', 'price']"
            :isGetProductName="true"
            :isGetTraderUserName="true"
          >
            <v-btn
              class="btn-apply"
              @click="onClickBuyOfferPurchase(offerPurchase)"
            >
              Принять
            </v-btn>
          </OfferCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import OfferApi from '@/api/offer.api';
import {mapGetters} from 'vuex';
import OfferApi from '@/api/offer.api';
import OfferCard from '@/UI/OfferCard.vue';
import PurchaseOffer from '@/models/model.offer.purchase';
export default {
  components: {OfferCard},
  data() {
    return {
      render: {main: false, buyOfferPurchase: false},
      currentUserData: null,
      connection: new WebSocket('ws://localhost:8000/ws/'),
      offerPurchaseModel: {
        model: PurchaseOffer,
      },
      arrays: {
        offersPurchase: [],
      },
    };
  },

  async created() {
    this.render.main = true;

    if (this.currentUser) {
      const responseUser = await this.$store.dispatch(
        'user/getUserDataByUsername',
        this.currentUser.username
      );
      const currentUserData = responseUser.data;
      this.currentUserData = currentUserData;
      if (currentUserData.role == 'CUSTOMER') {
        console.log('USER IS CUSTOMER');
        const offersPurchaseAwaited = await this.$store.dispatch(
          'offer/getOffersPurchaseAwaited',
          currentUserData.id
        );
        console.error(offersPurchaseAwaited);
        this.arrays.offersPurchase = offersPurchaseAwaited;
        this.connection.onmessage = () => {
          OfferApi.offersPurchase().then((response) => {
            console.log('PROFILE: OFFERS PURCHASE\n', response.data);
            const currentOfferPurchase = response.data.at(-1);
            const offerId = currentOfferPurchase.id;
            OfferApi.offerPurchaseSetAwait(offerId).then(
              (responseOfferAwaited) => {
                console.error('CHANGE STATE OFFER');
                this.arrays.offersPurchase.push(responseOfferAwaited.data);
              }
            );
          });
        };
      }
    } else {
      this.$router.push('/');
    }
    this.render.main = false;
  },
  computed: {
    ...mapGetters({
      offersPurchase: 'profile/GET_OFFERS_PURCHASE',
    }),

    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    async onClickBuyOfferPurchase(offerPurchase) {
      console.log('onClickBuyOfferPurchase');
      console.error('OFFER', offerPurchase);
      this.render.buyOfferPurchase = true;
      const responseModel = {
        offerId: offerPurchase.id,
        customerId: offerPurchase.to_customer,
      };
      const responseOfferPurchase = await this.$store.dispatch(
        'offer/offerPurchaseAcquire',
        responseModel
      );
      console.error('OFFER PURCHASE', responseOfferPurchase);
    },
  },
};
</script>
