/* eslint-disable no-undef */
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import {
  getQueriesForElement,
  prettyDOM,
  fireEvent
} from "dom-testing-library";
import SelectBranch from "../SelectBranch.vue";
import GxBranches from "../GxBranches.vue";
import CompanyBranch from "../CompanyBranch.vue";
import CompanyShops from "../CompanyShops.vue";
import axios from "axios";
import store from "../../store";
import mutations from "../../store";

const flushPromises = require("flush-promises");
const { selectBranch } = mutations;
const { selectCompany } = mutations;

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
  it("highlihgts the selected company", async done => {
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
    const branchName = "Una branch";
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            branch_id: 4721,
            active: true,
            description: "Soy una branch",
            name: branchName,
            type: "Shop"
          }
        ]
      })
    );

    const buttonTestId = `${companyName}_button`;
    const button = getByTestId(buttonTestId);
    fireEvent.click(button);

    await flushPromises();

    expect(button.classList.contains("active")).toBe(true);
    // Change the selectedCompanyId when selected
    expect(store.state.selectedCompanyId).toBe(1104);

    done();
  });

  it("it renders branches when a company is selected", async done => {
    const companyName = "Una compañia";
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

    const branchName = "Una branch";
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            branch_id: 4721,
            active: true,
            description: "Soy una branch",
            name: branchName,
            type: "Shop"
          },
          {
            branch_id: 4722,
            active: true,
            description: "Soy una branch",
            name: branchName,
            type: "Shop"
          }
        ]
      })
    );
    const branchesTestData = {
      branch_id: 4721,
      active: true,
      description: "Soy una branch",
      name: branchName,
      type: "Shop"
    };
    console.log(store.state.branches);
    const buttonTestId = `${companyName}_button`;
    const button = getByTestId(buttonTestId);
    fireEvent.click(button);

    await flushPromises();

    // Branches in the state is different to zero when a company is selected
    expect(store.state.branches.length).toBe(2);
    expect(store.state.branches[0]).toEqual(branchesTestData);
    console.log(store.state.branches);

    done();
  });
  it("highlihgts the selected branch", async done => {
    const companyName = "Una compañia";
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

    const branchName = "Una branch";
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            branch_id: 4721,
            active: true,
            description: "Soy una branch",
            name: branchName,
            type: "Store"
          }
        ]
      })
    );
    const buttonTestId = `${companyName}_button`;
    const button = getByTestId(buttonTestId);
    fireEvent.click(button);

    // Branches in the state is different to zero when a company is selected
    console.log(store.state.selectedBranchId);
    const buttonBranchTestId = `${branchName}_button`;
    const buttonBranch = getByTestId(buttonBranchTestId);
    fireEvent.click(buttonBranch);

    expect(buttonBranch.classList.contains("active")).toBe(true);
    // Change the selectedCompanyId when selected
    expect(store.state.selectedBranchId).toBe(4721);
    console.log(store.state.selectedBranchId);

    done();
  });
});
