<script lang="ts">
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import JSONTree from 'svelte-json-tree';

	// https://svelte.dev/tutorial/bind-this (get ref to component, nice!)
	let readNextBtn: HTMLButtonElement,
		readPrevBtn: HTMLButtonElement,
		requestedUrlInput: HTMLInputElement;

	let requestedUrl = 'https://en.wikipedia.org/wiki/Screen_reader';
	let submitting = false;
	let successful = false;
	// TODO:use proper typescript?
	// https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type
	type childNode = {
		[key: string]: any; // 👈️ variable key
		role?: string;
		name?: string;
	};

	let speechSynthesisSupported: Boolean;

	let a11yTreeResult: any = {};
	let currentFocusedNode: childNode;
	let currentFocusedNodeIndex = -1;
	// https://svelte.dev/tutorial/reactive-declarations
	// $: a11yTreeResultJsonString = JSON.stringify(a11yTreeResult);

	onMount(async () => {
		// thx to https://dev.to/asaoluelijah/text-to-speech-in-3-lines-of-javascript-b8h
		// TODO: move this to init?
		if ('speechSynthesis' in window) {
			// Speech Synthesis supported 🎉
			console.log('Speech Synthesis supported 🎉');
			speechSynthesisSupported = true;
		} else {
			// Speech Synthesis Not Supported 😣
			speechSynthesisSupported = true;
			alert("Sorry, your browser doesn't support text to speech! ");
			return;
		}
		requestedUrlInput.focus();
	});

	async function handleSubmit(loadExampleJson = false) {
		// TODO: validate url!

		// reset all values
		currentFocusedNodeIndex = -1;
		currentFocusedNode = {};
		successful = false;
		a11yTreeResult = {};

		const requestedUrlEncoded = encodeURIComponent(requestedUrl);

		// TODO: use env file
		// TODO: use cache?
		let apiRequestUrl = `https://screenreadthis-api-server.onrender.com/getA11yTree?url=${requestedUrlEncoded}`;
		if (dev) {
			console.log('Dev mode', { loadExampleJson, requestedUrlEncoded });
			apiRequestUrl = `http://localhost:3001/getA11yTree?url=${requestedUrlEncoded}`;
			// local json file for faster testing:
			if (loadExampleJson) {
				apiRequestUrl = `/example.json`;
			}
		}

		try {
			submitting = true;
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
			successful = true;
			submitting = false;
		} catch (error) {
			console.error(`Error in handleSubmit function: ${error}`);
			if (dev) {
				alert(`Error while fetching from ${apiRequestUrl}. Is the server running?`);
			} else {
				alert(
					'Error while retrieving the page. This can be caused by malformed HTML or because the API server is down. Please notice: This project currently runs on a free tier on render.com and can be offline (if free limit is reached).'
				);
			}
			submitting = false;
			successful = false;
			return;
		}

		// success! read page title
		// TODO: merge this into one function!

		window.speechSynthesis.cancel();
		var msg = new SpeechSynthesisUtterance();
		msg.lang = 'en-US'; // default language
		// TODO: How can we wait an speak english first, than the language of the page? we need englisch + something else?
		// TODO: use https://github.com/tomByrer/web-speech-synth-segmented
		/*async function getNextAudio( sentence ){
			let audio = new SpeechSynthesisUtterance(sentence)
			window.speechSynthesis.speak(audio)

			return new Promise( resolve =>{
				audio.onend = resolve
			})
		} */

		if (a11yTreeResult.lang !== '') {
			msg.lang = a11yTreeResult.lang;
		}
		// TODO: check if name and value exists
		msg.text = `${a11yTreeResult.name}`;
		window.speechSynthesis.speak(msg);

		// TODO: this currently does not work because element is hidden?

		let anchor = document.querySelector('#result');
		console.log({ anchor });
		if (anchor != null) {
			anchor.scrollIntoView(true); // TODO: animate this?
		}
		console.log(readNextBtn);
		// TODO: doesn't work because change of disabled state?!
		readNextBtn.focus();
	}

	function handleSpeakNextPrevAction(next: Boolean) {
		currentFocusedNodeIndex = next ? currentFocusedNodeIndex + 1 : currentFocusedNodeIndex - 1;

		// TODO: check for length = end reached,  Disable prev/next button based on that

		if (a11yTreeResult.children[currentFocusedNodeIndex] !== undefined) {
			console.log('Setting currentFocusedNode to', { currentFocusedNode });
			currentFocusedNode = a11yTreeResult.children[currentFocusedNodeIndex];

			// stop output beforehand
			window.speechSynthesis.cancel();

			// TODO: use general speak() method, double coded currently

			// speak the role (english)
			// TODO: use https://github.com/tomByrer/web-speech-synth-segmented
			var roleMsg = new SpeechSynthesisUtterance();
			roleMsg.lang = 'en-US'; // default language
			roleMsg.text = `${currentFocusedNode.role}`;
			window.speechSynthesis.speak(roleMsg);

			var msgElement = new SpeechSynthesisUtterance();
			msgElement.lang = 'en-US'; // default language (fallback)
			if (a11yTreeResult.lang !== '') {
				msgElement.lang = a11yTreeResult.lang;
			}
			msgElement.text = `${currentFocusedNode.name}`;
			window.speechSynthesis.speak(msgElement);
		}
	}

	// key handling
	let key;
	let keyCode;
	// TODO: whats the proper type for this type of Event?
	function handleKeydown(event: any) {
		key = event.key;
		keyCode = event.keyCode;
		if (!successful) return; // bail

		if (dev) {
			console.log('Keydown event', { key, keyCode });
		}

		switch (event.keyCode) {
			// right
			case 39:
				// TODO: focus next button
				handleSpeakNextPrevAction(true);
				readNextBtn.focus();
				break;
			// left
			case 37:
				// TODO: focus prev button
				handleSpeakNextPrevAction(false);
				readPrevBtn.focus();
				break;

			// top: 40
			// bottom: 39
			// TODO: add tabulator for focusable elements!
			// TODO: add ctrl for cancel
		}
	}
