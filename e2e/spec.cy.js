describe("Amazon test", () => {
  it("Opens the Amazon homepage", () => {
    cy.visit("https://ww./w.amazon.com");
    cy.title().should("include", "Amazon");
  });
});

