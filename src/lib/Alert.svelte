<script lang="ts">
	import { fade } from 'svelte/transition';

	let { 
		children, 
		variant = 'primary',
		title = '',
		closable = false,
		class: className = ''
	}: { 
		children: any, 
		variant?: 'primary' | 'success' | 'danger' | 'warning',
		title?: string,
		closable?: boolean,
		class?: string
	} = $props();

	let show = $state(true);

	const variants = {
		primary: "bg-indigo-50 border-indigo-100 text-indigo-700 dark:bg-indigo-950/20 dark:border-indigo-900/50 dark:text-indigo-400",
		success: "bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400",
		danger: "bg-rose-50 border-rose-100 text-rose-700 dark:bg-rose-950/20 dark:border-rose-900/50 dark:text-rose-400",
		warning: "bg-amber-50 border-amber-100 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900/50 dark:text-amber-400"
	};
</script>

{#if show}
	<div 
		transition:fade
		class="relative flex gap-4 p-5 rounded-[1.5rem] border {variants[variant]} {className}"
	>
		<div class="flex-1 space-y-1">
			{#if title}
				<h4 class="text-[11px] font-black tracking-widest uppercase">
					{title}
				</h4>
			{/if}
			<div class="text-[11px] font-semibold opacity-90">
				{@render children()}
			</div>
		</div>

		{#if closable}
			<button 
				onclick={() => show = false}
				class="h-6 w-6 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		{/if}
	</div>
{/if}