</script>

<svelte:head>
	<title>Screenread this!</title>
	<meta
		name="description"
		content="Basic web accessibility testing should be possible without the need of installing screenreader software and without the need of learning the different keyboard shortcuts first."
	/>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<section>
	<h1>ScreenreadThis!</h1>
	<p>Experimental project, trying to enable easy ways of learning about screenreader testing.</p>

	<form on:submit|preventDefault={() => handleSubmit()}>
		<label for="requestedUrl">URL:</label>
		<input
			bind:this={requestedUrlInput}
			bind:value={requestedUrl}
			required
			id="requestedUrl"
			placeholder="https://"
			type="url"
		/>
		<div class="submitButtons">
			{#if dev}
				<button
					on:click|preventDefault={() => {
						handleSubmit(true);
					}}>Load example (dev-only)</button
				>
			{/if}
			<button type="submit" disabled={submitting}>Load page</button>
		</div>
	</form>

	{#if submitting}
		<div class="loadingProgress">
			<!-- TODO: add accessible label / state-->
			<span>
				<Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
			</span>
			<p>Loading the results can take a minute or two ...</p>
		</div>
	{/if}

	<div id="result">
		<!-- TODO: this does not work, because bindings are not created -->
		<!-- {#if !submitting && successful} -->
		<div class="navigateTheTreeContainer">
			<h2>Screenread the page elements</h2>
			<div class="navigateTheTreeContainer__buttons">
				<button
					bind:this={readPrevBtn}
					on:click|preventDefault={() => handleSpeakNextPrevAction(false)}
					disabled={currentFocusedNodeIndex < 0}>&laquo; Read prev</button
				>
				<button
					bind:this={readNextBtn}
					disabled={!a11yTreeResult.hasOwnProperty('children')}
					on:click|preventDefault={() => handleSpeakNextPrevAction(true)}>Read next &raquo;</button
				>
			</div>
			<p><small>Hint: You can also use the keyboard arrow keys.</small></p>
		</div>
		<div class="speechOutputContainer">
			<h2>Current element</h2>
			{#if currentFocusedNodeIndex >= 0}
				{currentFocusedNode?.role}: "{currentFocusedNode?.name}"
			{:else if a11yTreeResult.hasOwnProperty('name')}
				Site title: {a11yTreeResult?.name}
			{:else}{/if}
		</div>
		<div class="jsonTreeContainer">
			<h2>Accessibility Tree snapshot (Puppeteer)</h2>

			<JSONTree value={a11yTreeResult} />
		</div>
		<!-- {/if} -->
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
	h2 {
		font-weight: 700;
	}

	p {
		text-align: center;
	}

	form {
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: stretch;

		& > * {
			padding: 10px 20px;
			margin: 10px 0;
		}
		label,
		input {
			flex: 0 0 100%;
		}
		.submitButtons {
			display: flex;
			flex-direction: row;
			justify-content: center;
		}
		button {
			cursor: pointer;
			padding: 10px 20px;
			margin: 10px 10px;
		}
	}

	// TODO: merge into one class
	.speechOutputContainer,
	.navigateTheTreeContainer,
	.jsonTreeContainer {
		margin-top: 20px;
		background: white;
		padding: 20px;
		border: 2px solid #333;
		h2 {
			margin-bottom: 20px;
			text-align: center;
		}
	}

	.loadingProgress {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		span {
			display: flex;
			justify-content: center;
		}
	}

	.speechOutputContainer {
		text-align: center;
	}

	.navigateTheTreeContainer {
		&__buttons {
			display: flex;
			justify-content: center;
			button {
				cursor: pointer;
				padding: 10px 20px;
				margin: 10px;
			}
		}
	}

	.jsonTreeContainer {
		// override according to https://www.npmjs.com/package/svelte-json-tree
		/* color */
		/*--json-tree-string-color: #cb3f41;
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
		--json-tree-regex-color: #cb3f41;*/
		/* position */
		/*--json-tree-li-indentation: 1em;
		--json-tree-li-line-height: 1.3;*/
		/* font */
		--json-tree-font-size: 14px;
		// --json-tree-font-family: 'Courier New', Courier, monospace;
	}
</style>
