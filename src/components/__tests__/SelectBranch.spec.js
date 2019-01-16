/* eslint-disable no-undef */
import { createLocalVue, mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import { getQueriesForElement, prettyDOM, fireEvent } from "dom-testing-library";
import SelectBranch from '../SelectBranch.vue';
import axios from 'axios';
import store from '../../store';
const flushPromises = require('flush-promises');

jest.mock('axios');

let localVue
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

describe('SelectBranch.vue', () => {
    it('renders companies', async (done) => {
        const companyName = 'Una compañía'
        axios.get.mockImplementation(() => Promise.resolve({
            data: [
                {
                    "company_id": 1104,
                    "emitter": {
                        "tax_id": "VAVV820109B47",
                        "business_name": companyName,
                        "commercial_name": companyName,
                    },
                }
            ]
        }));

        const { getByText } = render(SelectBranch, { store });

        await flushPromises();

        expect(getByText(companyName)).toBeTruthy();
        done();
    })
    it('highlihgts the selected company', async (done) => {
        const companyName = 'Una compañía'
        axios.get.mockImplementation(() => Promise.resolve({
            data: [
                {
                    "company_id": 1104,
                    "emitter": {
                        "tax_id": "VAVV820109B47",
                        "business_name": companyName,
                        "commercial_name": companyName,
                    },
                }
            ]
        }));
        const { getByTestId } = render(SelectBranch, { store });

        await flushPromises();

        axios.get.mockImplementation(() => Promise.resolve({
            data: [
                {
                    "branch_id": 1104,
                    "emitter": {
                        "tax_id": "VAVV820109B47",
                        "business_name": companyName,
                        "commercial_name": companyName,
                    },
                }
            ]
        }));

        const buttonTestId = `${companyName}_button`;
        const button = getByTestId(buttonTestId);
        fireEvent.click(button);

        await flushPromises();

        expect(button.classList.contains('active')).toBe(true);

        done();
    })
    it('it renders branches when a company is selected', () => {

    })
    it('highlihgts the selected branch', () => {

    })
});