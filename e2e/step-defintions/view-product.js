import { Given, When, Then } from '@cucumber/cucumber';

Then(/^I should see the product loaded$/, function() {
  $('.product').waitForDisplayed({
    timeout: 2000
  });

  const productName = $('.product .title').getText();
  const productDescription = $('.product .description').getText();
  const productPrice = $('.product .price').getText();

  expect(productName).toEqual('The Minimalist Entrepreneur');
  expect(productDescription).toEqual('How Great Founders Do More with Less');
  expect(productPrice).toEqual('$49.00');
});

