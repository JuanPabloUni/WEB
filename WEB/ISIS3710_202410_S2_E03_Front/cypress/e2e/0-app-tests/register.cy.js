describe('Registro Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/registro')
    })
  
    it('should display the initial input values correctly', () => {
      cy.get('input[aria-label="Nombre"]').should('have.attr', 'placeholder', 'Nombre')
      cy.get('input[aria-label="Apellido"]').should('have.attr', 'placeholder', 'Apellido')
      cy.get('input[aria-label="Correo"]').should('have.attr', 'placeholder', 'Correo')
      cy.get('input[aria-label="Contraseña"]').should('have.attr', 'placeholder', 'Contraseña')
    })
  
    it('should clear input value on click if it matches the default value', () => {
      cy.get('input[aria-label="Nombre"]').click().should('have.value', '')
      cy.get('input[aria-label="Apellido"]').click().should('have.value', '')
      cy.get('input[aria-label="Correo"]').click().should('have.value', '')
      cy.get('input[aria-label="Contraseña"]').click().should('have.value', '')
    })
  
    it('should not clear input value on click if it does not match the default value', () => {
      cy.get('input[aria-label="Nombre"]').type('John').click().should('have.value', 'John')
      cy.get('input[aria-label="Apellido"]').type('Doe').click().should('have.value', 'Doe')
      cy.get('input[aria-label="Correo"]').type('john.doe@example.com').click().should('have.value', 'john.doe@example.com')
      cy.get('input[aria-label="Contraseña"]').type('password').click().should('have.value', 'password')
    })
  
    it('should reset input value to default on blur if left empty', () => {
      cy.get('input[aria-label="Nombre"]').click().blur().should('have.attr', 'placeholder', 'Nombre')
      cy.get('input[aria-label="Apellido"]').click().blur().should('have.attr', 'placeholder', 'Apellido')
      cy.get('input[aria-label="Correo"]').click().blur().should('have.attr', 'placeholder', 'Correo')
      cy.get('input[aria-label="Contraseña"]').click().blur().should('have.attr', 'placeholder', 'Contraseña')
    })
  
    it('should select role from the dropdown', () => {
      cy.get('div.Registrar-inputs select').select('agricultor').should('have.value', 'agricultor')
    })
  
    it('should register a new user successfully', () => {
      cy.intercept('POST', 'http://localhost:4000/usuarios', {
        statusCode: 201,
        body: {
          nombre: 'Cypress',
          apellido: 'Cy',
          correo: 'cy@press.com',
          contraseña: '123',
          rol: 'agricultor'
        }
      }).as('postUser')
  
      cy.get('input[aria-label="Nombre"]').clear().type('Cypress')
      cy.get('input[aria-label="Apellido"]').clear().type('Cy')
      cy.get('input[aria-label="Correo"]').clear().type('cy@press.com')
      cy.get('input[aria-label="Contraseña"]').clear().type('123')
      cy.get('div.Registrar-inputs select').select('agricultor')
      cy.get('.Registrar-boton button').click()
  
      cy.wait('@postUser').then(({ response }) => {
        expect(response.statusCode).to.equal(201)
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Usuario agricultor creado exitosamente!')
        })
      })
    })
  
    it('should show an error alert if registration cfails', () => {
      cy.intercept('POST', 'http://localhost:4000/usuarios', {
        statusCode: 400,
        body: {}
      }).as('postUserFail')
  
      cy.get('input[aria-label="Nombre"]').clear()
      cy.get('input[aria-label="Apellido"]').clear()
      cy.get('input[aria-label="Correo"]').clear()
      cy.get('input[aria-label="Contraseña"]').clear()
      cy.get('div.Registrar-inputs select').select('agricultor')
      cy.get('.Registrar-boton button').click()
  
      cy.wait('@postUserFail').then(({ response }) => {
        expect(response.statusCode).to.equal(400)
        cy.on('window:alert', (str) => {
          expect(str).to.equal('No se pudo crear el usuario correctamente')
        })
      })
    })
  })
  