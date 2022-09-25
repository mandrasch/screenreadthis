<script>
	import Highlight from 'svelte-highlight';
	import bash from 'svelte-highlight/languages/bash';
	import github from 'svelte-highlight/styles/github';

	// TODO: double coded, implement as comp?
	const installCode = `git clone https://github.com/mandrasch/screenreadthis.git
cd screenreadthis/
npm install
npm run dev -- --open`;
</script>

<svelte:head>
	<title>ScreenreadThis! - About</title>
	<meta
		name="description"
		content="Basic web accessibility testing should be possible without the need of installing screenreader software and without the need of learning the different keyboard shortcuts first."
	/>
	<!-- highlightjs styles-->
	{@html github}
</svelte:head>

<div class="content">
	<h1>About this web app</h1>
	<p>
		!! Disclaimer: Serious and professional accessibility testing should always be done with real
		screenreader software. This is just an experimental project. !!
	</p>

	<p>
		Experimental project which tries to find easier ways of learning about screenreader testing -
		without the need of learning all screenreader operation shortcuts first. No more excuses!
	</p>

	Install and use ScreenreadThis! locally:

	<Highlight language={bash} code={installCode} />

	<p>
		Built with SvelteKit and puppeteer retrieving the <a
			href="https://pptr.dev/api/puppeteer.accessibility.snapshot/">accessibility tree snapshot</a
		>.
	</p>

	<p>
		Demo video: 
	</p>
	<ul>
		<li><a href="https://www.youtube.com/watch?v=svpjpAsGThU"
			>ScreenreadThis! demo video (YouTube)
		</a></li>
	</ul>

	<p>See the README-files on GitHub for all information:</p>
	<ul>
		<li>
			<a
				href="https://github.com/mandrasch/screenreadthis#readme"
				aria-label="Github repository with README">github.com/mandrasch/screenreadthis</a
			>
		</li>
	</ul>

	<hr />
	
	<p>Dive deeper into screenreader testing with these introductionary videos:</p>
	<ul>
		<li>
			<a href="https://www.youtube.com/watch?v=5R-6WvAihms">VoiceOver (Mac desktop) tutorial</a>
		</li>
		<li>
			<a href="https://www.youtube.com/watch?v=Vx1vSd5uYS8">NVDA (Windows desktop) tutorial</a>
		</li>
		<li><a href="https://www.youtube.com/watch?v=UI76P-KPZec">Orca (Linux desktop) tutorial</a></li>
		<li><a href="https://www.youtube.com/watch?v=bCHpdjvxBws">VoiceOver (iOS) tutorial</a></li>
		<li><a href="https://www.youtube.com/watch?v=0Zpzl4EKCco">TalkBack (Android) tutorial</a></li>
	</ul>

	<p>
		W3C has launched a great video course for a general introduction: <br /><a
			href="https://www.edx.org/course/web-accessibility-introduction"
			>edX course: Introduction to Web Accessibility
		</a>
	</p>

	<p>Have fun exploring web accessibility (testing)!</p>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: 0 auto 0 auto;
	}
	h2 {
		font-weight: 700;
	}
	p {
		text-align: justify;
	}
</style>
