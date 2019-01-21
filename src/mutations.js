export const mutations = {
  setCompanies(state, companies) {
    // console.log(companies);
    state.companies = companies;
  },
  setBranches(state, branches) {
    console.log(branches);
    state.branches = branches;
  },
  selectBranch(state, branchId) {
    state.selectedBranchId = branchId;
  },
  selectCompany(state, companyId) {
    state.selectedCompanyId = companyId;
  }
};
