<template>
  <div>
    <div class="select-title">
      <div class="icon offices"></div>
      <h4>Oficinas</h4>
    </div>
    <CompanyBranch v-for="branch in branches" :key="branch.branch_id" :branch="branch"/>
  </div>
</template>
<script>
import CompanyBranch from "./CompanyBranch.vue";
export default {
  name: "CompanyOffices",
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
