// / <reference types="cypress" />
let username;
context('Register e2e', () => {
  beforeEach(() => {
    cy.visit('/register');
    username = `${Math.random().toFixed(3)}userTest`;
  });

  it('Submit register form', () => {
    cy.get('.registerUsernameInput')
      .type(username).should('have.value', username);
    cy.get('.registerFirstNameInput')
      .type('userFirstName').should('have.value', 'userFirstName');
    cy.get('.registerLastNameInput')
      .type('userLastName').should('have.value', 'userLastName');
    cy.get('.registerEmailInput')
      .type(`${username}@email.com`).should('have.value', `${username}@email.com`);
    cy.get('.registerPasswordInput')
      .type('password').should('have.value', 'password');
    cy.get('.registerRetypePasswordInput')
      .type('password').should('have.value', 'password');
    cy.get('.registerFormButton').click();
    cy.get('.loginForm').should('be.visible');
  });
});
