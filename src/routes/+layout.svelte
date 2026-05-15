<script lang="ts">
	import './layout.css';
	import { ToastProvider } from '$lib';

	const { children } = $props();
</script>

<ToastProvider />
{@render children()}
