/// <reference types="cypress"/>

describe('US001: Funcionalidade: Busca de filmes', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    afterEach(() => {
        cy.screenshot()
    })

    it('Deve buscar filme com sucesso', () => {
        cy.get('#search-input').type('Matrix')
        cy.get('#search-button').click()
        cy.get('#results-section').should('contain', 'Matrix')
    })

    it('Deve buscar filmes com sucesso de uma lista', () => {
        cy.fixture('filmes').then((filmes) => {
            cy.get('#search-input').type(filmes[2].titulo)
            cy.get('#search-button').click()
            cy.get('#results-section').should('contain', filmes[2].titulo)
        })
    })

    it('Deve buscar filmes com sucesso da lista inteira', () => {
        cy.fixture('filmes').each((filmes) => {
            cy.get('#search-input').clear().type(filmes.titulo)
            cy.get('#search-button').click({ force: true })
            cy.get('#results-section').should('contain', filmes.titulo)
        })
    })
})