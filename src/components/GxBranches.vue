<template>
  <div class="column branches is-half" :class="{ 'is-hidden': isHidden }">
    <CompanyShops v-if="shops.length > 0" :branches="shops" />
    <CompanyWarehouses v-if="warehouses.length > 0" :branches="warehouses" />
    <CompanyOffices v-if="offices.length > 0" :branches="offices" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import CompanyShops from "./CompanyShops.vue";
import CompanyWarehouses from "./CompanyWarehouses.vue";
import CompanyOffices from "./CompanyOffices.vue";

export default {
  name: "GxBranches",
  computed: {
    ...mapState({
      branches: state => state.branches
    }),
    isHidden() {
      return this.branches.length === 0;
    },
    shops() {
      return this.branches.filter(branch => {
        return branch.type === "Shop";
      });
    },
    offices() {
      return this.branches.filter(branch => {
        return branch.type === "Office";
      });
    },
    warehouses() {
      return this.branches.filter(branch => {
        return branch.type === "Warehouse";
      });
    }
  },
  components: {
    CompanyShops,
    CompanyWarehouses,
    CompanyOffices
  }
};
</script>
