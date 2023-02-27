<template>
  <div>
    <v-btn @click.prevent="socketsTest()">Тест сокетов</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      connection: null,
      test: true,
    };
  },
  async created() {
    this.connection = new WebSocket('ws://http://127.0.0.1:8000/api/ws/');
  },
  methods: {
    socketsTest() {
      console.log(this.socket.onmessage);
    },
  },
};
</script>
