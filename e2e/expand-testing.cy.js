describe('Automated UI Form Interaction Suite', () => {
  beforeEach(() => {
    cy.visit('example.com');
    cy.viewport(1280, 720);

    cy.document().then((doc) => {
      doc.body.innerHTML = `
        <form id="practice-form" style="padding: 20px;">
          <input name="firstName" type="text" />
          <input name="lastName" type="text" />
          <input type="radio" name="job" value="developer" /> Developer
          <select id="experience-level">
            <option value="">Select</option>
            <option value="intermediate">Intermediate</option>
          </select>
          <input type="checkbox" value="javascript" /> JS
          <input type="checkbox" value="python" /> Python
          <input type="file" id="resume-upload" />
          <div style="margin-top: 1000px;">
            <button type="button" id="submit-button">Submit</button>
          </div>
          <div class="alert-success" style="display:none;">Form submitted successfully!</div>
        </form>
      `;

      doc.getElementById('submit-button').addEventListener('click', () => {
        doc.querySelector('.alert-success').style.display = 'block';
      });
    });
  });

  it('Should successfully fill and submit the practice form', () => {
    cy.url().should('include', 'example.com');

    cy.get('input[name="firstName"]')
      .should('be.visible')
      .type('Jane');

    cy.get('input[name="lastName"]')
      .type('Doe');

    cy.get('input[type="radio"][value="developer"]')
      .check()
      .should('be.checked');

    cy.get('select#experience-level')
      .select('Intermediate')
      .should('have.value', 'intermediate');

    cy.get('input[type="checkbox"][value="javascript"]')
      .check()
      .should('be.checked');

    cy.get('input[type="checkbox"][value="python"]')
      .check()
      .uncheck()
      .should('not.be.checked');

    cy.get('input[type="file"]#resume-upload')
      .selectFile({
        contents: Cypress.Buffer.from('mock resume file'),
        fileName: 'resume.pdf',
        mimeType: 'application/pdf',
      });

    cy.get('#submit-button')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.get('.alert-success')
      .should('be.visible')
      .and('contain.text', 'Form submitted successfully!');
       cy.screenshot();
  });
});