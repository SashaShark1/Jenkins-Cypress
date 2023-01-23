declare global{
    namespace Cypress {
        interface Chainable {
            filterBrand (num: number): Cypress.Chainable<JQuery<HTMLElement>>;
            filterCarModel (num: number): Cypress.Chainable<JQuery<HTMLElement>>;
            checkCarTitle (text: string): void;
            pickCity(text: string): void;
            sortByLow (num: number): void;
        }
    }
}

export {};