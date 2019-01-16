<template>
  <div>
    <div class="select-title">
      <div class="icon warehouses"></div>
      <h4>Almacenes</h4>
    </div>
    <CompanyBranch v-for="branch in branches" :key="branch.branch_id" :branch="branch"/>
    <hr>
  </div>
</template>
<script>
import CompanyBranch from "./CompanyBranch.vue";
export default {
  name: "CompanyWarehouses",
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
