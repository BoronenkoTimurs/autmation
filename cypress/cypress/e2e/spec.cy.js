describe('Add Catan game to the cart in the store', () => {
  beforeEach(() => {
    cy.visit('https://www.brain-games.lv/collections/galda-speles');
    cy.get('[aria-label="allow cookies"]').click();
    cy.title().should('eq', 'Galda spēles — Brain Games');
  });
    
  it('Search for the "Catan" board game, add to cart and check the cart', () => {
    cy.get('input[aria-label="Meklēt"]').type('Catan'); 
    cy.get('button[type="submit"]').click();

    cy.get('a[href="/products/catan-jurasbrauceji-paplasinajums-galda-spele"][tabindex="1"]')
      .should('be.visible')
      .click();

    cy.get('button[data-product-atc]').click();
    cy.get('.atc-banner--product-title').should('be.visible');

    cy.contains('a', 'Apskatīt grozu').click();
    cy.url().should('include', '/cart');  
    cy.get('a[href*="catan-jurasbrauceji-paplasinajums-galda-spele"]').should('be.visible');
    cy.get('.saso-cart-item-price').contains('44.95 €');
  });
});
