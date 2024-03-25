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
            cy.log("First Account Number::"+accountsList[0]);
            cy.log("Second Account Number::"+accountsList[1]);
            cy.log("Third Account Number::"+accountsList[2]);
        });

            // Log in as a user 
            cy.xpath('//button[.="Home"]').click();
            cy.xpath('//button[.="Customer Login"]').click();
            cy.get('#userSelect').select(customerFullName);
            cy.xpath('//button[.="Login"]').click();

            //Deposit Dollars 
            cy.xpath('//*[@ng-class="btnClass2"]').click();
            cy.xpath('//*[@ng-model="amount"]').type('500');
            cy.xpath('//button[text()="Deposit"]').click();
            cy.xpath('//*[@ng-show="message"]')
            .should('be.visible')
            .and('have.text', 'Deposit Successful');
        
           //Withdrawl currect amount   
           cy.xpath('//*[@ng-class="btnClass3"]').click();
           cy.wait(1000)
           cy.xpath('//*[@ng-model="amount"]').type('100');
           cy.xpath('//button[text()="Withdraw"]').click(); 
           cy.xpath('//*[@ng-show="message"]')
            .should('be.visible')
            .and('have.text', 'Transaction successful'); 

            //Withdrawl wrong amount   
            cy.xpath('//*[@ng-class="btnClass3"]').click();
            cy.wait(1000)
            cy.xpath('//*[@ng-model="amount"]').type('500');
            cy.xpath('//button[text()="Withdraw"]').click(); 
            cy.xpath('//*[@ng-show="message"]')
            .should('be.visible')
            .and('have.text', 'Transaction Failed. You can not withdraw amount more than the balance.'); 

    });
});
