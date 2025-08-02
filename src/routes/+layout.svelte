<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />

<main>
	{@render children?.()}
</main>

<style>
	main {
		min-height: 100vh;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
	}

	/* Ensure smooth scrolling */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Base styles for the app */
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		line-height: 1.6;
		color: #ffffff;
		background: #1a1a2e;
		overflow-x: hidden;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(button) {
		font-family: inherit;
		font-size: inherit;
		cursor: pointer;
	}

	/* Custom scrollbar */
	:global(::-webkit-scrollbar) {
		width: 8px;
	}

	:global(::-webkit-scrollbar-track) {
		background: rgba(255, 255, 255, 0.1);
	}

	:global(::-webkit-scrollbar-thumb) {
		background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
		border-radius: 4px;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: linear-gradient(45deg, #ff5252, #45b7b8);
	}

	/* Focus styles for accessibility */
	:global(*:focus-visible) {
		outline: 2px solid #4ecdc4;
		outline-offset: 2px;
	}
</style>