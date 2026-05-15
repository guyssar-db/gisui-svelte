<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { Card } from './types';
	import { isRotated } from './utils';

	let { card, onAdd, onClose } = $props<{
		card: Card | null;
		onAdd: (card: Card) => void;
		onClose: () => void;
	}>();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	transition:fade={{ duration: 150 }}
	class="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-xl"
	onclick={onClose}
>
	{#if card}
		<div
			transition:fly={{ y: 20, duration: 200 }}
			class="relative flex w-full max-w-4xl max-h-[90vh] flex-col overflow-y-auto rounded-3xl bg-white shadow-2xl md:flex-row dark:bg-gray-900"
			onclick={(e) => e.stopPropagation()}
		>
			<div
				class="flex w-full items-center justify-center border-r bg-slate-100 p-6 md:w-2/5 md:p-8 dark:border-gray-700 dark:bg-gray-800"
			>
				<div
					class="relative aspect-[5/7] w-full max-w-[200px] overflow-hidden rounded-xl bg-white shadow-2xl md:max-w-[280px] dark:bg-gray-950"
				>
					<img
						src={card.imagePath}
						alt=""
						class="transition-all duration-300"
						style={isRotated(card)
							? 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(90deg) scale(140%); object-fit: stretch;'
							: 'width: 100%; height: 100%; object-fit: cover;'}
					/>
				</div>
			</div>
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
				<h2 class="mb-2 text-2xl font-black md:mb-4 md:text-3xl dark:text-white">{card.name}</h2>
				<div class="mb-4 flex flex-wrap gap-2 md:mb-6">
					<span class="rounded bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-600 uppercase"
						>{card.type}</span
					>
					<span class="rounded bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 uppercase"
						>{card.cardId}</span
					>
				</div>
				<div class="mb-6 grid grid-cols-4 gap-2 md:mb-8 md:gap-4">
					{#each ['Power', 'Defense', 'Critical', 'Size'] as stat}
						<div class="rounded-xl bg-slate-50 p-2 text-center md:p-3 dark:bg-gray-800">
							<p class="mb-1 text-[8px] font-black text-slate-400 uppercase md:text-[10px]">{stat}</p>
							<p class="text-xs font-black md:text-sm dark:text-white">
								{(card as any)[stat.toLowerCase()] ?? '-'}
							</p>
						</div>
					{/each}
				</div>
				<div class="custom-scrollbar min-h-0 flex-1 overflow-y-auto pr-2 md:pr-4">
					<p class="mb-2 text-[10px] font-black text-slate-400 uppercase">Attributes</p>
					<div class="mb-4 flex flex-wrap gap-2 md:mb-6">
						{#each card.attributes || [] as attr}
							<span
								class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-gray-800 dark:text-slate-300"
								>{attr}</span
							>
						{/each}
					</div>
					<p class="mb-2 text-[10px] font-black text-slate-400 uppercase">Ability</p>
					<div
						class="rounded-xl border bg-indigo-50/50 p-3 md:p-4 dark:border-indigo-900/20 dark:bg-indigo-900/10"
					>
						<p class="text-[11px] leading-relaxed whitespace-pre-wrap md:text-xs dark:text-slate-300">
							{card.ability || 'No text.'}
						</p>
					</div>
				</div>
				<div class="mt-6 flex gap-3 border-t pt-4 md:mt-8 md:pt-6 dark:border-gray-800">
					<button
						onclick={() => {
							onAdd(card!);
							onClose();
						}}
						class="flex-1 rounded-2xl bg-indigo-600 py-4 font-black text-white uppercase shadow-lg transition-all hover:scale-[1.02]"
						>Add to Deck</button
					>
					<button
						onclick={onClose}
						class="hidden rounded-2xl bg-slate-100 px-8 py-4 font-black text-slate-600 uppercase sm:block dark:bg-gray-800 dark:text-slate-300"
						>Close</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>
