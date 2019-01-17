import axios from "axios";
axios.defaults.headers["Cache-Control"] = "no-cache";
axios.defaults.baseURL = "https://api-test.gestionix.com/api/v3";

export default {
  async login() {
    const { data } = await axios({
      method: "post",
      url: "/users/authentication",
      data: {
        user: "qa@gestionix.com",
        password: "gestionix"
      }
    });

    const { access_token } = data;

    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return true;
  },
  async getCompanies({ commit }) {
    // console.log("Dispatching action");

    const { data } = await axios.get("/users/companies");

    commit("setCompanies", data);

    return true;
  },
  async getBranches({ commit }, companyId) {
    commit("selectCompany", companyId);
    const { data } = await axios.get("/branch_offices", {
      headers: {
        Company: companyId
      }
    });
    commit("setBranches", data);
  }
};
