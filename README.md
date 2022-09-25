# ScreenreadThis!

Experimental demo / Work in progress. The goal of this project is to demonstrate an additional way of (quickly) testing the screenreader output of websites. Built with SvelteKit and puppeteer (retrieving the accessibility tree snapshot).

```bash
git clone https://github.com/mandrasch/screenreadthis.git
npm install
npm run dev -- --open
```

## Demo

- https://screenreadthis.onrender.com
- Demo video: https://www.youtube.com/watch?v=svpjpAsGThU

## Disclaimer

!! Disclaimer: Serious and professional accessibility testing should always be done with real screenreader software. This is just an experimental project. !!

## Background

One of the biggest web accessibility obstacles still is that there is no website "http://screenreadthis.org/URL_OF_WEBSITE" which demonstrates the screenreader output of any given web page instantly for web developers. 

Browserstack for web accessibility so to speak. While we have tools like [WebPageTest](https://www.webpagetest.org/) for performance testing, [Dataskydds webbkoll](https://webbkoll.dataskydd.net/) for
privacy testing, [Beacon](https://digitalbeacon.co/) or [Website Carbon Calculator](https://www.websitecarbon.com/) for sustainability testing; there is no simple tool for screenreader output testing.

We should change that together!

One common hurdle is the need of learning screenreader keyboard shortcuts first. They can be a little bit hard to learn and remember. I am convinced that a simple button interface to operate screenreaders could ease this pain and would motivate more (sighted) web developers to actually test their sites with a screenreader. 

I experimented with this idea in the past, unfortunately I haven't found an easy, secure and solid way of achieving this goal with my skills. Demo video of a prototype: [Screenreader remote control interface](https://www.youtube.com/watch?v=sZCS_kytKj0)

Happy to hear your ideas or see your solutions to this in the future!

## Technical documentation

Built with [SvelteKit](https://kit.svelte.dev/) and puppeteer retrieving the [accessibility tree snapshot](https://pptr.dev/api/puppeteer.accessibility.snapshot/). 

The frontend is implemented via speech
output is realized via [WebSpeech API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).

This web app loads the [Accessibility Tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree)
of the provided website URL via Puppeteer. Puppeteer is written in NodeJS and can launch headless chrome browser instances on the command line, which then can be acessed via methods like `page.goto()`. The accessibility tree representation is retrieved via [Accessibility.snapshot](https://pptr.dev/api/puppeteer.accessibility.snapshot/).

## Local development

```bash
npm run dev
# or start the server and open the app in a new browser tab:
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

!! Please change the API server url to your own API server instance (see: https://github.com/mandrasch/screenreadthis-api-server). !!

## Deployment

The `@sveltejs/adapter-node` is used for deployment.
https://kit.svelte.dev/docs/adapters#supported-environments-node-js

Deploy as Node Webservice, e.g. on render.com: https://render.com/docs/deploy-sveltekit. You need to set `NODE_VERSION` to `16.x` on render.com, see for more information: https://render.com/docs/node-version.

### Limitations

- This is a very early implementation.
- There can be empty static text in the accessibility tree. This does not mean that the site is inaccessible.
- Multilanguage support is needed, SpeechSynthesis must be monitored if we want to speak an english world (role) and then the value in another language. See e.g: https://github.com/tomByrer/web-speech-synth-segmented
- There is currently no support for actually interacting with the page. This would require keeping
  the connection to Puppeteers browser instance open (session, web socket?) and handle events
  (click, focus, page navigation, state changes, etc.). Maybe a queue is needed if a lot of
  requests are submitted as well. Happy to hear your suggestions for implementing this in a
  pragmatic way!

## Privacy and Imprint

The demo app is hosted on european cloud Instances via render.com, see https://render.com/privacy for more information. Contact information / imprint: https://matthias-andrasch.eu/blog/impressum-datenschutz/. Personally I don't store (or transmit) personal data of visitors using this service. By submitting a URL please make sure that there is no personal data handling involved in the URL.

## Credits

- `npm create svelte@latest my-app` - Skeleton
- https://rodneylab.com/using-fetch-sveltekit/
- https://www.npmjs.com/package/svelte-json-tree
- https://www.npmjs.com/package/svelte-loading-spinners
- https://www.npmjs.com/package/svelte-highlight

## TODOs

- Add render.com health check route (or use root `/`?) https://render.com/docs/deploys#health-checks

## License

Feel free to fork and improve this project for your own use cases! The frontend is provided as open source under MIT license. The project is based on SvelteKits official example project. See package.json for all open source libraries used.
