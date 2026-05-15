<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from '$lib/translations';

	interface Option {
		value: string;
		label: string;
	}

	let {
		value = $bindable(),
		options = [],
		placeholder = 'Select...'
	} = $props<{
		value: string;
		options: (string | Option)[];
		placeholder?: string;
	}>();

	let isOpen = $state(false);
	let containerElement = $state<HTMLDivElement>();
	let inputElement = $state<HTMLInputElement>();
	let highlightedIndex = $state(0);

	let normalizedOptions = $derived(
		options.map((opt: any) => (typeof opt === 'string' ? { value: opt, label: opt } : opt))
	);

	let selectedLabel = $derived(
		normalizedOptions.find((opt: { value: any }) => opt.value === value)?.label || value || ''
	);

	// Initial state for search term
	let searchTerm = $state('');

	// Initialize searchTerm with the selected label immediately and sync it
	$effect(() => {
		if (!isOpen) {
			searchTerm = selectedLabel;
		}
	});

	let filteredOptions = $derived(
		normalizedOptions.filter((opt: { label: string }) =>
			opt.label.toLowerCase().includes((searchTerm || '').toLowerCase())
		)
	);

	// Reset highlighted index when filtering
	$effect(() => {
		if (isOpen) {
			highlightedIndex = 0;
		}
	});

	function toggle() {
		isOpen = !isOpen;
		if (isOpen) {
			inputElement?.focus();
		}
	}

	function handleFocus() {
		isOpen = true;
		searchTerm = ''; // Clear on focus to show all options and allow fresh typing
	}

	function handleBlur() {
		// Small delay to allow click events on options to fire first
		setTimeout(() => {
			if (!isOpen) {
				searchTerm = selectedLabel;
			}
		}, 100);
	}

	function selectOption(opt: Option) {
		value = opt.value;
		searchTerm = opt.label;
		isOpen = false;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (!isOpen) {
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
				isOpen = true;
				return;
			}
		}

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if (filteredOptions.length > 0) {
					highlightedIndex = (highlightedIndex + 1) % filteredOptions.length;
				}
				break;
			case 'ArrowUp':
				e.preventDefault();
				if (filteredOptions.length > 0) {
					highlightedIndex =
						(highlightedIndex - 1 + filteredOptions.length) % filteredOptions.length;
				}
				break;
			case 'Enter':
				e.preventDefault();
				if (filteredOptions.length > 0 && filteredOptions[highlightedIndex]) {
					selectOption(filteredOptions[highlightedIndex]);
					inputElement?.blur();
				}
				break;
			case 'Escape':
				isOpen = false;
				searchTerm = selectedLabel; // Restore on Escape
				inputElement?.blur();
				break;
			case 'Tab':
				isOpen = false;
				break;
		}
	}

	// Close on click outside
	onMount(() => {
		const handleClick = (e: MouseEvent) => {
			if (containerElement && !containerElement.contains(e.target as Node)) {
				isOpen = false;
				searchTerm = selectedLabel; // Restore on click outside
			}
		};
		window.addEventListener('mousedown', handleClick); // Use mousedown for faster response
		return () => window.removeEventListener('mousedown', handleClick);
	});
</script>

<div class="relative flex-1" bind:this={containerElement}>
	<div
		class="relative flex w-full items-stretch overflow-hidden rounded-2xl border-2 border-slate-50 bg-slate-50 transition-all focus-within:border-indigo-500 dark:border-gray-800 dark:bg-gray-900"
	>
		<input
			bind:this={inputElement}
			type="text"
			bind:value={searchTerm}
			{placeholder}
			autocomplete="off"
			spellcheck="false"
			class="min-w-0 flex-1 bg-transparent py-4 pr-2 pl-5 font-black text-slate-800 outline-none dark:text-white"
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleKeyDown}
		/>

		<button
			onclick={toggle}
			aria-label={isOpen ? 'Close options' : 'Open options'}
			class="flex -translate-x-5 items-center text-slate-400 transition-transform {isOpen
				? 'rotate-180'
				: ''}"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
	</div>

	{#if isOpen}
		<div
			transition:fade={{ duration: 150 }}
			class="absolute left-0 z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
		>
			{#if filteredOptions.length > 0}
				{#each filteredOptions as opt, i}
					<button
						onclick={() => selectOption(opt)}
						class="w-full rounded-xl px-4 py-3 text-left font-bold transition-colors hover:bg-slate-50 dark:hover:bg-gray-900 {value ===
						opt.value
							? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400'
							: i === highlightedIndex
								? 'bg-slate-100 dark:bg-gray-800'
								: 'text-slate-600 dark:text-slate-300'}"
					>
						{opt.label}
					</button>
				{/each}
			{:else}
				<div class="px-4 py-8 text-center text-sm font-bold text-slate-400 uppercase italic">
					{$t('noResultsFound')}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* Custom scrollbar for the dropdown */
	div::-webkit-scrollbar {
		width: 4px;
	}
	div::-webkit-scrollbar-thumb {
		background: #e2e8f0;
		border-radius: 10px;
	}
	:global(.dark) div::-webkit-scrollbar-thumb {
		background: #1e293b;
	}
</style>
