
describe('Home screen', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('button visibility', async () => {
        await expect(element(by.text('GET STARTED'))).toBeVisible();
    });

    it('tap get started button', async () => {
      await element(by.text('GET STARTED')).tap();
      await expect(element(by.text('TAKE THE QUIZ'))).toBeVisible();

  });

  it('tap take the quiz button', async () => {
    await element(by.text('TAKE THE QUIZ')).tap();
    await expect(element(by.text('You like being curious'))).toBeVisible();

});

  
  
    // it('shows "Hi!" after tapping "Click me"', async () => {
    //   await element(by.id('click-me-button')).tap();
    //   await expect(element(by.text('Hi!'))).toBeVisible();
    // });
  });