describe('Web Table Automation Tour', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.intercept({ url: /.*blogger\.com.*/ }, { statusCode: 200, body: '' });
    cy.intercept({ url: /.*googlesyndication\.com.*/ }, { statusCode: 200, body: '' });

    cy.visit('testautomationpractice.blogspot.com', {
      timeout: 60000,
      failOnStatusCode: false
    });
  });

  it('should manipulate and verify web table structures', () => {
    cy.get('table[name="BookTable"]')
      .find('tr')
      .should('have.length', 7);

    cy.get('table[name="BookTable"]')
      .find('tr')
      .first()
      .find('th')
      .should('have.length', 4);

    cy.get('table[name="BookTable"]')
      .find('tr')
      .eq(1)
      .within(() => {
        cy.get('td').eq(0).should('have.text', 'Learn Selenium');
        cy.get('td').eq(1).should('have.text', 'Amit');
      });

    cy.get('#productTable td')
      .contains('Laptop')
      .closest('tr')
      .find('input[type="checkbox"]')
      .check()
      .should('be.checked');

    cy.get('table[name="BookTable"]')
      .find('tr')
      .each(($row, index) => {
        if (index > 0) {
          cy.wrap($row).find('td').eq(3).then(($price) => {
            const priceValue = parseFloat($price.text().trim());
            expect(priceValue).to.be.a('number').and.not.be.NaN;

             cy.screenshot();
          });
        }
      });
  });
});