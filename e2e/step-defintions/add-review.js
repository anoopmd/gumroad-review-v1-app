import { Then } from '@cucumber/cucumber';
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

let gReviewComment = '';

Then(/^the product review modal should open$/, () => {
  $('.modal.add-product-review-modal').waitForDisplayed({
    timeout: 2000
  });
});

Then(/^the submit review button must be ([^"]*)?$/, function(state) {
  let $submitBtn = $('.modal.add-product-review-modal button.submit-review');
  if(state === 'disabled') {
    expect($submitBtn).toBeDisabled();
  }

  if(state === 'enabled') {
    expect($submitBtn).toBeEnabled();
  }
});

Then(/^I give a "([^"]*)?" star rating$/, function(rating) {
  let $stars = $$('.modal.add-product-review-modal .rating-stars .jq-star');
  $stars[rating - 1].click();
  browser.pause(500);
});

Then(/^I write a review$/, function() {
  let review = lorem.generateSentences(1);
  gReviewComment = review;
  let $textarea = $('.modal.add-product-review-modal textarea');
  $textarea.setValue(review);
  browser.pause(500);
});

Then(/^I submit the review$/, function() {
  let $submitBtn = $('.modal.add-product-review-modal button.submit-review');
  expect($submitBtn).toBeEnabled();
  $submitBtn.click();
  browser.pause(1000);
});

Then(/^I expect the review to be shown in the reviews list$/, function() {
  let $ratings = $$('.product-rating-list div.product-rating');
  let lastRatingInList = $ratings[$ratings.length - 1];
  let review = $(lastRatingInList).$('div.review').getText();
  expect(review).toEqual(gReviewComment);
});
