<script lang="ts">
	import { onMount } from 'svelte';
	import { darkTheme } from '$lib/styles/themes/dark.css';
	import '$lib/styles/global_styles.css';

	let { children } = $props();
	onMount(() => {
		const el = document.querySelector('html');
		if (!el) return;
		el.classList.add(darkTheme);
	});
</script>

{@render children()}
