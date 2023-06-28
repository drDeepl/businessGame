<template>
  <div>
    <v-simple-table>
      <thead>
        <tr>
          <th v-for="label in fieldToShow" :key="'th' + label">
            {{ modelOffer[label] }}
          </th>
        </tr>
      </thead>
      <tbody v-if="offers.length > 0">
        <!-- <tr v-for="offer in offers" :key="offer.id">
          <td v-for="fieldOffer in fieldToShow" :key="fieldOffer">
            <span>{{ offer[fieldOffer] }}</span>
          </td>
        </tr>
      </tbody> -->
        <slot></slot></tbody
    ></v-simple-table>
  </div>
</template>

<script>
export default {
  props: {
    offers: {type: Array, required: true},
    modelOffer: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    fieldToShow: {type: Array, required: true},
    isOfferToSellProductKit: {type: Boolean, required: false},
    toPage: {type: Function, required: false},
  },

  data() {
    return {
      render: {row: false},
    };
  },
  methods: {},
};
</script>
