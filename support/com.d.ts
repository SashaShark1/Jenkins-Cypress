declare global{
    namespace Cypress {
        interface Chainable {
            typeRequest(text: string): void;
            checkResult(text: string): void;
            getChild (num: number): void;
            filterModel (modl: string): Cypress.Chainable<JQuery<HTMLElement>>;
            filterGeneration (generation: string): Cypress.Chainable<JQuery<HTMLElement>>;
            sortBy (num: number): void;
           
        }
    }
}

export {};