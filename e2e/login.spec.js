describe('Login test', () => {
  
    it('should have text fields and buttons rendered on screen', async () => {
        await expect(element(by.id('emailTest')).typeText('transtest@gmail.com'));
        await expect(element(by.id('passwordTest')).typeText('transtest1'));
        await expect(element(by.id('loginButton'))).toBeVisible();
      });
   
    it('should allow users to enter text', async () => {
        await element(by.id('emailTest')).typeText('transtest@gmail.com');
        await element(by.id('passwordTest')).typeText('transtest1');
    });

    it('should log user in', async () => {
        await element(by.id('loginButton')).tap();
    });
    
  
  });