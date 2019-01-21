// import { throwError } from "rxjs";
// import { cyan } from "ansi-colors";

describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it(".app element is visible", () => {
    cy.get("#app").should("be.visible");
  });
  it("Can authenticate", () => {
    cy.server().route({
      method: "POST",
      url: "/ users / authentication",
      status: 200
    });
  });
  it("Can render companies", () => {
    cy.server()
      .route({
        method: "GET",
        url: "/users/companies"
      })
      .as("companiesColumn");
  });

  it("Renders the title for companies", () => {
    cy.get("h4").contains("Empresas");
  });

  it("Renders companies", () => {
    cy.get("div .info").should("have.length.gt", 1);
  });
  it("Highlights the selected company", () => {
    cy.get("button")
      .eq(0)
      .click()
      .should("have.class", "active");
  });
  it("Renders branches when a company is selected", () => {
    cy.get("[data-testid='QA Gestionix_button']").click();
    cy.get(".select-item").should("have.length.gt", 9);
  });
  it("Renders the hidden button", () => {
    cy.get("button :nth-child(4)")
      .click({ multiple: true })
      .get("button .question");
  });
  it("Disables  unactive branches", () => {
    cy.get("[data-testid='QA Gestionix_button']")
      .click()
      .get("[data-testid='4721_button']")
      .should("have.attr", "disabled");
  });

  const getStore = () => cy.window().its("app.$store");
  it("Has properties companies, branches, selectedCompanyId, selectedBranchId", () => {
    getStore()
      .its("state")
      .should("have.keys", [
        "companies",
        "branches",
        "selectedCompanyId",
        "selectedBranchId"
      ]);
  });
});
