<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { Card } from './types';
	import { addToast } from '$lib/themeStore';
	import SearchableSelect from './SearchableSelect.svelte';
	import { t } from '$lib/translations';

	let { types, worldFilter, onImport, onClose } = $props<{
		types: string[];
		worldFilter: string;
		onImport: (card: Card) => void;
		onClose: () => void;
	}>();

	let importName = $state('');
	let importType = $state('');
	let importImagePath = $state('');
	let previewUrl = $state<string | null>(null);

	const defaultTypes = ['Monster', 'Spell', 'Item', 'Impact', 'Impact Monster', 'Flag'];
	let availableTypes = $derived(
		types.length > 1 ? types.filter((t: string) => t !== 'All') : defaultTypes
	);

	function handleFileChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result as string;
				previewUrl = result;
				importImagePath = result;
			};
			reader.readAsDataURL(file);
		}
	}

	function handleManualImport() {
		if (!importName) {
			addToast('Please enter a card name', 'error');
			return;
		}
		if (!importType) {
			addToast('Please select a card type', 'error');
			return;
		}

		const newCard: Card = {
			id: `custom-${Date.now()}`,
			cardId: 'CUSTOM',
			name: importName,
			type: importType,
			imagePath: importImagePath || '/buddyfight_images/No_Data_Card.webp',
			world: worldFilter === 'All' ? 'Unknown' : worldFilter,
			power: null,
			defense: null,
			critical: null,
			size: null,
			attributes: [],
			ability: 'Custom card added manually.',
			rarity: 'CUSTOM',
			series: 'Manual Import'
		};

		onImport(newCard);
		addToast(`${importName} added to deck`, 'success');
		onClose();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	transition:fade={{ duration: 150 }}
	class="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-xl"
	onclick={onClose}
>
	<div
		transition:fly={{ y: 20, duration: 200 }}
		class="relative flex w-full max-w-2xl max-h-[90vh] flex-col overflow-y-auto rounded-3xl bg-white shadow-2xl md:flex-row dark:bg-gray-900"
		onclick={(e) => e.stopPropagation()}
	>
		<!-- Image Preview Section -->
		<div
			class="flex w-full flex-col items-center justify-center border-r border-slate-200 bg-slate-100 p-6 md:w-5/12 md:p-8 dark:border-gray-700 dark:bg-gray-800"
		>
			<div
				class="relative aspect-[5/7] w-full max-w-[180px] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl md:max-w-[240px] dark:border-gray-800 dark:bg-gray-950"
			>
				{#if previewUrl}
					<img src={previewUrl} alt="Preview" class="h-full w-full object-cover" />
				{:else}
					<div
						class="flex h-full w-full flex-col items-center justify-center p-6 text-center text-slate-300 dark:text-slate-700"
					>
						<svg class="mb-3 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<p class="text-xs font-bold tracking-widest uppercase">{$t('noImageSelected')}</p>
					</div>
				{/if}
			</div>

			<label class="group mt-6 w-full max-w-[240px] cursor-pointer">
				<div
					class="w-full rounded-xl border-2 border-dashed border-slate-200 bg-white py-3 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase transition-all group-hover:border-indigo-500 group-hover:text-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-400"
				>
					{previewUrl ? 'Change Image' : 'Upload Image'}
				</div>
				<input type="file" accept="image/*" class="hidden" onchange={handleFileChange} />
			</label>
		</div>

		<!-- Form Section -->
		<div class="flex min-h-0 flex-1 flex-col p-6 md:p-8">
			<button
				onclick={onClose}
				class="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100/50 text-slate-500 backdrop-blur-sm transition-colors hover:bg-slate-200 md:top-6 md:right-6 dark:bg-gray-800/50 dark:hover:bg-gray-700"
				aria-label="Close modal"
			>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.5"
						d="M6 18L18 6M6 6l12 12"
					/></svg
				>
			</button>

			<h2 class="mb-1 text-2xl font-black tracking-tight uppercase md:text-3xl dark:text-white">
				{$t('manualImport')}
			</h2>
			<p class="mb-6 text-xs font-bold tracking-wide text-slate-400 uppercase md:mb-8 md:text-sm">
				{$t('addCustomCard')}
			</p>

			<div class="flex-1 space-y-4 md:space-y-6">
				<div>
					<label
						for="importName"
						class="mb-2 block px-1 text-[10px] font-black tracking-widest text-slate-400 uppercase dark:text-slate-500"
						>{$t('cardName')}</label
					>
					<input
						id="importName"
						type="text"
						bind:value={importName}
						placeholder="Enter card name..."
						class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-3 font-bold shadow-sm transition-all outline-none focus:border-indigo-500 md:py-4 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
					/>
				</div>
				<div>
					<label
						for="importType"
						class="mb-2 block px-1 text-[10px] font-black tracking-widest text-slate-400 uppercase dark:text-slate-500"
						>{$t('cardType')}</label
					>
					<SearchableSelect
						bind:value={importType}
						options={availableTypes}
						placeholder={$t('type')}
					/>
				</div>
				<div>
					<label
						for="importImagePath"
						class="mb-2 block px-1 text-[10px] font-black tracking-widest text-slate-400 uppercase dark:text-slate-500"
						>Image URL (Manual Override)</label
					>
					<input
						id="importImagePath"
						type="text"
						bind:value={importImagePath}
						placeholder="e.g. /buddyfight_images/NAME.webp"
						class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-3 font-bold shadow-sm transition-all outline-none focus:border-indigo-500 md:py-4 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
					/>
				</div>
			</div>

			<div class="mt-8 flex gap-3 md:mt-10">
				<button
					onclick={handleManualImport}
					class="flex-1 rounded-2xl bg-indigo-600 py-4 font-black text-white uppercase shadow-lg shadow-indigo-900/20 transition-all hover:scale-[1.02] active:scale-95"
					>{$t('addToDeck')}</button
				>
				<button
					onclick={onClose}
					class="hidden rounded-2xl bg-slate-100 px-8 py-4 font-black text-slate-600 uppercase transition-all hover:bg-slate-200 sm:block dark:bg-gray-800 dark:text-slate-300 dark:hover:bg-gray-700"
					>{$t('cancel')}</button
				>
			</div>
		</div>
	</div>
</div>
