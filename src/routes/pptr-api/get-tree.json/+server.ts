// This only runs server-side (SSR)
import type { RequestHandler } from '@sveltejs/kit';
// https://www.lewuathe.com/using-puppeteer-in-typescript.html
import * as puppeteer from 'puppeteer';

export const POST: RequestHandler = async ({ request, setHeaders }) => {
	const requestParams = await request.json();
	// TODO: sanitize url necessary?
	// TODO: check for undefined
	const requestedUrl = requestParams.url;
	console.log(`GET /getA11yTree for URL: `, requestedUrl, '...');
	// TODO: error catching?
	console.log('Fire up puppeteer ...');
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(requestedUrl, { waitUntil: 'domcontentloaded' });
	const accessibilityTreeSnapshot = await page.accessibility.snapshot();

	// get html lang
	let htmlLang = await page.evaluate(() => {
		return document.querySelector('html').getAttribute('lang');
	});
	console.log('evaluate page finished,', htmlLang);
	if (htmlLang === null) {
		htmlLang = ''; // easier to parse as empty string (JSON)
	}

	// clear up
	await browser.close();

	// send a11y tree as json
	console.log('Successful! Sending json response, language detected: ...', htmlLang);
	const response = { ...accessibilityTreeSnapshot };
	response.htmlLangAttribute = htmlLang;

    // https://kit.svelte.dev/docs/routing#server 
    return new Response(JSON.stringify(response));
    // This does only work for pages?
    // https://www.reddit.com/r/sveltejs/comments/wuqyuf/api_endpoint_handler_should_return_response_object/
	return {
		body: {
			response
		}
	};
};
