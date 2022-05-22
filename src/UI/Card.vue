<!--
<template>
    <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.access.substring(0, 20)}} ... {{currentUser.access.substr(currentUser.access.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
  </div>
</template>
-->

<template>
  <div class="card">
    <div class="profile-info">
      <span class="card-name">{{ username }}</span>
      <div>
        <small>{{ id }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  }
};
</script>
