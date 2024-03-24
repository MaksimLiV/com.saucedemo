import 'cypress-xpath'

/// <reference types="cypress" />

describe('The user want to log in to an online shop', () => {
    
    it('The user did not provide login, but want to enter to account', () => {
        cy.visit('https://www.saucedemo.com/'); 
        cy.get('#password').type('secret_sauce'); 
        cy.get('#login-button').click();
        cy.xpath('//*[@data-test="error"]')
            .should('be.visible')
            .and('have.text', 'Epic sadface: Username is required');
    })
})