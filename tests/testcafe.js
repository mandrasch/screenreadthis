// run locally https://devexpress.github.io/testcafe/documentation/guides/basic-guides/install-testcafe.html
// npm test testcafe.js
import { Selector } from 'testcafe';
const { keyboard, Key, mouse, left, right, up, down, screen } = require("@nut-tree/nut-js");

fixture `Getting Started`
    .page `http://devexpress.github.io/testcafe/example`;

test('My first test', async t => {
    // Test code

    // activate NVDA
		//await keyboard.type(Key.LeftControl, Key.LeftAlt, Key.N);
        await t
            .click("#main-form");

        keyboard.type(Key.Down);
        keyboard.type(Key.Down);
        keyboard.type(Key.Down);
        keyboard.type(Key.Down);
        keyboard.type(Key.Down);

            /*.pressKey("tab")*/
            /*.pressKey("down")
            .wait(10000)
            .pressKey("down")
            .wait(10000)
            .pressKey("down")
            .wait(10000)
            .pressKey("down")
            .wait(10000)
            .pressKey("down")
            .wait(10000)*/
            /*.wait(30000)*/
            /*.pressKey("capslock+down")*/
        await t.wait(120000)
            .pressKey("ctrl");

});