const  { Builder, Browser, By, until } = require('selenium-webdriver')
const assert = require('assert')

const runTest = async (name, test) => {
  try {
    await test();
    console.log(`Success ${name}`);
  } catch (err) {
    console.error(`Failed ${name}`);
    console.error(err);
  }
}
const main = async () => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  
  const tests = [
    {
      name: 'Load the Brain Games store in galda-speles section',
      test: async () => {
        await driver.get('https://www.brain-games.lv/collections/galda-speles');
        
        const cookieAcceptBtn = await driver.wait(until.elementLocated(By.css('[aria-label="allow cookies"]')), 5000);
        await cookieAcceptBtn.click();

        const title = await driver.getTitle();
        assert.strictEqual(title, 'Galda spēles — Brain Games');
      }
    },
    {
      name: 'Search fro the "Catan" board game',
      test: async () => {
        const searchBarBox = await driver.findElement(By.css('[aria-label="Meklēt"]'));
        await searchBarBox.sendKeys('Catan');

        const searchBarBtn = await driver.findElement(By.css('button[type="submit"]'));
        await searchBarBtn.click();
      }
    },
    {
      name: 'Open "Catan Jūrasbraucēji" card',
      test: async () => {
        const firstResult = await driver.findElement(By.xpath('//*[contains(text(),"Catan: Jūrasbraucēji")]'));
        const isDisplayed = await firstResult.isDisplayed();
        assert.strictEqual(isDisplayed, true);
        
        const catanLink = await driver.findElement(By.css('a[href="/products/catan-jurasbrauceji-paplasinajums-galda-spele"][tabindex="1"]'));
        await driver.wait(until.elementIsEnabled(catanLink), 5000);
        await driver.wait(until.elementIsVisible(catanLink), 5000);
        
        await catanLink.click();
      }
    },
    {
      name: 'Add this item into cart',
      test: async () => {
        const addItem = await driver.findElement(By.css('button[data-product-atc]'));
        await addItem.click();
        
        const banner = await driver.wait(until.elementLocated(By.css('section[role="log"][data-atc-banner][data-animation-state="open"]')), 5000);
        await driver.wait(until.elementIsVisible(banner), 5000);

        const bannerTitle = await driver.findElement(By.css('.atc-banner--product-title'));
        await driver.wait(until.elementIsEnabled(bannerTitle), 3000);
      }
    },
    {
      name: 'Check if item exist in the cart',
      test: async () => {
        const viewCart = await driver.findElement(By.xpath("//a[contains(text(), 'Apskatīt grozu')]"));
        await driver.wait(until.elementIsEnabled(viewCart), 5000)
        await viewCart.click();
        
        const itemInCart = await driver.findElement(By.css('[data-samitapbl-handle="catan-jurasbrauceji-paplasinajums-galda-spele"]'));
        const isDisplayed = await itemInCart.isDisplayed();
        assert.strictEqual(isDisplayed, true);
        
        const priceElement = await driver.findElement(By.css('.saso-cart-item-line-price .money'));
        const price = await priceElement.getText();
        assert.ok(price.includes('44.95 €'));

      }
    },

  ]

  for(const test of tests){
    await runTest(test.name, test.test);
  }
  await driver.quit();
};

main();