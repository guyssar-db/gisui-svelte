<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import SearchableSelect from './SearchableSelect.svelte';
	import { t } from '$lib/translations';

	let {
		searchQuery = $bindable(),
		typeFilter = $bindable(),
		worldFilter = $bindable(),
		attributeFilter = $bindable(),
		types,
		worlds,
		attributes
	} = $props<{
		searchQuery: string;
		typeFilter: string;
		worldFilter: string;
		attributeFilter: string;
		types: string[];
		worlds: string[];
		attributes: string[];
	}>();

	let showPopup = $state(false);
	let containerElement = $state<HTMLDivElement>();

	function togglePopup() {
		showPopup = !showPopup;
	}

	let activeFiltersCount = $derived(
		(typeFilter !== 'All' ? 1 : 0) +
			(worldFilter !== 'All' ? 1 : 0) +
			(attributeFilter !== 'All' ? 1 : 0)
	);

	function resetFilters() {
		typeFilter = 'All';
		worldFilter = 'All';
		attributeFilter = 'All';
	}

	// Close on click outside
	onMount(() => {
		const handleClick = (e: MouseEvent) => {
			if (showPopup && containerElement && !containerElement.contains(e.target as Node)) {
				showPopup = false;
			}
		};
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	});
</script>

<div
	class="sticky top-24 mb-8 flex flex-wrap gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all dark:border-gray-800 dark:bg-gray-950 {showPopup
		? 'z-[60]'
		: 'z-30'}"
	bind:this={containerElement}
>
	<div class="relative flex min-w-[280px] flex-1 items-center gap-3">
		<div class="relative flex-1">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder={$t('searchPlaceholder')}
				class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-lg font-bold transition-all outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
			/>
			<svg
				class="absolute top-1/2 right-5 h-6 w-6 -translate-y-1/2 text-slate-300"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2.5"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</div>

		<button
			onclick={togglePopup}
			class="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 transition-all active:scale-95 {showPopup ||
			activeFiltersCount > 0
				? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:border-indigo-500/50 dark:bg-indigo-950/30 dark:text-indigo-400'
				: 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700'}"
			aria-label="Toggle filters"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2.5"
					d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
				/>
			</svg>

			{#if activeFiltersCount > 0}
				<span
					class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white shadow-lg ring-4 ring-white dark:ring-gray-950"
				>
					{activeFiltersCount}
				</span>
			{/if}
		</button>
	</div>

	{#if showPopup}
		<div
			transition:fly={{ y: 10, duration: 200 }}
			class="absolute top-full right-6 z-50 mt-4 w-full max-w-[320px] rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
		>
			<div class="mb-6 flex items-center justify-between">
				<h3 class="text-xl font-black tracking-tight text-slate-800 uppercase dark:text-white">
					{$t('filters')}
				</h3>
				{#if activeFiltersCount > 0}
					<button
						onclick={resetFilters}
						class="text-[10px] font-black text-rose-500 uppercase hover:underline"
					>
						{$t('reset')}
					</button>
				{/if}
			</div>

			<div class="flex flex-col gap-6">
				<div class="space-y-2">
					<p class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
						{$t('cardType')}
					</p>
					<SearchableSelect bind:value={typeFilter} options={types} placeholder={$t('allTypes')} />
				</div>
				<div class="space-y-2">
					<p class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
						{$t('world')}
					</p>
					<SearchableSelect
						bind:value={worldFilter}
						options={worlds}
						placeholder={$t('allWorlds')}
					/>
				</div>
				<div class="space-y-2">
					<p class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
						{$t('attribute')}
					</p>
					<SearchableSelect
						bind:value={attributeFilter}
						options={attributes}
						placeholder={$t('allAttributes')}
					/>
				</div>
			</div>

			<button
				onclick={() => (showPopup = false)}
				class="mt-8 w-full rounded-2xl bg-slate-900 py-4 text-xs font-black text-white uppercase transition-all hover:bg-black active:scale-[0.98] dark:bg-indigo-600 dark:hover:bg-indigo-700"
			>
				{$t('applyFilters')}
			</button>
		</div>
	{/if}
</div>
