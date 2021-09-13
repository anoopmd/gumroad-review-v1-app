Feature: Add product Review
    Background:
        Given I launch the app

    Scenario: Add product Review
        Then I should see the product loaded
        Then I click on the add review button in product page
        Then the product review modal should open
        Then the submit review button must be disabled
        Then I give a "5" star rating
        Then the submit review button must be disabled
        Then I write a review
        Then the submit review button must be enabled
        Then I submit the review
        Then I expect the review to be shown in the reviews list



