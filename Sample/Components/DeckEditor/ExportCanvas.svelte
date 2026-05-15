<script lang="ts">
	import type { Card, DeckItem } from './types';
	import { isRotated } from './utils';

	let {
		canvasElement = $bindable(),
		totalCards,
		totalBiolabCards,
		totalLostCards,
		totalBuddyGiftCards,
		totalUltimateCards,
		mainFlagItems,
		buddyItems,
		specialFlagItems,
		buddyGiftItems,
		ultimateItems,
		mainDeckItems,
		biolabDeckItems,
		lostDeckItems,
		buddyId,
		subtitle = 'Generated via Buddyfight Create'
	}: {
		canvasElement: HTMLDivElement | undefined;
		totalCards: number;
		totalBiolabCards: number;
		totalLostCards: number;
		totalBuddyGiftCards: number;
		totalUltimateCards: number;
		mainFlagItems: DeckItem[];
		buddyItems: DeckItem[];
		specialFlagItems: DeckItem[];
		buddyGiftItems: DeckItem[];
		ultimateItems: DeckItem[];
		mainDeckItems: DeckItem[];
		biolabDeckItems: DeckItem[];
		lostDeckItems: DeckItem[];
		buddyId: string[];
		subtitle?: string;
	} = $props();

	const countItems = (items: DeckItem[]) => items.reduce((s, i) => s + i.count, 0);

	let countMain = $derived(totalCards);
	let countBio = $derived(totalBiolabCards);
	let countLost = $derived(totalLostCards);
	let countBuddyGift = $derived(totalBuddyGiftCards);
	let countUltimate = $derived(totalUltimateCards);

	let countFlagsRendered = $derived(
		countItems(mainFlagItems) -
			buddyId.filter((id) => mainFlagItems.some((i) => i.card.id === id)).length
	);
	let countBuddyRendered = $derived(buddyItems.length);

	let absoluteTotal = $derived(countMain + countBio + countLost + countBuddyGift + countUltimate);
</script>

