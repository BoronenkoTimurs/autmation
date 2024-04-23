describe('Open website and wait', () => {
  it('Load the board game store in "galda-speles" section', async () => {
    await browser.url('./collections/galda-speles');  // Navigate to the website
  
    const cookieAcceptBtn = await browser.$('[aria-label="allow cookies"]');
    await cookieAcceptBtn.click(); // Accept cookie files

    const title = await browser.getTitle()
    expect(title).toBe('Galda spēles — Brain Games'); //Make sure its correct page

  });

  it('Search for the "Catan" board game', async () => {
    const searchBarBox = await browser.$('[aria-label="Meklēt"]')
    await searchBarBox.setValue("Catan") //Write the value into search bar
      
    const searchBarBtn = await browser.$('button[type="submit"]')
    await searchBarBtn.click();

  });
    
  it('Open "Catan Jūrasbraucēji" card', async () => {
    const firstResult = await browser.$('*=Catan: Jūrasbraucēji');
    const isDisplayed = await firstResult.isDisplayed();
    expect(isDisplayed).toBe(true) //Make sure that this element is Displayed on the page
    
    /*
    Good practice to wait for element will be displayed and clickable
    */
    const catanLink = await browser.$('a[href="/products/catan-jurasbrauceji-paplasinajums-galda-spele"][tabindex="1"]');
    await catanLink.waitForDisplayed();
    await catanLink.waitForClickable();
    await catanLink.click()
  });

  it('Add this item into cart', async () => {
    const addItem = await browser.$('button[data-product-atc]')
    await addItem.click()

    /*
      Here we do req to the server and for this we should wait 
    */
    await browser.waitUntil(
      async () => {
        const bannerTitle = await browser.$('.atc-banner--product-title');
        const isDisplayed = await bannerTitle.isDisplayed()
        return await isDisplayed;
      },
      {
        timeout: 5000,
        timeoutMsg: 'Expected the confirmation banner to be visible after 5 seconds'
      }
    );
  });

  it('Check if item exist in cart ', async () => {
    const viewCartBtn = await browser.$('*=Apskatīt grozu');
    await viewCartBtn.waitForEnabled();
    await viewCartBtn.click();

    await browser.url('/cart');  // Make sure you navigate to the cart page

    const itemInCart = await browser.$('a[href*="catan-jurasbrauceji-paplasinajums-galda-spele"]');
    const isDisplayed = await itemInCart.isDisplayed();
    expect(isDisplayed).toBe(true);

    const price = await browser.$('.saso-cart-item-price').getText();
    expect(price).toContain('44.95 €'); //Chekc if price are correct
  });
});