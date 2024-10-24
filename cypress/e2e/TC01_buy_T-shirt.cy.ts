import 'cypress-xpath';
import { loginPage } from '../selectors/loginPage';
import { inventory } from '../selectors/inventory';
import { inventoryItem } from '../selectors/inventoryItem';
import { cart } from '../selectors/cart';
import { checkoutStepOne } from '../selectors/checkoutStepOne';
import { checkoutStepTwo } from '../selectors/checkoutStepTwo';
import { checkoutComplete } from '../selectors/checkoutComplete';
import { logout } from '../selectors/logout';

/// <reference types="cypress" />

describe('As a user, I want to purchase items through online shopping', () => {
    it('The user wants to log in to an online shop in incognito mode', () => {
        cy.fixture('data.json').then((data) => {
        // Clear cookies and local storage to simulate incognito mode
        cy.clearCookies();
        cy.clearLocalStorage();
        // Navigate to the Sauce Labs Sample Application
        cy.visit('https://www.saucedemo.com/');

        // Use credentials from environment variables
        const username = Cypress.env('USERNAME') //|| data.loginData.username;
        const password = Cypress.env('PASSWORD') //|| data.loginData.password;
        
        // Enter valid credentials to log in
        cy.get(loginPage.usernameInput).type(username);
        cy.get(loginPage.passwordInput).type(password);
        cy.get(loginPage.loginButton).click();
        
        // Verify successful login and redirection to the products page
        cy.url().should('include', '/inventory.html');
        cy.get(inventory.inventoryList).should('be.visible');

        // User tries to buy T-shirt
        cy.contains('Sauce Labs Bolt T-Shirt').click();

        // Verify that the T-shirt details page is displayed
        cy.url().should('include', '/inventory-item.html');
        cy.get(inventoryItem.productName).should('contain.text', data.tShirtPage.productName);
        cy.get(inventoryItem.productDesc).should('contain.text', data.tShirtPage.productDesc);
        cy.get(inventoryItem.productPrice).should('contain.text', data.tShirtPage.productPrice1)
        .and('contain.text', data.tShirtPage.productPrice2)
        cy.xpath(inventoryItem.addToCartButton).should('be.visible').click();

        // Verify that the T-shirt is added to the cart successfully
        cy.get(cart.shoppingCartButton).should('contain', '1'); // Verify cart icon shows 1 item
        cy.log('T-shirt is added to the cart successfully');
        

        // Navigate to the cart by clicking the cart icon
        cy.get(inventory.cartIcon).should('be.visible').click();

        // Verify that the cart is displayed
        cy.get(cart.cartList).should('be.visible'); // Check for cart list presence

        // Review items in the cart and ensure that the T-shirt is listed with the correct details
        cy.get(cart.cartTitle).should('contain.text', data.cartPage.cartTitleValue);
        cy.get(cart.cartItemName).should('contain.text', data.cartPage.cartItemNameValue);
        cy.get(cart.cartDesc).should('contain.text', data.cartPage.cartDescValue);
        cy.get(cart.cartItemPrice).should('contain.text', data.cartPage.cartItemPriceValue);
        cy.get(cart.cartQuantity).should('contain.text', data.cartPage.cartQuantityValue); 
        
        // Click the "Checkout" button
        cy.xpath(cart.checkoutButton).click();

        // Verify that the checkout information page is displayed
        cy.url().should('include', '/checkout-step-one.html');
        cy.get(checkoutStepOne.checkoutTitle).should('contain.text', data.checkoutPage.checkoutTitleValue);
        cy.get(checkoutStepOne.firstNameInput).should('be.visible');
        cy.get(checkoutStepOne.lastNameInput).should('be.visible');
        cy.get(checkoutStepOne.postalCodeInput).should('be.visible');
       
        // Enter the required checkout information
        cy.get(checkoutStepOne.firstNameInput).type(data.checkoutPage.firstNameInputValue);
        cy.get(checkoutStepOne.lastNameInput).type(data.checkoutPage.lastNameInputValue); 
        cy.get(checkoutStepOne.postalCodeInput).type(data.checkoutPage.postalCodeInputValue); 

        // Click the "Continue" button
        cy.get(checkoutStepOne.continueButton).click();
        
        // Verify that the order summary page is displayed
        cy.url().should('include', '/checkout-step-two.html');
        cy.get(checkoutStepTwo.summaryTitle).should('contain.text', data.orderSummaryPage.summaryTitleValue);
        cy.get(checkoutStepTwo.itemSummary).should('contain.text', data.orderSummaryPage.itemSummaryValue);
        cy.get(checkoutStepTwo.itemDesc).should('contain.text', data.orderSummaryPage.itemDescValue);
        cy.get(checkoutStepTwo.itemPrice).should('contain.text', data.orderSummaryPage.itemPriceValue);
        cy.get(checkoutStepTwo.paymentInfo).should('contain.text', data.orderSummaryPage.paymentInfoValiue);
        cy.get(checkoutStepTwo.paymentInfoText).should('contain.text', data.orderSummaryPage.paymentInfoTextValue);
        cy.get(checkoutStepTwo.shippingInfo).should('contain.text', data.orderSummaryPage.shippingInfoValue);
        cy.get(checkoutStepTwo.shippingInfoText).should('contain.text', data.orderSummaryPage.shippingInfoTextValue);
        cy.get(checkoutStepTwo.subtotalLabel).should('contain.text', data.orderSummaryPage.subtotalLabelValue);
        cy.get(checkoutStepTwo.subtotalLabelText).should('contain.text', data.orderSummaryPage.subtotalLabelTextValue1).
        and('contain.text', data.orderSummaryPage.subtotalLabelTextValue2);
        cy.get(checkoutStepTwo.taxLabel).should('contain.text', data.orderSummaryPage.taxLabelValue);
        cy.get(checkoutStepTwo.totalLabel).should('contain.text', data.orderSummaryPage.totalLabelValue);

        // Click the "Finish" button
        cy.contains(checkoutStepTwo.finishButton).should('be.visible').and('not.be.disabled').click();

        // Verify that the order confirmation page is displayed
        cy.url().should('include', '/checkout-complete.html');
        cy.get(checkoutComplete.title).should('contain.text', data.confirmationPage.titleValue);
        cy.get(checkoutComplete.completeHeader).should('contain.text', data.confirmationPage.completeHeaderValue);
        cy.get(checkoutComplete.completeText).should('contain.text', data.confirmationPage.completeTextValue);
        cy.get(checkoutComplete.backButton).should('be.visible');

        // Logout from the application
        cy.contains(logout.openMenu).click();
        cy.get(logout.logoutLink).click();

        // Verify that the user is successfully logged out and redirected to the login page
        cy.url().should('include', '/'); 
        cy.get(loginPage.usernameInput).should('be.visible'); 
        cy.get(loginPage.passwordInput).should('be.visible'); 
        cy.get(loginPage.loginButton).should('be.visible'); 
    })});
});