import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: [],
    branches: [],
    selectedCompanyId: null,
    selectedBranchId: null
  },
  mutations: {
    setCompanies(state, companies) {
      // console.log(companies);

      state.companies = companies;
    },
    setBranches(state, branches) {
      // console.log(branches);
      state.branches = branches;
    },
    selectBranch(state, branchId) {
      state.selectedBranchId = branchId;
    },
    selectCompany(state, companyId) {
      state.selectedCompanyId = companyId;
    }
  },
  actions
});
