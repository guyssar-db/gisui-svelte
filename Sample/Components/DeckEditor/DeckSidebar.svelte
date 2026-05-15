<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { Card, DeckItem } from './types';
	import { isRotated } from './utils';
	import { t } from '$lib/translations';

	let {
		isOpen = $bindable(),
		isStatic = false,
		activeTab = $bindable(),
		deck,
		buddyId,
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
		exportFileName = $bindable(),
		exportSubtitle = $bindable(),
		onAdd,
		onRemove,
		onSetBuddy,
		onInfo,
		onExport,
		onShowPreview
	} = $props<{
		isOpen: boolean;
		isStatic?: boolean;
		activeTab: 'deck' | 'preview';
		deck: DeckItem[];
		buddyId: string[];
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
		exportFileName: string;
		exportSubtitle: string;
		onAdd: (card: Card) => void;
		onRemove: (cardId: string) => void;
		onSetBuddy: (cardId: string) => void;
		onInfo: (card: Card, e?: Event) => void;
		onExport: () => void;
		onShowPreview: () => void;
	}>();

	let totalBiolab = $derived(totalBiolabCards);
	let totalLost = $derived(totalLostCards);
	let totalBuddyGift = $derived(totalBuddyGiftCards);
	let totalUltimate = $derived(totalUltimateCards);
</script>

