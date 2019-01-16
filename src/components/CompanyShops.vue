<template>
  <div>
    <div class="select-title">
      <div class="icon stores"></div>
      <h4>Tiendas</h4>
    </div>
    <CompanyBranch v-for="branch in branches" :key="branch.branch_id" :branch="branch"/>
    <hr>
  </div>
</template>
<script>
import CompanyBranch from "./CompanyBranch.vue";
export default {
  name: "CompanyShops",
  props: {
    branches: {
      type: Array,
      required: true
    }
  },
  components: {
    CompanyBranch
  }
};
</script>
