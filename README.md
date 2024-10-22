# Online Shopping Automation with Cypress

This project is an automated testing framework for purchasing items from an online shop using Cypress. It simulates the user experience of logging in, selecting items, checking out, and logging out from the application.

## Project Structure

The project utilizes the following Cypress selectors for organizing tests:

- `selectors/loginPage`
- `selectors/inventory`
- `selectors/inventoryItem`
- `selectors/cart`
- `selectors/checkoutStepOne`
- `selectors/checkoutStepTwo`
- `selectors/checkoutComplete`
- `selectors/logout`

## Features

- **Incognito Mode Simulation**: The tests clear cookies and local storage to simulate incognito browsing.
- **User Login**: Valid credentials are used for logging into the application.
- **Product Selection**: Users can select and add items to their cart.
- **Checkout Process**: The automation covers entering shipping information, confirming order details, and completing the purchase.
- **Logout**: Users can log out after completing their purchase.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or later)
- [Cypress](https://www.cypress.io/) (installed globally or as a project dependency)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
