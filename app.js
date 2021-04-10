"use strict";
const { keyboard, Key, mouse, left, right, up, down, screen } = require("@nut-tree/nut-js");
const open = require('open');


// https://github.com/nut-tree/nut.js
(async () => {
    
    // https://github.com/nut-tree/nut.js/issues/152
    //keyboard.config.autoDelayMs = 250;
    
    // open spotlight
    //await keyboard.pressKey(Key.LeftSuper);
    //await keyboard.pressKey(Key.Space);
    //await keyboard.releaseKey(Key.Space);
    //await keyboard.releaseKey(Key.LeftSuper);

    
	
    //await keyboard.type("calculator");
    // await keyboard.type(Key.Return);
    
    try {
        console.log('Try typing...');
		
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://example.com');
        await page.bringToFront();
   
		// Opens the URL in the default browser.
		//await open('https://hilfsgemeinschaft.at', {app: {name: open.apps.chrome}});
    
        // activate NVDA
		//await keyboard.type(Key.LeftControl, Key.LeftAlt, Key.N);

        // read everything
		await keyboard.type(Key.Insert, Key.Down);
		//await keyboard.type(Key.Tab);
		//await keyboard.type(Key.Tab);
        
        /*await keyboard.pressKey(Key.Tab);
        await keyboard.releaseKey(Key.Tab);
        await keyboard.pressKey(Key.Tab);
        await keyboard.releaseKey(Key.Tab);*/
        

        
        //await keyboard.pressKey(Key.LeftSuper);
        //await keyboard.pressKey(Key.Space);
        //await keyboard.releaseKey(Key.Space);
        //await keyboard.releaseKey(Key.LeftSuper);
        
        //await keyboard.type(Key.Tab);
        //await keyboard.type(Key.Tab);
        //await keyboard.type(Key.Tab);
        
        //await keyboard.type(Key.LeftSuper, Key.Space); // bring up spotlight
        
        //await keyboard.type(Key.LeftSuper, Key.F5); // activate voiceover mac
        // 	Command + F5
        
        //await keyboard.type("calculator"); // this doesn't work 
        //await hackFix("CALCULATOR") // this works

        //await keyboard.pressKey(Key.Enter);
        //await keyboard.releaseKey(Key.Enter);
    } catch (e) {
        console.log(e);
    }

})();