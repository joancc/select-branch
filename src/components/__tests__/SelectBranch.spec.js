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
import axios from "axios";
import store from "../../store";
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
    const buttonTestId = `${companyName}_button`;
    const button = getByTestId(buttonTestId);
    fireEvent.click(button);

    await flushPromises();

    // Branches in the state is different to zero when a company is selected
    expect(store.state.branches.length).toBe(2);
    expect(store.state.branches[0]).toEqual(branchesTestData);

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
  it("Testing mutations changes", () => {
    const state = {
      branches: [
        {
          branch_id: 4721,
          active: true,
          description: "Soy una branch",
          name: "Soy una branch",
          type: "Store"
        },
        {
          branch_id: 5072,
          active: true,
          description: "Soy una branch",
          name: "Soy una branch",
          type: "Store"
        }
      ],
      selectedCompanyId: null
    };
    const branchId = 5072;
    mutations.selectBranch(state, branchId);
    expect(state.selectedBranchId).toBe(5072);
    mutations.selectBranch(state, 4721);
    expect(state.selectedBranchId).toBe(4721);
  });
  it("Change company selected when click other company", async done => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            company_id: 842,
            emitter: {
              tax_id: "VAVV820109B46",
              business_name: "Soy una compañia 1",
              commercial_name: "Soy una compañia 1"
            }
          },
          {
            company_id: 1104,
            emitter: {
              tax_id: "VAVV820109B47",
              business_name: "Soy una compañia 2",
              commercial_name: "Soy una compañia 2"
            }
          }
        ]
      })
    );
    const { getByTestId } = render(SelectBranch, { store });

    await flushPromises();
    const buttonTestId = `${"Soy una compañia 1"}_button`;
    const button = getByTestId(buttonTestId);
    fireEvent.click(button);

    const buttonTestId2 = `${"Soy una compañia 2"}_button`;
    const button2 = getByTestId(buttonTestId2);
    fireEvent.click(button2);

    expect(store.state.selectedCompanyId).toBe(1104);
    done();
  });
  it("Change Branch selected when click other Branch", async done => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            company_id: 5072,
            emitter: {
              tax_id: "VAVV820109B46",
              business_name: "Soy una Branch 1",
              commercial_name: "Soy una Branch 1"
            }
          },
          {
            company_id: 4721,
            emitter: {
              tax_id: "VAVV820109B47",
              business_name: "Soy una Branch 2",
              commercial_name: "Soy una Branch 2"
            }
          }
        ]
      })
    );
    const { getByTestId } = render(SelectBranch, { store });

    await flushPromises();

    const buttonTestId = `${"Soy una Branch 1"}_button`;
    const button = getByTestId(buttonTestId);
    fireEvent.click(button);

    const buttonTestId2 = `${"Soy una Branch 2"}_button`;
    const button2 = getByTestId(buttonTestId2);
    fireEvent.click(button2);

    expect(store.state.selectedBranchId).toBe(4721);
    done();
  });
});
