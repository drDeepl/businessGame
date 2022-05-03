<template>
  <div class="modal-window__wrapper">
    <div
      class="modal"
      tabindex="-1"
      :aria-hidden="true"
      :style="modal.styleForShow"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.prevent="onClickCloseModal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: {isActive: false, styleShowModal: this.styleShowModal}
    };
  },
  props: {
    title: {
      type: String,
      require: true
    },
    styleShowModal: {
      type: String,
      require: true
    },
    showModal: {
      type: Function,
      require: true
    }
  },
  methods: {
    onClickCloseModal() {
      console.log(this.showModal);
      this.showModal({
        modalIsActive: false,
        styleShowModal: 'display: none'
      });
    }
  }
};
</script>
