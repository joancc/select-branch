// https://docs.cypress.io/api/introduction/api.html

describe("Select Branch Cypress Test", () => {
  it("It renders the Select Branch component, but not the branches", () => {
    cy.visit("/");
    cy.get(".outer-20-b").should("contain", "Regresar");
    cy.get(".branches").should("not.be.visible");
  });
  it("It renders the companies array but not the branches array before click someone", () => {
    cy.visit("/");
    cy.get(".companies").should("have.length.gt", 1);
    cy.get(".branches").should("not.be.visible");
  });
  it("Click one company and get the active class", () => {
    cy.visit("/");
    cy.get(".select-item")
      .eq(0)
      .click();
    cy.get(".active").should("be.visible");
  });
  it("Click one company and get branches zone", () => {
    cy.visit("/");
    cy.get(".select-item")
      .eq(0)
      .click();
    cy.get(".branches").should("be.visible");
  });
  it("Find the button child 'Botón' when the company is active and 'Show button' have been clicked", () => {
    cy.visit("/");
    cy.get(".select-item")
      .eq(0)
      .click();
    cy.get(".showButton")
      .eq(0)
      .click();
    cy.get(".boton").should("be.visible");
  });
  it("Using store", () => {
    cy.visit("/");
    Cypress.Commands.add("vuex", () => cy.window().its("app.$store"));

    Cypress.Commands.add("getCompanies", () => {
      cy.vuex().invoke("dispatch", "getCompanies");
      cy.vuex()
        .its("mutations.selectCompany")
        .should("state.selectedCompanyId", true);
    });
  });
  it("The routes for companies http request are working ok", () => {
    cy.visit("/");
    cy.server();
    cy.route({
      method: "GET",
      url: "/users/companies"
    }).as("companyResponse");
  });
  it("Store dispatch actions change selectedCompanyId", () => {
    cy.visit("/");
    const getStore = () => cy.window().its("app.$store");
    cy.get(".select-item")
      .eq(0)
      .click();
    getStore()
      .its("state")
      .should("contain", {
        selectedCompanyId: 1104
      });
  });
  it("Dont rendering the app if the credentials are not available", () => {
    cy.visit("/");
    cy.server({
      method: "POST",
      url: "/users/authentication",
      status: 401,
      response: {}
    });
    cy.get(".loading").should("be.visible");
  });
});
