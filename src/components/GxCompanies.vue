<template>
  <div class="column companies is-half">
    <div class="select-title">
      <div class="icon companies"></div>
      <h4>Empresas</h4>
    </div>
    <div v-if="loading">Loading...</div>
    <GxCompany v-else v-for="company in companies" :company="company" :key="company.company_id"/>
  </div>
</template>
<script>
import { mapState } from "vuex";
import GxCompany from "./GxCompany";

export default {
  name: "GxCompanies",
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState({
      companies: state => state.companies
    })
  },
  async created() {
    await this.$store.dispatch("getCompanies");
    this.loading = false;
  },
  components: {
    GxCompany
  }
};
</script>
