<svelte:head>
	<title>ScreenreadThis! - About</title>
	<meta
		name="description"
		content="Basic web accessibility testing should be possible without the need of installing screenreader software and without the need of learning the different keyboard shortcuts first."
	/>
</svelte:head>

<div class="content">
	<h1>About this web app</h1>
	<p>
		!! Disclaimer: Serious and professional accessibility testing should always be done with real
		screenreader software. This is just an experimental project. !!
	</p>
	<p>See the README-file on GitHub for all information:</p>
	<p>
		<a
			href="https://github.com/mandrasch/screenreadthis#readme"
			aria-label="README file in github repository screenreadthis"
			>github.com/mandrasch/screenreadthis</a
		>
	</p>
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
		margin: var(--column-margin-top) auto 0 auto;
	}
	h2 {
		font-weight: 700;
	}
	p {
		text-align: justify;
	}
</style>
