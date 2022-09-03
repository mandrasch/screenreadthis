<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<hr style="width:30px;border:1px solid #999;" />
	<p>
		<small
			>Disclaimer: This is not a real screenreader software, only use real screenreaders for serious
			testing!</small
		>
	</p>
	<p>
		Source code: <a
			href="https://github.com/mandrasch/screenreadthis"
			aria-label="Read more about this on the Github repository page">GitHub</a
		>
		(Open Source) | <a href="/about">About</a> |
		<a href="https://github.com/mandrasch/screenreadthis">Privacy / Imprint</a>
	</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 910px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
