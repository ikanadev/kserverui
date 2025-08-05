<script lang="ts">
	import { SERVER_STATUS_DEPENDS_KEY } from '$lib/pages/index/constants';
	import { invalidate } from '$app/navigation';
	import { styles } from '$lib/pages/index/styles.css';
	import { formatUsage } from '$lib/pages/index/utils';
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';

	let { data }: PageProps = $props();
	let isUpdating = $state(false);

	async function refreshData() {
		isUpdating = true;
		try {
			await invalidate(SERVER_STATUS_DEPENDS_KEY);
		} finally {
			isUpdating = false;
		}
	}

	onMount(() => {
		const interval = setInterval(refreshData, 5000);
		return () => clearInterval(interval);
	});
</script>

<main class={styles.container}>
	<h1>Ikana's home server</h1>
	<p>
		This is my personal home server. If you want to know more about me, check out
		<a href="https://ikana.dev">ikana.dev</a>
	</p>

	<br />
	<br />
	<div class={styles.heading}>
		<p>Server data:</p>
		<p class={styles.loadingText}>
			{#if isUpdating}...updating...{/if}
		</p>
	</div>
	<pre>
    CPU: {data.cpu.name}
    Usage: {data.cpu.usage}%

    RAM: {formatUsage(data.ram.used)}
    Total: {formatUsage(data.ram.total)} ({(((data.ram.used ?? 0) * 100) / (data.ram.total ?? 1)).toFixed(2)}%)

    Storage: {formatUsage(data.storage.used)}
    Total: {formatUsage(data.storage.total)}

    {#if data.battery.hasBattery}Battery: {data.battery.percentage}%
    Status: {data.battery.status}
		{/if}
  </pre>
	<h2>My apps</h2>
</main>
