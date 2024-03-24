import 'cypress-xpath'
/// <reference types="cypress" />

describe('As a user, I want to purchase items through online shopping', ()=>{
    
    it('The user want to log in to an online shop.',()=>{
        cy.visit('https://www.saucedemo.com/') 
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce') 
        cy.get('#login-button').click() 

        //User try to buy Backpack
        cy.contains('Sauce Labs Backpack').click()
        cy.get('#add-to-cart-sauce-labs-backpack').click()
        cy.get('#back-to-products').click()
        
        // user try to cansel purchase 
        cy.get('#add-to-cart-sauce-labs-bike-light').click() 
        cy.contains('Sauce Labs Bike Light').click()
        cy.get('#remove-sauce-labs-bike-light').click()
        cy.get('#back-to-products').click()


    })



})