import { CarPage } from "../objects/carPage"
import { MainPage } from "../objects/mainPage"

describe('E2e tests', () => {
  // beforeEach(()=> {
  //   cy.visit(MainPage.url)
  // })

      it('Check search results', () => {
        cy.visit(MainPage.url)
        cy.typeRequest('Как отрегулировать фары')
        cy.url().should('include', 'https://www.drive2.ru/search')       
        cy.checkResult('фар')
      })

      it('Search logo lead to relevant result', () => {  
      cy.visit(MainPage.url)  
      cy.getChild(3)
      cy.get(CarPage.carTitle).should('have.text', 'Renault')  
      cy.get(CarPage.brand).should('have.value', 'renault')
      })

      it('Filter by model and generation', () => {    
        cy.visit(CarPage.url) 
        cy.filterModel('Logan').should('have.value', '1556')
        cy.filterGeneration('Logan (2G) (2012)').should('have.value', '4096')
        cy.get(CarPage.showBtn).click()
        cy.get(CarPage.cardTitle).should('contain.text', 'Renault Logan')
      })

      it('Sort by likes is avalible', () => {    
        cy.visit(CarPage.url) 
        cy.sortBy(0)
          let arr: (string)[] = []
        cy.get(CarPage.likeCounter).then(res => {
          const newarr =  Array.from(res)
          newarr.map(item => {   
            arr.push(item.innerHTML as string)   
          })
          const numArr = arr.map(item =>  +item)
          const newArr = arr.sort((a, b) => +b - +a).map(item => +item)
      
          expect(numArr).deep.equal(newArr)
          }) 
      })

      it(`Button "Все марки машин" is hidden when button "Все марки" is active`, () => {    
        cy.visit(MainPage.url)  
        cy.get(MainPage.allModelsBtn).last().click()
        .should('contain', 'Все марки')
        .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.07)')
        cy.get(MainPage.modelContainer).children()
        .should('have.length.at.least', 160)
        cy.get(MainPage.addModel)
        .should('be.hidden')
        .and('have.css', 'display', 'none')
      })

      it(`Button "Все марки" is active after click "Все марки машин" button `, () => {    
        cy.visit(MainPage.url)  
        cy.get(MainPage.addModel).click()
        .should('be.hidden')

        cy.get(MainPage.allModelsBtn).last()
        .should('contain', 'Все марки')    
        .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.07)')   
        .and('have.css', 'color', 'rgb(51, 51, 51)')   
      })

      it(`Implement intercept to search`, () => {
        const text = 'Как отрегулировать фары'
        cy.visit(MainPage.url)
        cy.intercept(`**//mc.yandex.ru/watch/33911514/1**`).as('searchRequest')
        cy.typeRequest(text)
        cy.wait('@searchRequest')
      })



})