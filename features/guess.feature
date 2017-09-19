Feature: guess correct letter

  As a player playing Hangperson
  So that I can make progress toward the goal
  I want to see when my guess is correct

Scenario: guess correct letter that occurs once

  Given I start a new game with word "garply"
  When I guess "r"
  Then I should see "r" within "span.word"