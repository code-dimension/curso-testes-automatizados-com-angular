/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    setUserAsLoggedIn(): void;
    isCheckboxChecked(testId: string): Chainable<boolean>;
  }
}

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('setUserAsLoggedIn', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('auth-token', 'fake-jwt-token');
  })
});

Cypress.Commands.add('isCheckboxChecked', (testId: string) => {
  return cy.getByTestId(testId).then($checkbox => $checkbox.is(':checked'));
});
