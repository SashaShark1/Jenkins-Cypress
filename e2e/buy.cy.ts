
import { BuyPage } from "../objects/buyCarPage"

describe('E2e tests', () => {
  // beforeEach(()=> {
  // 
  // })

  it('Page title change according to search result', () => {
    cy.visit(BuyPage.url)
    cy.filterBrand(5).should('contain', 'Honda')
    cy.get(BuyPage.showBtn).click()
    cy.get(BuyPage.pageTitle).should('have.text', 'Продажа Honda')
  })

  it('Filter brand and model represent valid data', () => {
    cy.visit(BuyPage.url)
    cy.filterBrand(4)
    cy.filterCarModel(10)
    cy.get(BuyPage.showBtn).click()
    cy.checkCarTitle('Nissan Avenir')   
  })

  it('Button "Очистить всё" cleans all field', () => {
    cy.visit(BuyPage.url)
    cy.filterBrand(12).should('contain', 'Brilliance')
    cy.filterCarModel(7)
    cy.get(BuyPage.showBtn).click()
    cy.get(BuyPage.inputModel).eq(1).should('contain', 'M1')
    cy.get(BuyPage.cleanBtn).click()
    cy.get(BuyPage.inputModel).should('contain', '')
  })
  
  it('Input field "Модель" is disabled until picking brand', () => {
    cy.visit(BuyPage.url)
    cy.get(BuyPage.brand).eq(1).should('have.attr', 'disabled')
    cy.filterBrand(5)
    cy.get(BuyPage.brand).eq(1).should('not.have.attr', 'disabled')
  })

  it('Input field "Поколение" is disabled until picking model', () => {
    cy.visit(BuyPage.url)    
    cy.filterBrand(5)
    cy.get(BuyPage.generation).eq(0).should('have.attr', 'disabled')
    cy.filterCarModel(1)
    cy.get(BuyPage.generation).eq(0).should('not.have.attr', 'disabled')
  })

  it('Pick city', () => {
    cy.visit(BuyPage.url)    
    cy.pickCity('Смоленская область')
    cy.get(BuyPage.pageTitle).should('have.text', 'Продажа автомобилей в Смоленской области')
    })

  it('Car description contain picking city', () => {
    cy.visit(BuyPage.url)    
    cy.pickCity('Смоленская область')
    cy.get(BuyPage.cityBtn).click()
    cy.get(BuyPage.location).should('contain', 'Смоленск')
  })

  it('Sort by cheap', () => {
    cy.visit(BuyPage.url)    
    cy.sortByLow(2)
    cy.get(BuyPage.carPrice)
    .then(res => {
        const arrRes = [...res]
        let strArr: string[] = []
        arrRes.map(item => {
            strArr.push(item.innerText as string)
        })
            let numbArr = strArr.map(item => {
            return +item.replace(/\s/g, '')
            })    
                for(let i = 0; i < numbArr.length -1; i++) {
                expect(numbArr[i]).not.to.be.gt(numbArr[i+1])
                }
            })
        })
})