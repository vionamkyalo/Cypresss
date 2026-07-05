describe("Complete Form Automation Tour", () => {
  beforeEach(() => {
    cy.visit("https://blogspot.com", {
      onBeforeLoad(win) {
        Object.defineProperty(win, "onload", { value: () => {} });
      },
    });
  });

  it("should fill out all fields, submit, and verify success", () => {
    cy.get("#name").type("Viona kyalo");
    cy.get("#email").type("viona@example.com");
    cy.get("#phone").type("1234567890");
    cy.get("#textarea").type("567 ngong, Kajiado");

    cy.get("#female").check().should("be.checked");
    cy.get("#wednesday").check().should("be.checked");

    cy.get("#country").select("United States");
    cy.get("#colors").select("Red");

    cy.screenshot();
  });
});
