// index.js
import homePage from('./pageObjects/homePage');
import productPage from('./pageObjects/productPage');
import cartPage from('./pageObjects/cartPage');

describe('Board Game Store', () => {

  let homePage;
  let productPage;
  let cartPage;

  before(async () => {
    homePage = new HomePage();
    productPage = new ProductPage();
    cartPage = new CartPage();
    await browser.url('./collections/galda-speles');
  });
  
  it('Load the board game store and accept cookies', async () => {
    await browser.url('./collections/galda-speles');  // Navigate to the website
    await homePage.acceptCookies(); // Accept cookie files
    expect(await homePage.getTitle()).toBe('Galda spēles — Brain Games');
  });

  it('Search for the "Catan" board game', async () => {
    await homePage.searchForGame("Catan");
  });
    
  it('Open "Catan Jūrasbraucēji" card and add to cart', async () => {
    expect(await productPage.firstResult.isDisplayed()).toBe(true);
    await productPage.openFirstResult();
    await productPage.addItemToCart();
  });

  it('Check if item exists in cart and price is correct', async () => {
    await cartPage.viewCart();
    await cartPage.navigateToCart();
    expect(await cartPage.isItemDisplayed()).toBe(true);
    expect(await cartPage.getItemPrice()).toContain('44.95 €');
  });
});
