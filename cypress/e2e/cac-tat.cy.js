/// <reference types="Cypress"/>
/// .type('')

describe('Central de atendimento', () => {

    beforeEach('Visit', () => {
      cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    })

    it('Fill Correct', () => {
      const longText = 'Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso.'
      cy.contains('CAC TAT')
      cy.get('#firstName').type('Duda')
      cy.get('#lastName').type('Matiussi')
      cy.get('#email').type('joao@gmail.com')
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.contains('button', 'Enviar').click()
      cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
    })

    it('Fill Incorrect', () => {
      const longText = 'Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso.'
      cy.get('#firstName').type('Duda')
      cy.get('#lastName').type('Matiussi')
      cy.get('#email').type('joao')
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.get('.button').click()
      cy.get('.error').should('be.visible')
    })

    it('Fill Incorrect Phone', () => {
      const longText = 'Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso.'
      cy.get('#firstName').type('Duda')
      cy.get('#lastName').type('Matiussi')
      cy.get('#email').type('joao@gmail.com')
      cy.get('#phone').type('phone').should('have.value', '')
    })

    
    it('Exibe mensagem de erro', () => {
      const longText = 'Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso.'
      cy.get('#firstName').type('Duda')
      cy.get('#lastName').type('Matiussi')
      cy.get('#email').type('joao@gmail.com')
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.get('#phone-checkbox').click()
      cy.get('.button').click()
      cy.get('.error').should('be.visible')
    })
    
    it('Clear', () => {
      cy.get('#firstName').type('Duda').should('have.value', 'Duda')
      cy.get('#lastName').type('Matiussi').should('have.value', 'Matiussi')
      cy.get('#email').type('joao@gmail.com').should('have.value', 'joao@gmail.com')


      cy.get('#firstName').clear().should('have.value', '')
      cy.get('#lastName').clear().should('have.value', '')
      cy.get('#email').clear().should('have.value', '')
    })

    it('Message error', () => {
      cy.get('.button').click()
      cy.get('.error').should('be.visible')
    })

    it('Fill Correct', () => {
      const longText = 'Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso.'
      cy.fillInfos()
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.get('.button').click()
      cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
    })

    it('Select itens', () => {
      const longText = 'Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso.'
      cy.fillInfos()
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.get('#product').select('YouTube').should('have.value', 'youtube')
      cy.get('.button').click()
      cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
    })

    it('Select itens extra 1', () => {
      const longText = 'Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso.'
      cy.fillInfos()
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
      cy.get('.button').click()
      cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
    })

    it('Select itens extra 2', () => {
      const longText = 'Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso.'
      cy.fillInfos()
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.get('#product').select(1).should('have.value', 'blog')
      cy.get('.button').click()
      cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
    })

    it('Inputs Radios', () => {
      const longText = 'Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso. Mensagem enviada com sucesso.'
      cy.fillInfos()
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.get(':nth-child(3) > input').check().should('have.value', 'elogio')
    })

    it('Inputs Radios extra 1', () => {
      cy.get('input[type="radio"] ').check()
      .each(($radio) =>{
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
    })

    
    it('Inputs Radios extra 1', () => {
      cy.get('#phone-checkbox').check().should('be.checked')
      cy.get('.phone-label-span').should('be.visible')
      cy.get('#phone-checkbox').uncheck().should('not.be.checked')
      cy.get('#email-checkbox').check()
    })

    it('Upload de arquivos', () => {
      cy.get('#file-upload').selectFile('cypress/fixtures/cypress.png')
    })

    it('Upload de arquivos - Drag e Drop', () => {
      cy.get('#file-upload').selectFile('cypress/fixtures/cypress.png', {action: 'drag-drop'})
    })

    it('Upload de arquivos - Alias', () => {
      cy.fixture('cypress.png').as('fileExample')
      cy.get('#file-upload').selectFile('@fileExample')
    })

    it.only('Testar links', () => {
      cy.get('a').invoke('removeAttr', 'target').click()
      cy.contains('CAC TAT - Política de privacidade')
    })
})