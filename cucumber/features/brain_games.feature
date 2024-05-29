Feature: Brain Games Store Testing

  Scenario: Load the Brain Games store in galda-speles section
    Given I am on the galda-speles collection page
    When I accept cookies
    Then the page title should be "Galda spēles — Brain Games"

  Scenario: Search for the "Catan" board game
    Given I am on the galda-speles collection page
    When I search for "Catan"
    Then I should see search results for "Catan"

  Scenario: Open "Catan Jūrasbraucēji" card
    Given I have searched for "Catan"
    When I open the "Catan: Jūrasbraucēji" game card
    Then the game card should be displayed

  Scenario: Add "Catan Jūrasbraucēji" into the cart
    Given I am on the "Catan Jūrasbraucēji" game page
    When I add the item to the cart
    Then the item count in the cart is uqual "1"

  Scenario: Check if "Catan Jūrasbraucēji" is in the cart
    Given I have added the item to the cart
    When I open the cart
    Then the cart should contain "Catan Jūrasbraucēji" with a price of "44.95 €"
