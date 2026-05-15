<script lang="ts">
	import { t } from '$lib/translations';
	import { fade, scale } from 'svelte/transition';

	let {
		showModal = $bindable(),
		fileName = $bindable(),
		subtitle = $bindable('Generated via Buddyfight Create'),
		performDownload,
		exportScale = $bindable(2),
		exportFormat = $bindable('png'),
		isAdmin = false
	}: {
		showModal: boolean;
		fileName: string;
		subtitle?: string;
		performDownload: () => void;
		exportScale: number;
		exportFormat: 'png' | 'webp';
		isAdmin?: boolean;
	} = $props();

	const scales = [1, 2, 3, 4];

	$effect(() => {
		if (!isAdmin && exportFormat === 'webp') {
			exportFormat = 'png';
		}
	});
</script>

{#if showModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		transition:fade={{ duration: 300 }}
		onclick={() => (showModal = false)}
		class="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md"
	>
		<div
			transition:scale={{ start: 0.95, duration: 400, opacity: 0 }}
			onclick={(e) => e.stopPropagation()}
			class="flex w-full max-w-md max-h-[90vh] flex-col gap-6 overflow-y-auto rounded-4xl bg-white p-6 shadow-2xl md:gap-8 md:p-10 dark:border dark:border-gray-800 dark:bg-gray-900"
		>
			<div class="space-y-2 text-center">
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 md:h-16 md:w-16 dark:bg-indigo-900/30"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-indigo-600 md:h-8 md:w-8 dark:text-indigo-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-black tracking-tight text-slate-800 md:text-2xl dark:text-white">
					{$t('readyToExport')}
				</h3>
				<p class="text-xs font-medium text-slate-400 md:text-sm">
					{$t('giveMasterpieceName')}
				</p>
			</div>

			<div class="space-y-4">
				<div class="space-y-1.5">
					<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
						{$t('format')}
					</p>
					<div class="grid {isAdmin ? 'grid-cols-2' : 'grid-cols-1'} gap-2">
						<button
							onclick={() => (exportFormat = 'png')}
							class="flex flex-col items-center rounded-xl py-2 md:py-3 transition-all {exportFormat ===
							'png'
								? 'bg-indigo-600 text-white shadow-lg'
								: 'bg-slate-50 text-slate-400 hover:bg-slate-100 dark:bg-gray-800'}"
						>
							<span class="text-xs font-black uppercase md:text-sm">PNG / JPG</span>
							<span class="text-[8px] font-bold opacity-70">{$t('saveToDb' as any)}</span>
						</button>
						{#if isAdmin}
							<button
								onclick={() => (exportFormat = 'webp')}
								class="flex flex-col items-center rounded-xl py-2 md:py-3 transition-all {exportFormat ===
								'webp'
									? 'bg-amber-500 text-white shadow-lg'
									: 'bg-slate-50 text-slate-400 hover:bg-slate-100 dark:bg-gray-800'}"
							>
								<span class="text-xs font-black uppercase md:text-sm">WebP (Trial)</span>
								<span class="text-[8px] font-bold opacity-70">{$t('noDbSave' as any)}</span>
							</button>
						{/if}
					</div>
				</div>

				<div class="space-y-1.5">
					<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
						{$t('exportScale')}
					</p>
					<div class="grid grid-cols-4 gap-2">
						{#each scales as scale}
							<button
								onclick={() => (exportScale = scale)}
								class="rounded-xl py-2 text-xs font-black transition-all md:py-3 md:text-sm {exportScale ===
								scale
									? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
									: 'bg-slate-50 text-slate-400 hover:bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700'}"
							>
								x{scale}
							</button>
						{/each}
					</div>
				</div>

				<div class="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-3 md:p-4 dark:bg-gray-800">
					<div class="flex flex-col items-center gap-1">
						<span class="text-[8px] font-bold text-slate-400 uppercase md:text-[10px]">{$t('format')}</span>
						<span class="text-xs font-black text-slate-600 md:text-sm dark:text-slate-300"
							>{exportFormat.toUpperCase()}</span
						>
					</div>
					<div
						class="flex flex-col items-center gap-1 border-l border-slate-200 dark:border-gray-700"
					>
						<span class="text-[8px] font-bold text-slate-400 uppercase md:text-[10px]">{$t('quality')}</span>
						<span class="text-xs font-black text-slate-600 md:text-sm dark:text-slate-300">
							{exportScale === 1
								? $t('low')
								: exportScale === 2
									? $t('medium')
									: exportScale === 3
										? $t('high')
										: $t('ultraHigh')}
						</span>
					</div>
				</div>
			</div>

			<div class="flex gap-4">
				<button
					onclick={() => (showModal = false)}
					class="flex-1 rounded-2xl py-3 text-xs font-black tracking-wider text-slate-400 uppercase transition-all hover:bg-slate-100 hover:text-slate-600 md:py-4 md:text-sm dark:hover:bg-gray-800"
				>
					{$t('cancel')}
				</button>
				<button
					onclick={performDownload}
					class="flex-1 rounded-2xl bg-indigo-600 py-3 text-xs font-black tracking-wider text-white uppercase shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95 md:py-4 md:text-sm dark:shadow-none"
				>
					{$t('download')}
				</button>
			</div>
		</div>
	</div>
{/if}
