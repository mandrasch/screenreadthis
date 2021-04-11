"use strict";

const { keyboard, Key, mouse, left, right, up, down, screen } = require("@nut-tree/nut-js");
const open = require('open');

(async () => {
    await open('https://www.a11yproject.com/', {app: {name: open.apps.chrome}});
    
    // try to activate voice over (mac osx)
    await keyboard.type(Key.LeftSuper, Key.F5);
})();