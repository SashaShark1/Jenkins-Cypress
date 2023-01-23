import { each } from 'cypress/types/bluebird'
import {BuyPage} from '../objects/buyCarPage'
Cypress.Commands.add('filterBrand', (num: number) => {
    cy.get(BuyPage.brand).eq(0).click()
    cy.get(BuyPage.dropContainer).eq(0)
   return cy.get(BuyPage.brCar).eq(num).click()
})


Cypress.Commands.add('filterCarModel', (num: number) => {
    cy.get(BuyPage.brand).eq(1).click()
    cy.get(BuyPage.dropContainer).eq(1).scrollTo(0, 600, {ensureScrollable: false}).click()
   return cy.get(BuyPage.brModel).eq(num).click({force: true})
})

Cypress.Commands.add('checkCarTitle', (text: string) => {
    // cy.get
    cy.get(BuyPage.carTitle).should('contain', text)
   
})

Cypress.Commands.add('pickCity', (text: string) => {
    cy.get(BuyPage.otherCityBtn).click()
    cy.get(BuyPage.searchCityField).focus()
    .type(text)
    .type('{enter}')
   
})

Cypress.Commands.add('sortByLow', (num: number) => {
    cy.get(BuyPage.sortBtn).last().click()
    cy.get(BuyPage.lowPriceLink).last()
    .children().eq(num).click({force: true})
   
})