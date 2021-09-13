import { Given, When, Then } from '@cucumber/cucumber';

Given(/^I launch the app$/, function() {
  browser.url(browser.options.baseUrl);
});

Then(/^I expect that the title is "([^"]*)?"$/, function(expectedTitle) {
  const title = browser.getTitle();
  assert.equal(title, expectedTitle, `Found title as '${title}', But expected it to be '${expectedTitle}'`);
});

