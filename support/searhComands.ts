
import {MainPage} from '../objects/mainPage'
import {ResultPage} from '../objects/resultPage'
import {CarPage} from '../objects/carPage'

Cypress.Commands.add('typeRequest', (text: string) => {
    cy.get(MainPage.searchField).type(text)  
    cy.get(MainPage.searchBtn).click()
})

Cypress.Commands.add('checkResult', (text: string)=> {
   cy.get(ResultPage.resBlock).should('have.length', 20)
   .each(() => {
    cy.get(ResultPage.blockTitle).should('contain', text)
   })
})

Cypress.Commands.add('getChild', (num: number) => {
    cy.get(MainPage.logoContainer)
    .children()
    .eq(num)
    .click()    
})

Cypress.Commands.add('filterModel', (modl: string) => {
  const mod =  cy.get(CarPage.model).select(modl)
  return mod
      
})

Cypress.Commands.add('filterGeneration', (generation: string) => {
  const gen = cy.get(CarPage.generation).select(generation)
  return gen      
})

Cypress.Commands.add('sortBy', (num: number) => {
    cy.get(CarPage.sortBtn)
    .eq(num)
    .click()
})