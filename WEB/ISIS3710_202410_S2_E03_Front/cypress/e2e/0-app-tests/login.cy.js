describe('Inicio Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/inicio') // Assuming your component is rendered at the root URL
    })
  
    it('should allow login with correct credentials', () => {
      cy.get('div.Login-inputs input').eq(0).type('a@gmail.com')
      cy.get('div.Login-inputs input').eq(1).type('123')
      cy.get('.Login-boton button').click()
      cy.url().should('contain', 'http://localhost:3000/Dashboard/')
    })
  
    it('should display error message for incorrect credentials', () => {
      cy.get('div.Login-inputs input').eq(0).type('invalid@example.com')
      cy.get('div.Login-inputs input').eq(1).type('invalidpassword')
      cy.get('.Login-boton button').click()
      cy.on('window:alert',(txt)=>{
        expect(txt).to.contains('incorrectos');
        })
        });
    })
  