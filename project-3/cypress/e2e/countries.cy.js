/// <reference types="cypress" />

describe('e2e countries app', () => {
    beforeEach(() => {
      cy.visit('localhost:3000')
    })
  
    it('displays nine countries per page', () => {
      cy.get('#countries li').should('have.length', 9)
      cy.get('#countries li').first().should('have.text', 'Afghanistan')
      cy.get('#countries li').last().should('have.text', 'Antarctica')
    })

    it('go to next page and controll content', () => {
      cy.get('#rightArrow').click()
      cy.get('#countries li').first().should('have.text', 'Antigua and Barbuda')
      cy.get('#countries li').last().should('have.text', 'Bahrain')
    })

    it('go back to first page and controll content', () => {
        cy.get('#leftArrow').click()
        cy.get('#countries li').first().should('have.text', 'Afghanistan')
        cy.get('#countries li').last().should('have.text', 'Antarctica')
      })
    
    it('controll info on first country', () => {
        cy.get('#countries li').first().get('#arrow').click()
        cy.get('#capital').should('have.text', 'Kabul')
    })
  })
  