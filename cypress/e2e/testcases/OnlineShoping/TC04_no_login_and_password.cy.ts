import 'cypress-xpath';

/// <reference types="cypress" />

describe('The user wants to log in to an online shop', () => {
    
    it('The user did not provide a username and password, but wants to enter the account', () => {
        cy.visit('https://www.saucedemo.com/'); 
        cy.get('#login-button').click();
        cy.xpath('//*[@data-test="error"]')
            .should('be.visible')
            .and('have.text', 'Epic sadface: Username is required');
    })
})
