<script lang="ts">
	import { fade } from 'svelte/transition';

	let { 
		size = 'md', 
		variant = 'primary',
		overlay = false,
		message = ''
	}: { 
		size?: 'sm' | 'md' | 'lg' | 'xl', 
		variant?: 'primary' | 'white' | 'slate',
		overlay?: boolean,
		message?: string
	} = $props();

	const sizes = {
		sm: "h-4 w-4 border-2",
		md: "h-8 w-8 border-3",
		lg: "h-12 w-12 border-4",
		xl: "h-16 w-16 border-4"
	};

	const variants = {
		primary: "border-indigo-100 border-t-indigo-600",
		white: "border-white/20 border-t-white",
		slate: "border-slate-100 border-t-slate-800"
	};
</script>

{#if overlay}
	<div 
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm dark:bg-slate-950/60"
	>
		<div class="animate-spin rounded-full {sizes[size]} {variants[variant]}"></div>
		{#if message}
			<p class="mt-4 text-[10px] font-black tracking-[0.2em] text-slate-800 uppercase dark:text-white">
				{message}
			</p>
		{/if}
	</div>
{:else}
	<div class="inline-flex flex-col items-center gap-3">
		<div class="animate-spin rounded-full {sizes[size]} {variants[variant]}"></div>
		{#if message}
			<p class="text-[9px] font-black tracking-widest text-slate-400 uppercase">
				{message}
			</p>
		{/if}
	</div>
{/if}
