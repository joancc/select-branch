/* eslint-disable no-undef */
import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import {
  getQueriesForElement,
  prettyDOM,
  fireEvent
} from "dom-testing-library";
import SelectBranch from "../SelectBranch.vue";
import GxBranches from "../GxBranches.vue";
import axios from "axios";
import store from "../../store";
import GxCompany from "../GxCompany.vue";
import { mutations } from "../../mutations";
const flushPromises = require("flush-promises");

jest.mock("axios");

let localVue;
function render(component, options) {
  localVue = createLocalVue();
  localVue.use(Vuex);
  const wrapper = mount(component, {
    localVue,
    attachToDocument: true,
    ...options
  });

  return {
    wrapper,
    ...getQueriesForElement(wrapper.element),
    debug: () => console.log(prettyDOM(wrapper.element))
  };
}

describe("SelectBranch.vue", () => {
  it("renders companies", async done => {
    const companyName = "Una compañía";
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            company_id: 1104,
            emitter: {
              tax_id: "VAVV820109B47",
              business_name: companyName,
              commercial_name: companyName
            }
          }
        ]
      })
    );

    const { getByText } = render(SelectBranch, { store });

    await flushPromises();

    expect(getByText(companyName)).toBeTruthy();
    done();
  });
  it("mutates the companies' state", () => {
    const companyName = "Una compañía";
    const companies = [
      {
        company_id: 1104,
        emitter: {
          tax_id: "VAVV820109B47",
          business_name: companyName,
          commercial_name: companyName
        }
      }
    ];
    const state = {
      companies: []
    };
    mutations.setCompanies(state, companies);
    expect(state.companies).toEqual(companies);
  });
  it("mutates branches' state", () => {
    const branchId = 1104;
    const branches = [
      {
        branch_id: branchId,
        description: "branch",
        name: "name branches",
        type: "Shop"
      }
    ];
    const state = {
      branches: []
    };
    mutations.setBranches(state, branches);
    expect(state.branches).toEqual(branches);
  });
});
it("highlights the selected company", async done => {
  const companyName = "Una compañía";
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          company_id: 1104,
          emitter: {
            tax_id: "VAVV820109B47",
            business_name: companyName,
            commercial_name: companyName
          }
        }
      ]
    })
  );
  const { getByTestId } = render(SelectBranch, { store });

  await flushPromises();

  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          company_id: 1104,
          emitter: {
            tax_id: "VAVV820109B47",
            business_name: companyName,
            commercial_name: companyName
          }
        }
      ]
    })
  );

  const buttonTestId = `${companyName}_button`;
  const button = getByTestId(buttonTestId);
  fireEvent.click(button);

  await flushPromises();

  expect(button.classList.contains("active")).toBe(true);

  done();
});
it("Has GxBranches as a child", async done => {
  const companyName = "Una compañía";
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          company_id: 1104,
          emitter: {
            tax_id: "VAVV820109B47",
            business_name: companyName,
            commercial_name: companyName
          }
        }
      ]
    })
  );
  const { getByTestId } = render(SelectBranch, { store });

  await flushPromises();

  const branchId = 1104;
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          branch_id: branchId,
          description: "branch",
          name: "name branches",
          type: "Shop"
        }
      ]
    })
  );

  const buttonTestId = `${companyName}_button`;
  const button = getByTestId(buttonTestId);

  fireEvent.click(button);
  const wrapper = mount(GxBranches, { store });
  expect(wrapper.find(GxBranches).exists()).toBe(true);
  done();
});
it("Renders branches when a company is selected ", async done => {
  const companyName = "Una compañía";
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          company_id: 1104,
          emitter: {
            tax_id: "VAVV820109B47",
            business_name: companyName,
            commercial_name: companyName
          }
        }
      ]
    })
  );
  const { getByTestId } = render(SelectBranch, { store });
  await flushPromises();

  const branchId = 1104;
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          branch_id: branchId,
          description: "branch",
          name: "name branches",
          type: "Shop"
        }
      ]
    })
  );
  const buttonTestIdCompany = `${companyName}_button`;
  const button = getByTestId(buttonTestIdCompany);
  fireEvent.click(button);
  await flushPromises();
  const branches = [
    {
      branch_id: branchId,
      description: "branch",
      name: "name branches",
      type: "Shop"
    }
  ];
  expect(store.state.branches).toEqual(branches);
  expect(store.state.selectedBranchId).toBe(null);

  done();
});
it("Highlights the correct branch", async done => {
  const companyName = "Una compañía";
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          company_id: 1104,
          emitter: {
            tax_id: "VAVV820109B47",
            business_name: companyName,
            commercial_name: companyName
          }
        }
      ]
    })
  );
  const { getByTestId } = render(SelectBranch, { store });

  await flushPromises();

  const branchId = 1104;
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          branch_id: branchId,
          description: "branch",
          name: "name branches",
          type: "Shop"
        }
      ]
    })
  );
  const buttonTestIdCompany = `${companyName}_button`;
  const buttonCompany = getByTestId(buttonTestIdCompany);
  fireEvent.click(buttonCompany);

  await flushPromises();
  const buttonTestIdBranches = `${branchId}_button`;
  console.log(buttonTestIdBranches);
  const buttonBranch = getByTestId(buttonTestIdBranches);
  fireEvent.click(buttonBranch);

  await flushPromises();
  expect(store.state.selectedBranchId).toEqual(branchId);
  expect(buttonBranch.classList.contains("active")).toBe(true);
  done();
});

describe("GxCompany", () => {
  const companyName = "Una compañía";
  const { wrapper } = render(GxCompany, {
    propsData: {
      company: {
        company_id: 1104,
        emitter: {
          tax_id: "VAVV820109B47",
          business_name: companyName,
          commercial_name: companyName
        }
      }
    }
  });
  it("Shows the hidden button", () => {
    // const button = wrapper.findAll("button").at(1);
    expect(wrapper.data.showButton).toBe(true);
  });
});
