Feature: User Registration and Login
  As a new user
  I want to register for a new account and log in
  So that I can view my account balance

  Background:
    Given I am on the Parabank home page

  @smoke
  Scenario: Successful user registration and login
    When I click on the Register link
    And I fill in the registration form with valid data
    And I submit the registration form
    Then I should see a success message
    When I log in with my new credentials
    Then I should be on the account overview page
    And I print the account balance

  @negative
  Scenario: Registration with empty form
    When I click on the Register link
    And I leave all registration fields empty
    And I submit the registration form
    Then I should see validation errors for all required fields

  @negative
  Scenario: Registration with existing username
    When I click on the Register link
    And I fill in the registration form with an existing username
    And I submit the registration form
    Then I should see an error message indicating username already exists

  @negative
  Scenario: Registration with mismatched passwords
    When I click on the Register link
    And I fill in the registration form with mismatched passwords
    And I submit the registration form
    Then I should see an error message indicating passwords do not match
