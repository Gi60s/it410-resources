// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {

  it('has the page header', () => {
    cy.visit('/')
    cy.contains('h1', 'Number Selector')
  })

  it('has three number selectors', () => {
    cy.visit('/')
    cy.get('[data-cy-number-selector]').should('have.length', 3)
  })

  it('incrementing low value above select value also increments select value', () => {
    cy.visit('/')
    cy.get('[data-cy="low"]').find('button').last().click()
    cy.get('[data-cy="value"]').contains('1')
  })

})
