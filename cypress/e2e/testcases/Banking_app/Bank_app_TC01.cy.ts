import 'cypress-xpath'
import {faker} from '@faker-js/faker'


/// <reference types="cypress" />

describe('cypress test on sample banking application', () => {
    
    it('Create and verify customer account', () => {
        cy.visit('https://www.way2automation.com/angularjs-protractor/banking/#/login')
        cy.contains('Bank Manager Login').click();
        
        // 1st step - Delete all existing customers
        cy.contains('Customers').click(); 
        cy.xpath('//button[.="Delete"]').each(($el) => {
            $el.click();
        });
     
        // 2nd step - Add new customer
        cy.contains('Add Customer').click();
        
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const zipcode = faker.address.zipCode();

        cy.xpath('//*[@ng-model="fName"]').type(firstName);
        cy.xpath('//*[@ng-model="lName"]').type(lastName);
        cy.xpath('//*[@ng-model="postCd"]').type(zipcode);
        cy.xpath('//button[text()="Add Customer"]').click();

        cy.contains('Customers').click();

        // 3rd step - Add current account for customer 
        const customerFullName = firstName + " " + lastName;
        cy.contains('Open Account').click();

        // Create current account with Dollar  
        cy.get('#userSelect').select(customerFullName);
        cy.get('#currency').select('Dollar');
        cy.xpath('//button[text()="Process"]').click(); 
        
        // Create current account with Pound
        cy.get('#userSelect').select(customerFullName);
        cy.get('#currency').select('Pound');
        cy.xpath('//button[text()="Process"]').click(); 
      
        // Create current account with Rupee
        cy.get('#userSelect').select(customerFullName);
        cy.get('#currency').select('Rupee');
        cy.xpath('//button[text()="Process"]').click(); 

        // 4th step - Check validation of created customer 
        cy.contains('Customers').click();
        
        // Get customer First name     
        cy.xpath('//table[@class="table table-bordered table-striped"]/tbody/tr[1]/td[1]')
            .then($el => {
                cy.wrap($el.text()).as('firstNameDisplayed');
            }); 

        // Get customer Last name     
        cy.xpath('//table[@class="table table-bordered table-striped"]/tbody/tr[1]/td[2]')
            .then($el => {
                cy.wrap($el.text()).as('lastNameDisplayed');
            }); 

        // Get customer Post code     
        cy.xpath('//table[@class="table table-bordered table-striped"]/tbody/tr[1]/td[3]')
            .then($el => {
                cy.wrap($el.text()).as('postCodeDisplayed');
            }); 

        // Get customer Account number     
        cy.xpath('//table[@class="table table-bordered table-striped"]/tbody/tr[1]/td[4]')
            .then($el => {
                cy.wrap($el.text()).as('accountDisplayed');
                cy.log("Account Numbers::" + $el.text());
            }); 
        
        // Get the account numbers and split into a list
        cy.get("@accountDisplayed").then($accounts => {
            let accountsList = $accounts.toString().split(' ');
        });
    });
});
