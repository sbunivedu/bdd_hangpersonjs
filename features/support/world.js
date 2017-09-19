var zombie = require('zombie');
var {defineSupportCode} = require('cucumber');

zombie.localhost('localhost', 8080);

function World() {
 this.browser = new zombie();
 this.baseUrl = 'http://localhost:8080';
}

defineSupportCode(function({setWorldConstructor}) {
 setWorldConstructor(World)
});