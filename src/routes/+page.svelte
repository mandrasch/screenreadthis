<script lang="ts">
	import { dev } from '$app/environment';
	import { Jumper } from 'svelte-loading-spinners';
	import JSONTree from 'svelte-json-tree';

	let requestedUrl = 'https://www.a11yproject.com/';
	let submitting = false;
	// TODO:use proper typescript?
	let a11yTreeResult = {};
	// https://svelte.dev/tutorial/reactive-declarations
	// $: a11yTreeResultJsonString = JSON.stringify(a11yTreeResult);

	async function handleSubmit() {
		// TODO: validate url!
		try {
			submitting = true;

			const requestedUrlEncoded = encodeURIComponent(requestedUrl);
			// TODO: use localhost on local dev (via env?)
			let apiRequestUrl = `https://a11y-tree-api.onrender.com/getA11yTree?url=${requestedUrlEncoded}`;
			if (dev) {
				apiRequestUrl = `http://localhost:3001/getA11yTree?url=${requestedUrlEncoded}`;
			}
			console.log('Fetching URL: ', apiRequestUrl);
			const response = await fetch(apiRequestUrl, {
				method: 'GET',
				headers: {
					Accept: 'application/json'
				}
			});
			console.log({ response });
			// TODO: use proper typescript
			a11yTreeResult = await response.json();
			submitting = false;
			// rates.set([...$rates, rate]);
			// set back to empty? newCurrency = '';
		} catch (error) {
			console.error(`Error in handleSubmit function: ${error}`);
		}
	}
</script>

<svelte:head>
	<title>Screenread this!</title>
	<meta name="description" content="Simple demo site which reads accessibility trees" />
</svelte:head>

<section>
	<h1>ScreenreadThis!</h1>

	<form on:submit|preventDefault={handleSubmit}>
		<label for="requestedUrl">URL:</label>
		<input bind:value={requestedUrl} required id="requestedUrl" placeholder="https://" type="url" />
		<button type="submit" disabled={submitting}>Load Accessibility Tree</button>
	</form>

	{#if submitting}
		<!-- TODO: add accessible label / state-->
		<Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
	{/if}

	<div class="jsonTreeContainer">
		<h2>Accessibility Tree snapshot (Puppeteer)</h2>
		<JSONTree value={a11yTreeResult} />
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}

	form {
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		width: 100%;
		max-width: 600px;

		& > * {
			padding: 10px 20px;
			margin: 10px 0;
		}
		label,
		input {
			width: 100%;
		}
		button {
			cursor: pointer;
		}
	}

	.jsonTreeContainer {
		margin-top: 20px;
		background: white;
		padding: 20px;
		border: 2px solid #333;
		width: 100%;
		max-width: 600px;

		// override according to https://www.npmjs.com/package/svelte-json-tree
		/* color */
		--json-tree-string-color: #cb3f41;
		--json-tree-symbol-color: #cb3f41;
		--json-tree-boolean-color: #112aa7;
		--json-tree-function-color: #112aa7;
		--json-tree-number-color: #3029cf;
		--json-tree-label-color: #871d8f;
		--json-tree-property-color: #000000;
		--json-tree-arrow-color: #727272;
		--json-tree-operator-color: #727272;
		--json-tree-null-color: #8d8d8d;
		--json-tree-undefined-color: #8d8d8d;
		--json-tree-date-color: #8d8d8d;
		--json-tree-internal-color: grey;
		--json-tree-regex-color: #cb3f41;
		/* position */
		--json-tree-li-indentation: 1em;
		--json-tree-li-line-height: 1.3;
		/* font */
		--json-tree-font-size: 14px;
		--json-tree-font-family: 'Courier New', Courier, monospace;

		h2 {
			margin-bottom: 20px;
			text-align: center;
		}
	}
</style>
