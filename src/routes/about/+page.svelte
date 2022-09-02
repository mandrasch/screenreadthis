<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="content">
	<h1>About this app</h1>

	<p>
		Basic web accessibility testing should be possible without the need of installing screenreader
		software and without the need of learning the different keyboard shortcuts first.
	</p>
	<p>
		The goal of this project is to provide an additional way of (quickly) testing the screenreader
		output of given websites. We have tools like <a href="https://www.webpagetest.org/"
			>WebPageTest</a
		>
		for performance testing, <a href="https://webbkoll.dataskydd.net/">Dataskydds webbkoll</a> for
		privacy testing, <a href="https://digitalbeacon.co/">Beacon</a> for sustainability testing - but
		there is no simple tool for screenreader output testing? We should change that together!
	</p>
	<p>
		Disclaimer: Serious and professional accessibility testing should be always done with real
		screenreader software. This is just an experimental project.
	</p>

	<h2>Technical information</h2>
	<p>
		This web app loads the <a
			href="https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree"
			>Accessibility Tree
		</a>
		of the provided website URL via Puppeteers
		<a href="https://pptr.dev/api/puppeteer.accessibility.snapshot/">Accessibility.snapshot()</a
		>-method.
	</p>
	<h2>Frontend</h2>
	<p>
		The frontend is implemented with <a href="https://kit.svelte.dev/">SvelteKit</a>. The speech
		output is realized via
		<a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis">WebSpeech API.</a>
	</p>
	<p>
		Frontend source code: <a href="https://github.com/mandrasch/screenreadthis"
			>mandrasch/screenread-this</a
		>
	</p>

	<h2>Backend (API)</h2>
	<p>
		The Accessibility Tree data is retrieved via JSON from a NodeJS server running
		<a href="https://pptr.dev/">Puppeteer</a>. Puppeteer runs headless and is a NodeJS library which
		provides a high-level API to control Chrome or Chromium over the DevTools Protocol.
	</p>
	<p>
		Backend source code: <a href="https://github.com/mandrasch/screenreadthis-api-server"
			>mandrasch/a11y-tree-api</a
		>
		(Hosted on <a href="https://render.com">render.com</a>)
	</p>

	<h2>Limitations</h2>
	<p>
		Currently only the english language is supported. But the WebSpeech API has support for multiple
		languages, the language could be detected via "html lang"-attribute.
	</p>
	<p>
		There is currently no support for actually interacting with the page. This would require keeping
		the connection to Puppeteers browser instance open (session, web socket?) and handle events
		(click, focus, page navigation, state changes, etc.). Maybe a queue is needed if a lot of
		requests are submitted as well. Happy to hear your suggestions for implementing this in a
		pragmatic way!
	</p>
	<h2>License</h2>
	<p>Feel free to fork and improve this project for your use cases!</p>

	<!-- 
	<p>
		This is a <a href="https://kit.svelte.dev">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	<pre>npm create svelte@latest</pre>

	<p>
		The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.
	</p>

	<p>
		The <a href="/todos">TODOs</a> page illustrates SvelteKit's data loading and form handling. Try using
		it with JavaScript disabled!
	</p> -->
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
	h2 {
		font-weight: 700;
	}
	p {
		text-align: justify;
	}
</style>
