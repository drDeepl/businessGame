<template>
  <div>
    <v-btn @click.prevent="socketsTest()">Тест сокетов</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      test: true,
    };
  },
  async created() {
    console.log('Starting connection to WebSocket Server');
    this.socket = new WebSocket('ws://127.0.0.1:8000/api/offers/sale/place');
    this.socket.onmessage = function (event) {
      console.log(event);
    };
    this.socket.onopen = function (event) {
      console.log(event);
      console.log('Successfully connected to the echo websocket server...');
    };
  },
  methods: {
    socketsTest() {
      console.log(this.socket.onmessage);
    },
  },
};
</script>
