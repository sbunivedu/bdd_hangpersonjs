var {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, When, Then}) {
  Given('I start a new game with word {string}', function (string, callback) {
   // Write code here that turns the phrase above into concrete actions
   callback(null, 'pending');
  });

  When('I guess {string}', function (string, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

  Then('I should see {string} within {string}', function (string, string2, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });
});
