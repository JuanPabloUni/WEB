describe('Productos Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/inicio')
    })
  
    const login = () => {
      cy.get('div.Login-inputs input').eq(0).type('a@gmail.com')
      cy.get('div.Login-inputs input').eq(1).type('123')
      cy.get('.Login-boton button').click()
      cy.wait(2000)
      cy.get('div.Dashboard-OptionRow button').eq(2).click()
    }
  
    it('should display the filter menu when the filter button is clicked', () => {
      login()
      cy.get('.filter-buttonP').click()
      cy.get('.filter-menuP').should('be.visible')
    })
  
    it('should filter the products based on selected price range', () => {
      login()
      cy.get('.filter-buttonP').click()
      cy.get('#priceCheckbox').check()
      cy.get('#minPrice').type('500')
      cy.get('#maxPrice').type('1000')
  
      cy.get('.product-cardP').each(($el) => {
        cy.wrap($el).find('p').contains('Precio').then(($price) => {
          const price = parseFloat($price.text().replace('Precio: $', ''))
          expect(price).to.be.gte(500)
          expect(price).to.be.lte(1000)
        })
      })
    })
  
    it('should display no products message if no products match the price filter', () => {
      login()
      cy.get('.filter-buttonP').click()
      cy.get('#priceCheckbox').check()
      cy.get('#minPrice').type('1')
      cy.get('#maxPrice').type('50')
  
      cy.get('.products-gridP').should('contain', 'No se encontraron')
    })
  
    it('should filter the products based on selected quantity range', () => {
      login()
      cy.get('.filter-buttonP').click()
      cy.get('#quantityCheckbox').check()
      cy.get('#minQuantity').type('10')
      cy.get('#maxQuantity').type('50')
  
      cy.get('.product-cardP').each(($el) => {
        cy.wrap($el).find('p').contains('Cantidad').then(($quantity) => {
          const quantity = parseInt($quantity.text().replace('Cantidad: ', ''))
          expect(quantity).to.be.gte(10)
          expect(quantity).to.be.lte(50)
        })
      })
    })
  
    it('should display no products message if no products match the quantity filter', () => {
      login()
      cy.get('.filter-buttonP').click()
      cy.get('#quantityCheckbox').check()
      cy.get('#minQuantity').type('1000')
      cy.get('#maxQuantity').type('5000')
  
      cy.get('.products-gridP').should('contain', 'No se encontraron')
    })
  
    it('should filter the products based on selected type', () => {
      login()
      cy.get('.filter-buttonP').click()
      cy.get('#typeCheckbox').check()
      cy.get('#typeSelect').select('Fruits')
  
      cy.get('.product-cardP').each(($el) => {
        cy.wrap($el).find('p').contains('Tipo').then(($type) => {
          const type = $type.text().replace('Tipo: ', '').toLowerCase()
          expect(type).to.equal('fruits')
        })
      })
    })
  
    it('should filter the products based on selected season', () => {
      login()
      cy.get('.filter-buttonP').click()
      cy.get('#seasonCheckbox').check()
      cy.get('#seasonSelect').select('March')
  
      cy.get('.product-cardP').each(($el) => {
        cy.wrap($el).find('p').contains('Temporada').then(($season) => {
          const season = $season.text().replace('Temporada: ', '')
          expect(season).to.equal('January')
        })
      })
    })
  
    it('should filter the products based on selected origin', () => {
      login()
      cy.get('.filter-buttonP').click()
      cy.get('#originCheckbox').check()
      cy.get('#originSelect').select('Antioquia')
  
      cy.get('.product-cardP').each(($el) => {
        cy.wrap($el).find('p').contains('Origen').then(($origin) => {
          const origin = $origin.text().replace('Origen: ', '')
          expect(origin).to.equal('Antioquia')
        })
      })
    })
  
    it('should filter the products based on selected availability', () => {
      login()
      cy.get('.filter-buttonP').click()
      cy.get('#availableCheckbox').check()
      cy.get('#availableSelect').select('Yes')
  
      cy.get('.product-cardP').each(($el) => {
        cy.wrap($el).find('p').contains('Disponibilidad').then(($available) => {
          const available = $available.text().replace('Disponibilidad: ', '')
          expect(available).to.equal('Sí')
        })
      })
    })
  })
  