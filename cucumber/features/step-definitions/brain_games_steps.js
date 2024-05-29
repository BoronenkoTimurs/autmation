const { Given, When, Then } = require('@wdio/cucumber-framework');
const assert = require('assert');

Given('I am on the galda-speles collection page', async () => {
    await browser.url('./collections/galda-speles');
});

When('I accept cookies', async () => {
    const cookieAcceptBtn = await browser.$('[aria-label="allow cookies"]');

    await cookieAcceptBtn.click();
});

Then('the page title should be {string}', async (expectedTitle) => {
    const title = await browser.getTitle();

    assert.strictEqual(title, expectedTitle);
});

Given('I have searched for "Catan"', async () => {
    const currentUrl = await browser.getUrl();

    assert.strictEqual(currentUrl, 'https://www.brain-games.lv/search?q=Catan');
});

When('I search for {string}', async (game) => {
    const searchBarBox = await browser.$('[aria-label="Meklēt"]');
    await searchBarBox.setValue(game);

    const searchBarBtn = await browser.$('button[type="submit"]');
    await searchBarBtn.click();
});

Then('I should see search results for {string}', async (game) => {
    const firstResult = await browser.$(`*=${game}`);
    const isDisplayed = await firstResult.isDisplayed();

    assert.strictEqual(isDisplayed, true);
});

Given('I am on the "Catan Jūrasbraucēji" game page', async () => {
    const currentUrl = await browser.getUrl();

    assert.strictEqual(currentUrl, 'https://www.brain-games.lv/products/catan-jurasbrauceji-paplasinajums-galda-spele');
})

When('I open the "Catan: Jūrasbraucēji" game card', async () => {
    const gameCard = await browser.$('a[href="/products/catan-jurasbrauceji-paplasinajums-galda-spele"][tabindex="1"');
    
    await gameCard.waitForDisplayed();
    await gameCard.waitForClickable();
    await gameCard.click();
});

Then('the game card should be displayed', async () => {
    const gameCard = await browser.$('.product-title');
    const isDisplayed = await gameCard.isDisplayed();

    assert.strictEqual(isDisplayed, true);
});

When('I add the item to the cart', async () => {
    const addItem = await browser.$('button[data-product-atc]');
    await addItem.click();

    await browser.waitUntil(
        async () => {
            const bannerTitle = await browser.$('.atc-banner--product-title');
            const isDisplayed = await bannerTitle.isDisplayed();
            return await isDisplayed;
        },
        {
            timeout: 5000,
            timeoutMsg: 'Expected that the banner should be visible after 5 seconds'
        }
    );
});

Then('the item count in the cart is uqual "1"', async () => {
    const cartItemCount = await browser.$('.site-header-cart--count.visible');
    const actualCount = await cartItemCount.getAttribute('data-header-cart-count');

    assert.strictEqual(actualCount, '1');
});

Given('I have added the item to the cart', async () => {
    const currentUrl = await browser.getUrl();

    assert.strictEqual(currentUrl, 'https://www.brain-games.lv/products/catan-jurasbrauceji-paplasinajums-galda-spele');
});

When('I open the cart', async () => {
    const viewCartBtn = await browser.$('*=Apskatīt grozu');

    await viewCartBtn.waitForEnabled();
    await viewCartBtn.click();
    
    await browser.url('/cart');
});

Then('the cart should contain "Catan Jūrasbraucēji" with a price of {string}', async (expectedPrice) => {
    const gameName = "catan-jurasbrauceji-paplasinajums-galda-spele";

    const itemInCart = await browser.$(`a[data-samitapbl-handle="${gameName}"]`);
    const isDisplayed = await itemInCart.isDisplayed();

    assert.strictEqual(isDisplayed, true);

    const price = await browser.$('.saso-cart-item-price').getText();

    assert.strictEqual(price.trim(), expectedPrice.trim());
});
