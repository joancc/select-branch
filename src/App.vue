<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <div v-if="loading" class="loading">Loading...</div>
    <router-view v-else />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      loading: true
    };
  },
  async created() {
    await this.$store.dispatch("login");
    this.loading = false;
  }
};
</script>
