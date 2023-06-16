<template>
  <div class="customer-page-wrapper layout-showcase">
    <Load v-if="render.main"></Load>
    <div v-else>
      <v-card-title>{{ currentUserData }}</v-card-title>
      <v-dialog
        v-if="alert.newOfferSale.active"
        :value="alert.newOfferSale.active"
        persistent
        max-width="20em"
      >
        <OfferCard
          :item="alert.newOfferSale.offer"
          :modelItem="model.offerSale"
          :propsItemToShow="
            Object.keys(model.offerSale.props).filter(
              (item) => !model.offerSale.hideShow[item]
            )
          "
          :isSucces="alert.success.active"
          :successApply="onClickNewOfferCancel"
        >
          <v-btn
            class="btn-apply"
            @click="onClickNewOfferApply"
            :loading="alert.load.newOffer"
          >
            Принять
          </v-btn>

          <v-btn
            class="btn-cancel"
            @click="
              () => {
                newOfferSaleToAwait(alert.newOfferSale.offer.id);
                onClickNewOfferCancel();
              }
            "
            :disabled="alert.load.newOffer"
          >
            Отклонить
          </v-btn>
        </OfferCard>
      </v-dialog>
      <DialogError
        v-if="alert.error.active"
        :title="alert.error.message"
        :active="alert.error.active"
      >
        <v-btn @click.prevent="onClickErrorClose" text>закрыть</v-btn>
      </DialogError>
    </div>
  </div>
</template>

<script>
import Load from '@/UI/Load.vue';
import OfferApi from '@/api/offer.api';
import SaleOffer from '@/models/model.offer.sale';

export default {
  components: {Load},

  data() {
    return {
      connection: new WebSocket('ws://localhost:8000/ws/'),
      currentUserData: null,
      alert: {
        newOfferSale: {
          active: false,
          offer: null,
        },
        newOfferPurchase: {
          active: false,
          offer: null,
        },

        success: {active: false, message: null},
        error: {active: false, message: null},
        load: {newOffer: false, success: false, error: false},
      },
      model: {
        offerSale: SaleOffer,
      },
      arrays: {
        purchaseOffers: [],
      },
      render: {main: false},
    };
  },
  watch: {
    async 'alert.newOfferSale.offer'(offer) {
      // FIX: Добавить в оффер название продукта
      console.log('NEW OFFER SALE: ', offer);
      if (offer) {
        const response = await this.$store.dispatch(
          'productKit/getProductFromProductKit',
          offer.product_kit
        );
        const trader = await this.$store.dispatch('user/getUser', offer.trader);

        if (response.error) {
          this.alert.error.active = true;
          this.alert.error.message = response.message;
        } else {
          const product = response.data;
          this.alert.newOfferSale.offer.product_kit = product.name;
          this.alert.newOfferSale.offer.trader = trader.username;
          this.alert.newOfferSale.active = true;
          console.log('PRODUCT', product);
        }
      }
    },
  },
  async created() {
    this.render.main = true;
    const username = this.currentUser.username;
    const responseUser = await this.$store.dispatch(
      'user/getUserDataByUsername',
      username
    );

    const dataUser = responseUser.data;
    this.currentUserData = dataUser;
    this.connection.onmessage = () => {
      OfferApi.offersPurchase().then((response) => {
        console.log('OFFERS SALE CUSTOMER\n', response.data);
        const currentCustomer = this.currentUserData.id;
        const offer = response.data.at(-1);
        const offerToTeam = offer.team;

        if (currentCustomer === offerToTeam) {
          console.log(
            `OFFER TO TEAM: ${offerToTeam}\nCURRENT USER TEAM: ${currentCustomer}`
          );

          this.alert.newOfferSale.offer = offer;
        }
      });
    };
    this.render.main = false;
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {},
};
</script>
