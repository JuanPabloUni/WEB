describe('Dashboard Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/inicio')
    })
  
    const login = () => {
      cy.get('div.Login-inputs input').eq(0).type('a@gmail.com')
      cy.get('div.Login-inputs input').eq(1).type('123')
      cy.get('.Login-boton button').click()
    }
  
    it('should navigate to Productos Agricolas page when clicked', () => {
      login()
      cy.wait(2000)
      cy.get('div.Dashboard-OptionRow button').eq(0).click()
      cy.url().should('include', '/ProdArtesanos')
    })
  
    it('should navigate to Artesanias Cliente page when clicked', () => {
      login()
      cy.wait(2000)
      cy.get('div.Dashboard-OptionRow button').eq(1).click()
      cy.url().should('include', '/artesaniasCliente')
    })

    it('should navigate to Productos Clientes page when clicked', () => {
        login()
        cy.wait(2000)
        cy.get('div.Dashboard-OptionRow button').eq(2).click()
        cy.url().should('include', '/productosCliente')
      })

        it('should navigate to Recorridos page when clicked', () => {
            login()
            cy.wait(2000)
            cy.get('div.Dashboard-OptionRow button').eq(3).click()
            cy.url().should('include', '/Recorridos')
        })
    
        it('should navigate to Todos los Recorridos page when clicked', () => {
            login()
            cy.wait(2000)
            cy.get('div.Dashboard-OptionRow button').eq(4).click()
            cy.url().should('include', '/Recorridos')
        })

        it('should navigate to Hospedajes page when clicked', () => {
            login()
            cy.wait(2000)
            cy.get('div.Dashboard-OptionRow button').eq(5).click()
            cy.url().should('include', '/Hospedajes')
        })

        it('should navigate to Todos los Hospedajes page when clicked', () => {
            login()
            cy.wait(2000)
            cy.get('div.Dashboard-OptionRow button').eq(6).click()
            cy.url().should('include', '/Hospedajes')
        })
    
  })
  