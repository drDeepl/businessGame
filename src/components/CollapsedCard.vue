<template>
  <div class="collapsedCard__wrapper">
    <button
      :class="card.button.buttonClass"
      type="button"
      data-toggle="collapse"
      :data-target="card.button.dataTarget"
      :aria-expanded="card.button.active"
      :aria-controls="card.button.ariaControls"
      @click.prevent="OnClickButtonCard"
    >
      {{ title }}
    </button>
    <div :class="card.cardClass" :id="card.button.ariaControls">
      <div class="card card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // TODO: сделать карточку
  data() {
    return {
      card: {
        button: {
          active: false,
          ariaExpanded: false,
          buttonClass: 'card-collapsed collapsed',
          datatarget: '#' + this.$props.id,
          ariaControls: this.$props.id
        },
        cardClass: 'collapse'
      }
    };
  },
  props: {
    title: String,
    id: String
  },
  methods: {
    OnClickButtonCard() {
      this.card.button.active = !this.card.button.active;
      this.card.button.ariaExpanded = !this.card.button.ariaExpanded;
      if (this.card.button.active) {
        this.card.button.buttonClass = 'card-collapsed';
        this.card.cardClass = 'collapse show';
      } else {
        this.card.button.buttonClass = 'card-collapsed collapsed';
        this.card.cardClass = 'collapse';
      }
    }
  }
};
</script>
