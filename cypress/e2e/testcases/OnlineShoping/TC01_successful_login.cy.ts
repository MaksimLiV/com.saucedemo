import 'cypress-xpath'
/// <reference types="cypress" />

describe('As a user, I want to purchase items through online shopping', ()=>{
    
    it('The user wants to log in to an online shop in incognito mode',()=>{
        // Clear cookies and local storage to simulate incognito mode (1. Navigate to the Sauce Labs Sample Application (https://www.saucedemo.com/) in Incognito mode.)
        cy.clearCookies()
        cy.clearLocalStorage()

        cy.visit('https://www.saucedemo.com/') 
        //2. Enter valid credentials to log in.
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce') 
        cy.get('#login-button').click() 
        
        //3. Verify that the login is successful and the user is redirected to the products page.
        // Verify that the user is redirected to the products page ()
        cy.url().should('include', '/inventory.html')

        // Verify the products page contains the product grid or header
        cy.get('.inventory_list').should('be.visible')


        //User try to buy T-shirt (4. Select a T-shirt by clicking on its image or name.)
        cy.contains('Sauce Labs Bolt T-Shirt').click()


        // 5. Verify that the T-shirt details page is displayed.
        cy.url().should('include', '/inventory-item.html')
        cy.get('.inventory_details_name').should('contain.text', 'Sauce Labs Bolt T-Shirt') // Verifying product name
        cy.get('.inventory_details_desc').should('be.visible') // Verifying product description
        cy.get('.btn_primary').should('be.visible').and('contain.text', 'Add to cart') // Verifying the "Add to Cart" button
  
        // 6. Click the "Add chart" button 
        cy.xpath('//button[text()="Add to cart"]').should('be.visible').click()

        // 7. Verify that the T-shirt is added to the cart successfully
        cy.get('.shopping_cart_badge').should('contain', '1') // Verifies that the cart icon shows 1 item
        cy.log('T-shirt is added to the cart successfully')

        // 8. Navigate to the cart by clicking the cart icon. 
        cy.xpath('//*[@id="shopping_cart_container"]').click()
        // 9. Verefy that the cart are displayed
        cy.xpath('//*[@id="shopping_cart_container"]').should('be.visible')

        //10. Review the items in the cart and ensure that the T-shirt is listed with the correct details (name, price, quantity, etc.).

        // Verify the name of the product.
        cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Bolt T-Shirt')

        // Verify the price of the product.
        cy.get('.inventory_item_price').should('contain.text', '15.99')
        
        // Verify the quantity of the product. In 7) i already have this validation, is it fine? 
        cy.get('.cart_quantity').should('contain.text', '1')
        
        //11. Click the "Checkout" button.
        cy.xpath('//*[@id="checkout"]').click()

        //12. Verify that the checkout information page is displayed
        // Verify the URL contains 'checkout-step-one.html'
        cy.url().should('include', '/checkout-step-one.html')

        // Verify the presence of first name, last name, and postal code fields
        cy.get('input[data-test="firstName"]').should('be.visible')
        cy.get('input[data-test="lastName"]').should('be.visible')
        cy.get('input[data-test="postalCode"]').should('be.visible')
       
        //13. Enter the required checkout information (e.g., name, shipping address, payment details)
        cy.get('#first-name').type('Maksim')
        cy.get('#last-name').type('Li') 
        cy.get('#postal-code').type('LV-1058') 

        //14. Click the "Continue" button
        cy.get('#continue').click()
        
        // 15. Verify that the order summary page is displayed, showing the T-shirt details and the total amount
        cy.url().should('include', '/checkout-step-two.html') // Verify the order summary page is loaded

        // Verify the T-shirt name
        cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Bolt T-Shirt')

        // Verify the T-shirt description
        cy.get('.inventory_item_desc').should('contain.text', 'Get your testing superhero on with the Sauce Labs bolt T-shirt')

        // Verify the price of the product
        cy.get('.inventory_item_price').should('contain.text', '15.99')

        // Verify the payment information
        cy.get('.summary_info').should('contain.text', 'Payment Information:')
        cy.get('.summary_value_label').first().should('contain.text', 'SauceCard #31337')

        // Verify the shipping information
        cy.get('.summary_info').should('contain.text', 'Shipping Information:')
        cy.get('.summary_value_label').eq(1).should('contain.text', 'Free Pony Express Delivery!')

        // Verify the price total before taxes
        cy.get('.summary_subtotal_label').should('contain.text', 'Item total: $15.99')

        // Verify the tax amount
        cy.get('.summary_tax_label').should('contain.text', 'Tax: $1.28')

        // Verify the total price after taxes
        cy.get('.summary_total_label').should('contain.text', 'Total: $17.27')

        // 16. Click the "Finish" button
        cy.contains('Finish').should('be.visible').and('not.be.disabled').click();

        // 17. Verify that the order confirmation page is displayed, indicating a successful purchase. Do I need to validate another buttons? 
        cy.url().should('include', '/checkout-complete.html') // Verify that we are on the confirmation page

        // Verify the "Checkout: Complete!" title is displayed
        cy.get('.title').should('contain.text', 'Checkout: Complete!')

        // Verify the confirmation header
        cy.get('.complete-header').should('contain.text', 'Thank you for your order!') // Verifies the confirmation header

        // Verify the confirmation text
        cy.get('.complete-text').should('contain.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')

        // Verify that the "Back Home" button is visible
        cy.get('#back-to-products').should('be.visible') // Verifies the presence of the back button

        //18. Logout from the application.
        cy.contains('Open Menu').click()
        cy.get('#logout_sidebar_link').click()

        //19. Verify that the user is successfully logged out and redirected to the login page.
        cy.url().should('include', '/'); // Verify that we are on the login page
        cy.get('#user-name').should('be.visible'); // Verify that the username field is visible
        cy.get('#password').should('be.visible'); // Verify that the password field is visible
        cy.get('#login-button').should('be.visible'); // Verify that the login button is visible


    })



})