describe('Artesanias Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/inicio')
    })
  
    const login = () => {
      cy.get('div.Login-inputs input').eq(0).type('a@gmail.com')
      cy.get('div.Login-inputs input').eq(1).type('123')
      cy.get('.Login-boton button').click()
      cy.wait(2000)
      cy.get('div.Dashboard-OptionRow button').eq(1).click()
    }
  
    it('should display the filter menu when the filter button is clicked', () => {
      login()
      cy.get('.filter-buttonA').click()
      cy.get('.filter-menuA').should('be.visible')
    })
  
    it('should filter the handicrafts based on selected filters', () => {
      login()
      cy.get('.filter-buttonA').click()
      cy.get('#priceCheckbox').check()
      cy.get('#minPrice').type('10')
      cy.get('#maxPrice').type('50')
  
      cy.get('.handicraft-cardA').each(($el) => {
        cy.wrap($el).find('p').contains('Precio').then(($price) => {
          const price = parseFloat($price.text().replace('Precio: $', ''))
          expect(price).to.be.gte(10)
          expect(price).to.be.lte(50)
        })
      })
    })
  
    it('should display no handicrafts message if no handicrafts match the filter', () => {
      login()
  
      cy.get('.filter-buttonA').click()
      cy.get('#priceCheckbox').check()
      cy.get('#minPrice').type('1000')
      cy.get('#maxPrice').type('5000')
  
      cy.get('.handicrafts-gridA').should('contain', 'No se encontraron')
    })
  
    it('should filter the handicrafts based on selected quantity filters', () => {
        login()
        
    
        cy.get('.filter-buttonA').click()
        cy.get('#quantityCheckbox').check()
        cy.get('#minQuantity').type('10')
        cy.get('#maxQuantity').type('50')
    
        cy.get('.handicraft-cardA').each(($el) => {
          cy.wrap($el).find('p').contains('Cantidad').then(($quantity) => {
            const quantity = parseInt($quantity.text().replace('Cantidad: ', ''))
            expect(quantity).to.be.gte(10)
            expect(quantity).to.be.lte(50)
          })
        })
      })
    
      it('should display no handicrafts message if no handicrafts match the quantity filter', () => {
        login()
        
    
        cy.get('.filter-buttonA').click()
        cy.get('#quantityCheckbox').check()
        cy.get('#minQuantity').type('1000')
        cy.get('#maxQuantity').type('5000')
    
        cy.get('.handicrafts-gridA').should('contain', 'No se encontraron')
      })
    
      it('should filter the handicrafts based on selected type filter', () => {
        login()
        
    
        cy.get('.filter-buttonA').click()
        cy.get('#typeCheckbox').check()
        cy.get('#typeSelect').select('embroidery')
    
        cy.get('.handicraft-cardA').each(($el) => {
          cy.wrap($el).find('p').contains('Tipo').then(($type) => {
            const type = $type.text().replace('Tipo: ', '').toLowerCase()
            expect(type).to.equal('bordado')
          })
        })
      })
    
      it('should filter the handicrafts based on selected material filter', () => {
        login()
        
    
        cy.get('.filter-buttonA').click()
        cy.get('#materialCheckbox').check()
        cy.get('#materialSelect').select('cotton')
    
        cy.get('.handicraft-cardA').each(($el) => {
          cy.wrap($el).find('p').contains('Material').then(($material) => {
            const material = $material.text().replace('Material: ', '')
            expect(material).to.equal('algodón')
          })
        })
      })
    
      it('should filter the handicrafts based on selected origin filter', () => {
        login()
        
    
        cy.get('.filter-buttonA').click()
        cy.get('#originCheckbox').check()
        cy.get('#originSelect').select('Antioquia')

        cy.get('.handicraft-cardA').each(($el) => {
          cy.wrap($el).find('p').contains('Origen').then(($origin) => {
            const origin = $origin.text().replace('Origen: ', '')
            expect(origin).to.equal('Antioquia')
          })
        })
      })
    
      it('should filter the handicrafts based on selected availability filter', () => {
        login()
        
    
        cy.get('.filter-buttonA').click()
        cy.get('#availableCheckbox').check()
        cy.get('#availableSelect').select('Yes')
    
        cy.get('.handicraft-cardA').each(($el) => {
          cy.wrap($el).find('p').contains('Disponibilidad').then(($available) => {
            const available = $available.text().replace('Disponibilidad: ', '')
            expect(available).to.equal('Sí')
          })
        })
      })

  })
  