{#snippet canvasCard(card: Card, buddyIcon: boolean)}
	{@const rotated = isRotated(card)}
	<div class="relative aspect-[5/7] w-48" style="isolation: isolate;">
		<div
			class="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl bg-slate-100 shadow-2xl"
		>
			<img
				src={card.imagePath}
				alt=""
				style={rotated
					? 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(90deg) scale(140%); object-fit: stretch;'
					: 'width: 100%; height: 100%; object-fit: cover;'}
			/>
		</div>
		{#if buddyIcon}
			<div
				class="absolute z-[100] flex items-center justify-center rounded-full border-[6px] border-white font-black text-white"
				style="
                    top: 0; 
                    left: 0; 
                    width: 70px; 
                    height: 70px; 
                    background-color: #fbbf24; 
                    transform: translate(-30%, -30%);
                    font-size: 42px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
                    line-height: 1;
                "
			>
				B
			</div>
		{/if}
	</div>
{/snippet}

<div class="fixed top-[-9999px] left-[-9999px] overflow-hidden">
	<div
		bind:this={canvasElement}
		class="flex min-h-min w-[2400px] flex-col gap-20 bg-white p-32"
		style="background-image: radial-gradient(#cbd5e1 2px, transparent 2px); background-size: 60px 60px;"
	>
		<!-- Header -->
		<div class="flex items-end justify-between border-b-[12px] border-slate-900 pb-10">
			<div>
				<h1 class="text-8xl font-black tracking-tighter text-slate-900 uppercase">
					Buddyfight Deck
				</h1>
				<p class="mt-4 text-3xl font-bold tracking-[0.2em] text-slate-400 uppercase">
					{subtitle}
				</p>
			</div>
			<div class="text-right">
				<p class="text-7xl font-black text-slate-900">
					{countFlagsRendered + countBuddyRendered} + {absoluteTotal} CARDS
				</p>
			</div>
		</div>

		<!-- Flags & Buddy Section -->
		<div class="space-y-10">
			<h2 class="inline-block bg-slate-900 px-10 py-4 text-4xl font-black text-white uppercase">
				Flag / Buddy
			</h2>
			<div class="flex flex-wrap gap-10">
				{#each mainFlagItems as item (item.card.id)}
					{#each Array(buddyId.includes(item.card.id) ? Math.max(0, item.count - 1) : item.count) as _}
						{@render canvasCard(item.card, buddyId.includes(item.card.id))}
					{/each}
				{/each}
				{#each buddyItems as item (item.card.id)}
					{@render canvasCard(item.card, true)}
				{/each}
			</div>
		</div>

		<!-- Buddy Gift Section -->
		{#if buddyGiftItems.length > 0}
			<div class="space-y-10">
				<h2 class="inline-block bg-rose-600 px-10 py-4 text-4xl font-black text-white uppercase">
					Buddy Gift ({countBuddyGift})
				</h2>
				<div class="grid grid-cols-10 gap-10">
					{#each buddyGiftItems as item (item.card.id)}
						{#each Array(buddyId.includes(item.card.id) ? Math.max(0, item.count - 1) : item.count) as _}
							{@render canvasCard(item.card, buddyId.includes(item.card.id))}
						{/each}
					{/each}
				</div>
			</div>
		{/if}

		<!-- Ultimate Section -->
		{#if ultimateItems.length > 0}
			<div class="space-y-10">
				<h2 class="inline-block bg-slate-600 px-10 py-4 text-4xl font-black text-white uppercase">
					Ultimate ({countUltimate})
				</h2>
				<div class="grid grid-cols-10 gap-10">
					{#each ultimateItems as item (item.card.id)}
						{#each Array(buddyId.includes(item.card.id) ? Math.max(0, item.count - 1) : item.count) as _}
							{@render canvasCard(item.card, buddyId.includes(item.card.id))}
						{/each}
					{/each}
				</div>
			</div>
		{/if}

		<!-- Main Deck Section -->
		<div class="space-y-10">
			<h2 class="inline-block bg-slate-900 px-10 py-4 text-4xl font-black text-white uppercase">
				Main Deck ({countMain})
			</h2>
			<div class="grid grid-cols-10 gap-10">
				{#each mainDeckItems as item (item.card.id)}
					{#each Array(buddyId.includes(item.card.id) ? Math.max(0, item.count - 1) : item.count) as _}
						{@render canvasCard(item.card, buddyId.includes(item.card.id))}
					{/each}
				{/each}
				{#each specialFlagItems as item (item.card.id)}
					{#each Array(buddyId.includes(item.card.id) ? Math.max(0, item.count - 1) : item.count) as _}
						{@render canvasCard(item.card, buddyId.includes(item.card.id))}
					{/each}
				{/each}
			</div>
		</div>

		<!-- Bio-lab Deck Section -->
		{#if biolabDeckItems.length > 0}
			<div class="space-y-10">
				<h2 class="inline-block bg-slate-900 px-10 py-4 text-4xl font-black text-white uppercase">
					Bio-lab Deck ({countBio})
				</h2>
				<div class="grid grid-cols-10 gap-10">
					{#each biolabDeckItems as item (item.card.id)}
						{#each Array(buddyId.includes(item.card.id) ? Math.max(0, item.count - 1) : item.count) as _}
							{@render canvasCard(item.card, buddyId.includes(item.card.id))}
						{/each}
					{/each}
				</div>
			</div>
		{/if}

		<!-- Lost Deck Section -->
		{#if lostDeckItems.length > 0}
			<div class="space-y-10">
				<h2 class="inline-block bg-slate-900 px-10 py-4 text-4xl font-black text-white uppercase">
					Lost Deck ({countLost})
				</h2>
				<div class="grid grid-cols-10 gap-10">
					{#each lostDeckItems as item (item.card.id)}
						{#each Array(buddyId.includes(item.card.id) ? Math.max(0, item.count - 1) : item.count) as _}
							{@render canvasCard(item.card, buddyId.includes(item.card.id))}
						{/each}
					{/each}
				</div>
			</div>
		{/if}

		<!-- Footer -->
		<div class="flex justify-center border-t-4 border-slate-100 pt-16">
			<p class="text-2xl font-black tracking-[1em] text-slate-300 uppercase">
				bftmaker.guyssar.com
			</p>
		</div>
	</div>
</div>
