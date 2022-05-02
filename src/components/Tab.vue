<template>
  <div class="tab-conatiner">
    <div class="admin-tab__wrapper">
      <button
        class="admin-tab"
        v-for="tab in tabs"
        :key="tab.url"
        @click.prevent="onTab(tab.url)"
      >
        <span class="admin-tab-title">{{ tab.title }}</span>
      </button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      // {
      //  title: String,
      //  url: String
      // }
      type: Array
    },
    onClickTab: Function
  },
  methods: {
    onTab(data) {
      this.onClickTab({tabUrl: data});
      console.log(data);
    }
  }
};
</script>
