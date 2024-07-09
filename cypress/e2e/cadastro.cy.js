/// <reference types="cypress"/>

describe('US-012 - Funcionalidade: Cadastro de membros', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  afterEach(() => {
    cy.screenshot()
  })

  it('Deve fazer o cadastro de campos obrigatórios', () => {
    var email = `victor${Date.now()}@email.com`
    cy.preencherCadastro("Victor", "Pansardis", email, "12323215154", "Senha@1234")
    cy.get('#signup-response').should('contain', 'Cadastro realizado com sucesso!')
  })

  it('Deve validar mensagem de erro com o campo nome inválido', () => {
    cy.preencherCadastro("Victor123", "Pansardis", 'teste@email.com', "12323215154", "Senha@1234")
    cy.get('#signup-response').should('contain', 'Nome deve conter apenas caracteres alfabéticos')
  })

  it('Validação do formato do email inválido', () => {
    cy.preencherCadastro("Victor", "Pansardis", "victor.email.com", "1234567891", "SenhaForte@123")
    cy.get('#signup-response').should('contain', 'E-mail deve ser um email válido')
  })

  it('Validação de envio sem preencher campos obrigatórios - Nome', () => {
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'Nome não pode estar vazio')
  })

  it('Validação de envio sem preencher campos obrigatórios - Sobrenome', () => {
    cy.get('#signup-firstname').type("Victor")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'Sobrenome não pode estar vazio')
  })

  it('Validação de envio sem preencher campos obrigatórios - Email', () => {
    cy.get('#signup-firstname').type("Victor")
    cy.get('#signup-lastname').type("Pansardis")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'E-mail não pode estar vazio')
  })

  it('Validação de envio sem preencher campos obrigatórios - Senha', () => {
    cy.get('#signup-firstname').type("Victor")
    cy.get('#signup-lastname').type("Pansardis")
    cy.get('#signup-email').type("victor@email.com")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'is not allowed to be empty')
  })

  it('Validação de bloqueio de senha fraca', () => {
    cy.preencherCadastro("Victor", "Pansardis", 'teste@email.com', "12323215154", "senha")
    cy.get('#signup-response').should('contain', 'Senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial (!@#$&*)')
  })
})