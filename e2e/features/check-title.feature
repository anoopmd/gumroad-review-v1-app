Feature: Check App title
    Background:
        Given I launch the app

    Scenario: Title must be Slick Review App
        Then I expect that the title is "Slick Review App"