{#snippet deckStats()}
	<div class="mb-6 flex flex-col gap-4">
		<div
			class="grid grid-cols-1 {totalBiolab > 0 ||
			totalLost > 0 ||
			totalBuddyGift > 0 ||
			totalUltimate > 0
				? 'sm:grid-cols-3'
				: 'sm:grid-cols-2'} gap-4"
		>
			<div
				class="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/30 dark:bg-indigo-900/20"
			>
				<p class="mb-1 text-[10px] font-black tracking-widest text-indigo-400 uppercase">
					{$t('mainDeck')}
				</p>
				<p class="text-2xl font-black text-indigo-600 dark:text-indigo-400">{totalCards}</p>
			</div>
			{#if totalBiolab > 0}
				<div
					class="rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/20"
				>
					<p class="mb-1 text-[10px] font-black tracking-widest text-blue-400 uppercase">
						{$t('biolab')}
					</p>
					<p class="text-2xl font-black text-blue-600 dark:text-blue-400">{totalBiolab}</p>
				</div>
			{/if}
			{#if totalLost > 0}
				<div
					class="rounded-2xl border border-purple-100 bg-purple-50 p-4 dark:border-purple-900/30 dark:bg-purple-900/20"
				>
					<p class="mb-1 text-[10px] font-black tracking-widest text-purple-400 uppercase">
						{$t('lost')}
					</p>
					<p class="text-2xl font-black text-purple-600 dark:text-purple-400">{totalLost}</p>
				</div>
			{/if}
			{#if totalBuddyGift > 0}
				<div
					class="rounded-2xl border border-rose-100 bg-rose-50 p-4 dark:border-rose-900/30 dark:bg-rose-900/20"
				>
					<p class="mb-1 text-[10px] font-black tracking-widest text-rose-400 uppercase">
						{$t('buddyGift')}
					</p>
					<p class="text-2xl font-black text-rose-600 dark:text-rose-400">{totalBuddyGift}</p>
				</div>
			{/if}
			{#if totalUltimate > 0}
				<div
					class="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-900/30 dark:bg-slate-900/20"
				>
					<p class="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
						{$t('ultimate')}
					</p>
					<p class="text-2xl font-black text-slate-800 dark:text-slate-200">{totalUltimate}</p>
				</div>
			{/if}
			{#if !(totalBiolab > 0 || totalLost > 0 || totalBuddyGift > 0 || totalUltimate > 0)}
				<div
					class="custom-scrollbar flex min-w-0 items-center gap-4 overflow-x-auto rounded-2xl border border-amber-100 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/20"
				>
					{#if buddyItems.length > 0}
						<div class="flex min-w-0 gap-2">
							{#each buddyItems as bItem}
								<div class="flex shrink-0 items-center gap-2">
									<img src={bItem.card.imagePath} alt="" class="h-10 w-auto rounded shadow-sm" />
									<div class="min-w-0">
										<p class="mb-0.5 text-[8px] leading-none font-black text-amber-400 uppercase">
											{$t('buddy')}
										</p>
										<p class="max-w-[80px] truncate text-[10px] font-black text-amber-600">
											{bItem.card.name}
										</p>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<div class="flex-1 text-center">
							<p class="text-[10px] font-black text-amber-400 uppercase">{$t('noBuddy')}</p>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		{#if totalBiolab > 0 || totalLost > 0}
			<div
				class="custom-scrollbar flex min-w-0 items-center gap-4 overflow-x-auto rounded-2xl border border-amber-100 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/20"
			>
				{#if buddyItems.length > 0}
					<div class="flex min-w-0 gap-2">
						{#each buddyItems as bItem}
							<div class="flex shrink-0 items-center gap-2">
								<img src={bItem.card.imagePath} alt="" class="h-10 w-auto rounded shadow-sm" />
								<div class="min-w-0">
									<p class="mb-0.5 text-[8px] leading-none font-black text-amber-400 uppercase">
										{$t('buddy')}
									</p>
									<p class="max-w-[80px] truncate text-[10px] font-black text-amber-600">
										{bItem.card.name}
									</p>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="flex-1 text-center">
						<p class="text-[10px] font-black text-amber-400 uppercase">{$t('noBuddy')}</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet canvasCard(card: Card, buddyIcon: boolean)}
	{@const rotated = isRotated(card)}
	<div class="relative aspect-[5/7] w-48">
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
				class="absolute -top-5 -left-5 z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-amber-400 text-3xl font-black text-white shadow-xl"
			>
				B
			</div>
		{/if}
	</div>
{/snippet}

{#snippet deckListItem(item: DeckItem)}
	{@const rotated = isRotated(item.card)}
	{@const isBuddy = buddyId.includes(item.card.id)}
	<div
		class="group flex items-center justify-between gap-4 rounded-2xl border border-transparent bg-slate-50 p-4 shadow-sm transition-all hover:border-indigo-100 hover:bg-white hover:shadow-md dark:bg-gray-900/50 dark:hover:border-indigo-900/30 dark:hover:bg-gray-800 {isBuddy
			? 'ring-2 ring-amber-400'
			: ''}"
	>
		<div class="flex min-w-0 flex-1 items-center gap-4">
			<div class="relative h-16 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-200">
				<img
					src={item.card.imagePath}
					alt=""
					class="transition-all duration-300"
					style={rotated
						? 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(90deg) scale(140%); object-fit: stretch;'
						: 'width: 100%; height: 100%; object-fit: cover;'}
				/>
				{#if isBuddy}
					<div
						class="absolute -top-1 -left-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-amber-400 text-[8px] font-black text-white shadow-md dark:border-gray-800"
					>
						B
					</div>
				{/if}
			</div>
			<div class="overflow-hidden">
				<p class="truncate text-sm leading-tight font-black text-slate-800 dark:text-white">
					{item.card.name}
				</p>
				<p class="mt-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
					{item.card.cardId}
				</p>
			</div>
		</div>
		<div class="flex shrink-0 items-center gap-2">
			<button
				onclick={(e) => onInfo(item.card, e)}
				class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition-all hover:text-indigo-600 dark:bg-gray-800"
				aria-label="View info for {item.card.name}"
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.5"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
			</button>
			<div
				class="flex items-center rounded-lg border border-slate-100 bg-white p-1 dark:border-gray-700 dark:bg-gray-800"
			>
				<button
					onclick={() => onRemove(item.card.id)}
					class="flex h-6 w-6 items-center justify-center text-slate-400 hover:text-red-500"
					aria-label="Decrease {item.card.name} count">-</button
				>
				<span class="w-6 text-center text-xs font-black dark:text-white">{item.count}</span>
				<button
					onclick={() => onAdd(item.card)}
					class="flex h-6 w-6 items-center justify-center text-slate-400 hover:text-indigo-500"
					aria-label="Increase {item.card.name} count">+</button
				>
			</div>
			{#if !item.card.type?.includes('แฟลก') && !item.card.type?.includes('Flag')}
				<button
					onclick={() => onSetBuddy(item.card.id)}
					class="rounded-lg px-2 py-1 text-[8px] font-black uppercase transition-colors {isBuddy
						? 'bg-amber-400 text-white hover:bg-amber-500'
						: 'bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400'}"
				>
					{isBuddy ? $t('buddy') : $t('setBuddy')}
				</button>
			{/if}
		</div>
	</div>
{/snippet}

{#if isOpen || isStatic}
	{#if !isStatic}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			transition:fade={{ duration: 200 }}
			onclick={() => (isOpen = false)}
			class="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-md"
		></div>
	{/if}

	<div
		transition:fly={isStatic ? { duration: 0 } : { x: 500, duration: 400 }}
		class={isStatic
			? 'flex h-[calc(100dvh-120px)] w-full flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950'
			: 'fixed top-0 right-0 z-50 flex h-dvh w-full flex-col bg-white shadow-2xl sm:w-[500px] lg:w-[600px] dark:bg-gray-950'}
	>
		<div class="flex border-b border-slate-100 {isStatic ? '' : 'pt-16'} dark:border-gray-800">
			<button
				onclick={() => (activeTab = 'deck')}
				class="flex-1 border-b-2 py-5 text-[10px] font-black uppercase transition-all {activeTab ===
				'deck'
					? 'border-indigo-600 bg-indigo-50/50 text-indigo-600 dark:bg-indigo-950/20'
					: 'border-transparent text-slate-400'}">{$t('editor')} ({totalCards})</button
			>
			<button
				onclick={() => (activeTab = 'preview')}
				class="flex-1 border-b-2 py-5 text-[10px] font-black uppercase transition-all {activeTab ===
				'preview'
					? 'border-indigo-600 bg-indigo-50/50 text-indigo-600 dark:bg-indigo-950/20'
					: 'border-transparent text-slate-400'}">{$t('preview')}</button
			>
		</div>

		<div class="custom-scrollbar flex-1 overflow-y-auto p-6">
			{#if activeTab === 'deck'}
				<div transition:fade={{ duration: 200 }}>
					{@render deckStats()}

					<!-- Flags -->
					<div class="mb-8 space-y-3">
						<h3
							class="mb-4 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase"
						>
							<span class="h-px flex-1 bg-slate-100 dark:bg-gray-800"></span>
							{$t('flagsAndBuddy')}
							<span class="h-px flex-1 bg-slate-100 dark:bg-gray-800"></span>
						</h3>
						{#each mainFlagItems as item (item.card.id)}
							{@render deckListItem(item)}
						{/each}
						{#each buddyItems.filter((b: { card: { id: any } }) => !mainFlagItems.some((f: { card: { id: any } }) => f.card.id === b.card.id)) as item (item.card.id)}
							{@render deckListItem(item)}
						{/each}
					</div>

					<!-- Main Deck + Special Flag Count -->
					<div class="mb-8 space-y-3">
						<h3
							class="mb-4 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase"
						>
							<span class="h-px flex-1 bg-slate-100 dark:bg-gray-800"></span>
							{$t('mainDeck')} ({mainDeckItems.reduce((s: number, i: DeckItem) => s + i.count, 0) +
								specialFlagItems.reduce((s: number, i: DeckItem) => s + i.count, 0) -
								buddyId.filter((id: any) =>
									mainDeckItems
										.concat(specialFlagItems)
										.some((i: { card: { id: any } }) => i.card.id === id)
								).length})
							<span class="h-px flex-1 bg-slate-100 dark:bg-gray-800"></span>
						</h3>
						{#each mainDeckItems as item (item.card.id)}
							{@render deckListItem(item)}
						{/each}
						{#each specialFlagItems as item (item.card.id)}
							{@render deckListItem(item)}
						{/each}
					</div>

					<!-- Ultimate Deck -->
					{#if ultimateItems.length > 0}
						<div class="mb-8 space-y-3">
							<h3
								class="mb-4 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase"
							>
								<span class="h-px flex-1 bg-slate-100 dark:bg-gray-800"></span>
								{$t('ultimate')} ({totalUltimate})
								<span class="h-px flex-1 bg-slate-100 dark:bg-gray-800"></span>
							</h3>
							{#each ultimateItems as item (item.card.id)}
								{@render deckListItem(item)}
							{/each}
						</div>
					{/if}

					<!-- Bio-lab Deck -->
					{#if biolabDeckItems.length > 0}
						<div class="mb-8 space-y-3">
							<h3
								class="mb-4 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-indigo-500 uppercase"
							>
								<span class="h-px flex-1 bg-indigo-50 dark:bg-indigo-900/20"></span>
								{$t('biolab')} ({totalBiolab})
								<span class="h-px flex-1 bg-indigo-50 dark:bg-indigo-900/20"></span>
							</h3>
							{#each biolabDeckItems as item (item.card.id)}
								{@render deckListItem(item)}
							{/each}
						</div>
					{/if}

					<!-- Lost Deck -->
					{#if lostDeckItems.length > 0}
						<div class="mb-8 space-y-3">
							<h3
								class="mb-4 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-indigo-500 uppercase"
							>
								<span class="h-px flex-1 bg-indigo-50 dark:bg-indigo-900/20"></span>
								{$t('lost')} ({totalLost})
								<span class="h-px flex-1 bg-indigo-50 dark:bg-indigo-900/20"></span>
							</h3>
							{#each lostDeckItems as item (item.card.id)}
								{@render deckListItem(item)}
							{/each}
						</div>
					{/if}

					<!-- Buddy Gift Deck -->
					{#if buddyGiftItems.length > 0}
						<div class="mb-8 space-y-3">
							<h3
								class="mb-4 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-rose-500 uppercase"
							>
								<span class="h-px flex-1 bg-rose-50 dark:bg-rose-900/20"></span>
								{$t('buddyGift')} ({totalBuddyGift})
								<span class="h-px flex-1 bg-rose-50 dark:bg-rose-900/20"></span>
							</h3>
							{#each buddyGiftItems as item (item.card.id)}
								{@render deckListItem(item)}
							{/each}
						</div>
					{/if}

					{#if deck.length === 0}
						<div class="py-20 text-center">
							<p class="font-bold tracking-widest text-slate-300 uppercase italic">
								{$t('yourDeckIsEmpty')}
							</p>
						</div>
					{/if}
				</div>
			{:else}
				<div transition:fade={{ duration: 200 }} class="flex flex-col gap-6">
					<div
						class="w-full overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 p-4 shadow-inner dark:border-gray-800 dark:bg-gray-900"
						style=" background-size: 20px 20px;"
					>
						<div class=" space-y-12" style="zoom: 0.35;">
							<div class="grid grid-cols-2 gap-10">
								<div class="space-y-4">
									<h3
										class="inline-block border-b-4 border-slate-800 pb-1 text-2xl font-black text-slate-800 uppercase dark:text-white"
									>
										{$t('flagsAndBuddy')}
									</h3>
									<div class="flex flex-wrap gap-4">
										{#each mainFlagItems as item}
											{#each Array(buddyId.includes(item.card.id) ? item.count - 1 : item.count) as _}
												{@render canvasCard(item.card, buddyId.includes(item.card.id))}
											{/each}
										{/each}
										{#each buddyItems as item}
											{@render canvasCard(item.card, true)}
										{/each}
									</div>
								</div>
								<div class="space-y-4">
									<h3
										class="inline-block border-b-4 border-slate-800 pb-1 text-2xl font-black text-slate-800 uppercase dark:text-white"
									>
										{$t('specialFlag')}
									</h3>
									<div class="flex flex-wrap gap-4">
										{#each specialFlagItems as item}{#each Array(buddyId.includes(item.card.id) ? item.count - 1 : item.count) as _}{@render canvasCard(
													item.card,
													buddyId.includes(item.card.id)
												)}{/each}{/each}
									</div>
								</div>
							</div>

							<!-- Buddy Gift Preview -->
							{#if buddyGiftItems.length > 0}
								<div class="space-y-4">
									<h3
										class="inline-block border-b-4 border-rose-600 pb-1 text-2xl font-black text-rose-600 uppercase dark:text-rose-400"
									>
										{$t('buddyGift')}
									</h3>
									<div class="grid grid-cols-7 gap-4">
										{#each buddyGiftItems as item}
											{#each Array(buddyId.includes(item.card.id) ? item.count - 1 : item.count) as _}
												{@render canvasCard(item.card, buddyId.includes(item.card.id))}
											{/each}
										{/each}
									</div>
								</div>
							{/if}

							<!-- Ultimate Preview -->
							{#if ultimateItems.length > 0}
								<div class="space-y-4">
									<h3
										class="inline-block border-b-4 border-slate-600 pb-1 text-2xl font-black text-slate-600 uppercase dark:text-slate-400"
									>
										{$t('ultimate')}
									</h3>
									<div class="grid grid-cols-7 gap-4">
										{#each ultimateItems as item}
											{#each Array(buddyId.includes(item.card.id) ? item.count - 1 : item.count) as _}
												{@render canvasCard(item.card, buddyId.includes(item.card.id))}
											{/each}
										{/each}
									</div>
								</div>
							{/if}

							<div class="space-y-4">
								<h3
									class="inline-block border-b-4 border-slate-800 pb-1 text-2xl font-black text-slate-800 uppercase dark:text-white"
								>
									{$t('mainDeck')}
								</h3>
								<div class="grid grid-cols-7 gap-4">
									{#each mainDeckItems as item}
										{#each Array(buddyId.includes(item.card.id) ? item.count - 1 : item.count) as _}
											{@render canvasCard(item.card, buddyId.includes(item.card.id))}
										{/each}
									{/each}
								</div>
							</div>

							<!-- Biolab Preview -->
							{#if biolabDeckItems.length > 0}
								<div class="space-y-4">
									<h3
										class="inline-block border-b-4 border-indigo-600 pb-1 text-2xl font-black text-indigo-600 uppercase dark:text-indigo-400"
									>
										{$t('biolab')}
									</h3>
									<div class="grid grid-cols-7 gap-4">
										{#each biolabDeckItems as item}
											{#each Array(buddyId.includes(item.card.id) ? item.count - 1 : item.count) as _}
												{@render canvasCard(item.card, buddyId.includes(item.card.id))}
											{/each}
										{/each}
									</div>
								</div>
							{/if}

							<!-- Lost Preview -->
							{#if lostDeckItems.length > 0}
								<div class="space-y-4">
									<h3
										class="inline-block border-b-4 border-indigo-600 pb-1 text-2xl font-black text-indigo-600 uppercase dark:text-indigo-400"
									>
										{$t('lost')}
									</h3>
									<div class="grid grid-cols-7 gap-4">
										{#each lostDeckItems as item}
											{#each Array(buddyId.includes(item.card.id) ? item.count - 1 : item.count) as _}
												{@render canvasCard(item.card, buddyId.includes(item.card.id))}
											{/each}
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>

					<div
						class="space-y-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 dark:border-gray-800 dark:bg-gray-900"
					>
						<div class="space-y-1.5">
							<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
								{$t('fileName')}
							</p>
							<input
								type="text"
								bind:value={exportFileName}
								class="w-full rounded-2xl border-2 border-white bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-800 dark:text-slate-200 dark:focus:border-indigo-500"
								placeholder="my-cool-deck"
							/>
						</div>
						<div class="space-y-1.5">
							<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
								Custom Subtitle
							</p>
							<input
								type="text"
								bind:value={exportSubtitle}
								class="w-full rounded-2xl border-2 border-white bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-800 dark:text-slate-200 dark:focus:border-indigo-500"
								placeholder="Generated via Buddyfight Create"
							/>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-3">
						<button
							onclick={onShowPreview}
							class="w-full rounded-2xl border border-indigo-100 bg-indigo-50 py-4 text-xs font-black text-indigo-600 uppercase transition-all hover:bg-indigo-100 dark:border-indigo-900/30 dark:bg-indigo-900/20 dark:text-indigo-400"
							>{$t('previewFullImage')}</button
						>
						<button
							onclick={onExport}
							class="w-full rounded-2xl bg-indigo-600 py-4 text-xs font-black text-white uppercase shadow-lg transition-all hover:scale-[1.02] active:scale-95"
							>{$t('downloadPng')}</button
						>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #e2e8f0;
		border-radius: 10px;
	}
	:global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
		background: #1e293b;
	}
</style>
