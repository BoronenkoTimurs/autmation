class ProductPage {
  get firstResult() { return $('*=Catan: Jūrasbraucēji'); }
  get catanLink() { return $('a[href="/products/catan-jurasbrauceji-paplasinajums-galda-spele"][tabindex="1"]'); }
  get addItemBtn() { return $('button[data-product-atc]'); }
  get bannerTitle() { return $('.atc-banner--product-title'); }

  async openFirstResult() {
    await this.catanLink.waitForDisplayed();
    await this.catanLink.waitForClickable();
    await this.catanLink.click();
  }

  async addItemToCart() {
    await this.addItemBtn.click();
    await browser.waitUntil(
      async () => (await this.bannerTitle.isDisplayed()),
      {
        timeout: 5000,
        timeoutMsg: 'Expected the confirmation banner to be visible after 5 seconds'
      }
    );
  }
}

module.exports = new ProductPage();