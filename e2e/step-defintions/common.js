import { Given, When, Then } from '@cucumber/cucumber';

Given(/^I launch the app$/, function() {
  browser.url(browser.options.baseUrl);
});

Then(/^I expect that the title is "([^"]*)?"$/, function(expectedTitle) {
  const title = browser.getTitle();
  expect(title).toEqual(expectedTitle);
});

