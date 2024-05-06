class CartPage {
  get viewCartBtn() { return $('*=Apskatīt grozu'); }
  get itemInCart() { return $('a[href*="catan-jurasbrauceji-paplasinajums-galda-spele"]'); }
  get price() { return $('.saso-cart-item-price'); }

  async viewCart() {
    await this.viewCartBtn.waitForEnabled();
    await this.viewCartBtn.click();
  }

  async navigateToCart() {
    await browser.url('/cart');
  }

  async getItemPrice() {
    return await this.price.getText();
  }

  async isItemDisplayed() {
    return await this.itemInCart.isDisplayed();
  }
}

module.exports = new CartPage();