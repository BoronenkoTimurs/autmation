// pageObjects/homePage.js
class HomePage {
  get cookieAcceptBtn() { return $('[aria-label="allow cookies"]'); }
  get searchBarBox() { return $('[aria-label="Meklēt"]'); }
  get searchBarBtn() { return $('button[type="submit"]'); }

  async acceptCookies() {
    await this.cookieAcceptBtn.click();
  }

  async searchForGame(gameName) {
    await this.searchBarBox.setValue(gameName);
    await this.searchBarBtn.click();
  }

  async getTitle() {
    return browser.getTitle();
  }
}

module.exports = new HomePage();



