describe('Open website and wait', () => {
  it('should open the site and wait for 2 seconds', async () => {
      await browser.url('./');  // Navigate to the website
      await browser.pause(2000);  // Wait for 2000 milliseconds
  });
});