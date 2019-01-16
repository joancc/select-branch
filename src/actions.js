import axios from "axios";
axios.defaults.headers["Cache-Control"] = "no-cache";
axios.defaults.baseURL = "https://api-test.gestionix.com/api/v3";

export default {
    async login(context) {
        const { data } = await axios({
            method: "post",
            url: "/users/authentication",
            data: {
                user: "qa@gestionix.com",
                password: "gestionix"
            }
        });

        const { access_token, user_id } = data;

        axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

        return true;
    },
    async getCompanies({ commit, state }) {
        console.log("Dispatching action");

        const { data } = await axios.get("/users/companies");

        commit("setCompanies", data);

        return true;
    },
    async getBranches({ commit, state }, companyId) {
        commit('selectCompany', companyId);
        const { data } = await axios.get("/branch_offices", {
            headers: {
                Company: companyId
            }
        });
        commit("setBranches", data);
    }
}