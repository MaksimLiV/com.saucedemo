import 'cypress-xpath'

/// <reference types="cypress" />
describe('As a user I want to fill up registration form ', () => {
    it('Valid user test scenario', () => {
        cy.visit('https://way2automation.com/way2auto_jquery/index.php')
        cy.get('#load_form input[name="name"]').type('Maksim') 
        cy.get('#load_form input[name="phone"]').type('1231231231')
        cy.get('#load_form input[name="email"]').type('maksim@gmail.com')
        cy.get('#load_form select').select('Latvia')
        cy.get('#load_form input[name="city"]').type('Riga')
        cy.xpath('(//*[@name="username"])[2]').type('MaksimLi')
        cy.xpath('(//*[@name="password"])[2]').type('12345')
        cy.xpath('(//*[@id="load_form"]/div[1]/div[2]/input)[2]').click() 
    })
})
