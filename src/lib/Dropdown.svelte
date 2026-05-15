<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Button } from './index';

	let { 
		label = 'Select Option', 
		options = [], 
		value = $bindable(),
		class: className = '',
		variant = 'outline'
	}: { 
		label?: string, 
		options: { label: string, value: any, icon?: string }[], 
		value?: any,
		class?: string,
		variant?: any
	} = $props();

	let isOpen = $state(false);

	function select(option: any) {
		value = option.value;
		isOpen = false;
	}

	function toggle() {
		isOpen = !isOpen;
	}

	// Close on outside click (simplified for lib)
	function handleOutsideClick(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (!node.contains(event.target as Node)) {
				isOpen = false;
			}
		};
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}

	const selectedLabel = $derived(options.find(o => o.value === value)?.label || label);
</script>

<div class="relative inline-block {className}" use:handleOutsideClick>
	<Button {variant} onclick={toggle} class="w-full justify-between gap-4">
		<span>{selectedLabel}</span>
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			class="h-4 w-4 transition-transform duration-300 {isOpen ? 'rotate-180' : ''}" 
			fill="none" 
			viewBox="0 0 24 24" 
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
		</svg>
	</Button>

	{#if isOpen}
		<div
			transition:fly={{ y: 10, duration: 200 }}
			class="absolute left-0 right-0 z-50 mt-3 min-w-[200px] overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white/95 p-2 shadow-ui-xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/95"
		>
			{#each options as option}
				<button
					onclick={() => select(option)}
					class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[11px] font-black tracking-wider text-slate-600 uppercase transition-all hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
				>
					{#if option.icon}
						<span class="opacity-50">{@html option.icon}</span>
					{/if}
					{option.label}
					{#if value === option.value}
						<svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-3 w-3 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
