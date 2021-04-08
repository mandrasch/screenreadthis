const open = require('open');
const { keyboard, Key, mouse, left, right, up, down, screen } = require("@nut-tree/nut-js");


// https://github.com/nut-tree/nut.js
describe("Basic test", () => {
  it("Should run a simple test", async () => {
    
    // Opens the URL in the default browser.
    open('https://hilfsgemeinschaft.at', {app: {name: 'google chrome', arguments: ['--incognito']}});
    
    //await square();
    //await openSpotlight();
    await keyboard.type("calculator");
    //await keyboard.type(Key.Return);
  });
});