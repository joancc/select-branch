export const mutations = {
  setCompanies: (state, companies) => {
    state.companies = companies;
  },
  setBranches: (state, branches) => {
    state.branches = branches;
  },
  selectBranch: (state, branchId) => {
    state.selectedBranchId = branchId;
  },
  selectCompany: (state, companyId) => {
    state.selectedCompanyId = companyId;
  }
};
