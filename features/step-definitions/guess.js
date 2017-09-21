var {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, When, Then}) {
  Given('I start a new game with word {string}', function (string, callback) {
   // Write code here that turns the phrase above into concrete actions
   callback(null, 'pending');
  });

  When('I guess {string}', function (string, callback) {
    // Write code here that turns the phrase above into concrete actions
    this.browser.fill('#guess', string);
    this.browser.document.forms[0].submit();
  });

  Then('I should see {string}', function (string, callback) {
    // Write code here that turns the phrase above into concrete actions
     // get the text of the body
    var tbody = this.browser.text('body');

    // search if the text exists inside the body text
    if (body.search(string) != -1) {
     // text exists
     callback();
    } else {
     // throw an error for missing text
     callback(new Error('Expected to see the text: ' + arg1));
    }
  });
});
