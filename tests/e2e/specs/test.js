import { throwError } from "rxjs";
import { cyan } from "ansi-colors";

// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  // before each test
  beforeEach(() => {
    cy.visit("/");
  });
  const user = cy;

  it("Renders companies", () => {
    user.get(".info").should("have.length.gt", 1);
  });
  it("highlights the selected company", () => {
    user
      .get("[data-testid='QA Gestionix_button']")
      .click()
      .should("have.class", "active");
  });
  it("Renders branches when a company is selected", () => {
    user.get("[data-testid='QA Gestionix_button']").click();
    user.get(".info").should("have.length.gt", 9);
  });
  it("Renders the hidden button", () => {
    user
      .get(".info")
      .children()
      .should("have.length", 2)
      .get("button :nth-child(4)")
      .click({ multiple: true })
      .get("button .question");
  });
  // it("disabled unactive branches", () => {
  //   user
  //     .get("[data-testid='QA Gestionix_button']")
  //     .click()
  //     .get("[data-testid='QA Gestionix_button']")
  //     .should("have.attr", "disabled");
  // });
  it("can authenticate", () => {
    user.server().route({
      method: "POST",
      url: "/ users / authentication",
      status: 200
    });
  });
});
