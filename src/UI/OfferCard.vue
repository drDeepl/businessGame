<template>
  <div class="card-main-layout">
    <v-expand-transition>
      <Alert v-if="isSucces" :showAlertSuccess="isSucces" title="Готово!">
        <!-- default messageSuccess = false -->
        <v-btn class="mt-3 mb-2 btn-apply" @click="successApply">
          продолжить</v-btn
        >
      </Alert>

      <v-sheet v-else class="card-main-layout">
        <v-card-text
          class="text-h6 text-center pa-2 card-border-top-color-purple"
        >
          <span class="title-text">Предложение о покупке</span>
          <span>
            <!-- { "id": 10, "trader": 3, "team": 1, "price": "2.00", "timestamp":
          "2023-03-31T02:21:53.375Z", "state": "Active", "product_kit": 21 } -->
          </span>
        </v-card-text>
        <v-divider></v-divider>
        <div class="offer-card-content">
          <div
            v-for="(prop, id) in propsItemToShow"
            :key="prop"
            :class="`offer-sale ${id == 0 ? 'head' : 'main'}`"
          >
            <small class="offer-sale-row-label">
              {{ modelItem.props[prop] }}
            </small>
            <span class="offer-sale-row-text">
              {{ item[prop] }}
            </span>
          </div>
        </div>
        <v-divider class="mt-3"></v-divider>
        <v-card-actions class="justify-center">
          <slot></slot>
        </v-card-actions>
      </v-sheet>
    </v-expand-transition>
  </div>
</template>

<script>
import Alert from '@/UI/Alert.vue';
export default {
  components: {Alert},
  props: {
    title: {
      type: String,
      default() {
        return '';
      },
    },
    item: {
      type: Object,
      required: true,
      default() {
        return false;
      },
    },
    modelItem: {
      type: Object,
      required: true,
    },
    propsItemToShow: {type: Array, required: false},
    successApply: {type: Function, required: false},
    isSucces: {
      type: Boolean,
      required: false,
      default() {
        return false;
      },
    },
  },
};
</script>
