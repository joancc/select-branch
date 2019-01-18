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
});
