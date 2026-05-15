<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Card, DeckItem } from './types';
	import { isRotated } from './utils';

	let { filteredCards, deck, onAdd, onInfo } = $props<{
		filteredCards: Card[];
		deck: DeckItem[];
		onAdd: (card: Card) => void;
		onInfo: (card: Card, e?: Event) => void;
	}>();
</script>

<div
	class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6"
>
	{#each filteredCards as card (card.id)}
		{@const inDeckCount = deck.find((i: DeckItem) => i.card.id === card.id)?.count || 0}
		<div
			class="group relative aspect-[5/7] overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-all duration-300 hover:shadow-2xl dark:bg-gray-900"
		>
			<button
				onclick={() => onAdd(card)}
				class="h-full w-full"
				aria-label="Add {card.name} to deck"
			>
				<img
					src={card.imagePath}
					alt=""
					loading="lazy"
					class="transition-all duration-500 group-hover:scale-110"
					style={isRotated(card)
						? 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(90deg) scale(140%); object-fit: stretch;'
						: 'width: 100%; height: 100%; object-fit: cover;'}
				/>

				{#if inDeckCount > 0}
					<div
						transition:fade={{ duration: 150 }}
						class="absolute top-3 left-3 z-20 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white shadow-lg ring-2 ring-white dark:ring-gray-900"
					>
						{inDeckCount}
					</div>
				{/if}

				<div
					class="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:opacity-100"
				>
					<p
						class="mb-3 line-clamp-2 px-2 text-center text-[11px] font-black tracking-wide text-white uppercase"
					>
						{card.name}
					</p>
					<div
						class="w-full translate-y-4 transform rounded-xl bg-indigo-600 py-2.5 text-[10px] font-black text-white uppercase shadow-lg shadow-indigo-900/50 transition-transform duration-300 group-hover:translate-y-0"
					>
						Add to Deck
					</div>
				</div>
			</button>
			<button
				onclick={(e) => onInfo(card, e)}
				class="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white shadow-lg backdrop-blur-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-white hover:text-indigo-600"
				aria-label="View info for {card.name}"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.5"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
			</button>
		</div>
	{/each}
</div>
