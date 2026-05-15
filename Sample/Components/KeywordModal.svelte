<script lang="ts">
	import { t, type TranslationKey } from '$lib/translations';
	import { showKeywordModal, customKeywords, addToast, type CustomKeyword } from '$lib/themeStore';
	import { fade, fly, scale } from 'svelte/transition';
	import JSZip from 'jszip';

	let {
		searchQuery = $bindable(),
		keywordFilter = $bindable(),
		filteredKeywords,
		addKeyword,
		removeCustomKeyword
	}: {
		searchQuery: string;
		keywordFilter: string;
		filteredKeywords: [string, any][];
		addKeyword: (key: string) => void;
		removeCustomKeyword: (trigger: string) => void;
	} = $props();

	let addedKey = $state<string | null>(null);
	let customTrigger = $state('');
	let customImage = $state<string | null>(null);
	let customWidth = $state(70);
	let customHeight = $state(22);
	let editingTrigger = $state<string | null>(null);

	const resetForm = () => {
		customTrigger = '';
		customImage = null;
		customWidth = 70;
		customHeight = 22;
		editingTrigger = null;
	};

	const handleCustomImageUpload = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				customImage = event.target?.result as string;
			};
			reader.readAsDataURL(file);
		}
	};

	const addCustomKeywordAction = () => {
		if (customTrigger && customImage) {
			customKeywords.update((ks) => {
				if (editingTrigger) {
					return ks.map((k) =>
						k.trigger === editingTrigger
							? {
									...k,
									trigger: customTrigger,
									image: customImage as string,
									w: customWidth,
									h: customHeight,
									m: 5.5,
									bw: customWidth,
									mr: 0
								}
							: k
					);
				} else {
					return [
						...ks,
						{
							trigger: customTrigger,
							image: customImage as string,
							file: '',
							w: customWidth,
							h: customHeight,
							m: 5.5,
							bw: customWidth,
							mr: 0
						}
					];
				}
			});
			addToast(editingTrigger ? 'Keyword updated' : 'Keyword added successfully', 'success');
			resetForm();
		}
	};

	const exportKeywords = async () => {
		const ks = [...$customKeywords];
		if (ks.length === 0) {
			addToast('No custom keywords to export', 'info');
			return;
		}

		const zip = new JSZip();
		const metadata = ks.map((k, index) => {
			const fileName = `image_${index}.png`;
			const base64Data = k.image.split(',')[1];
			zip.file(`images/${fileName}`, base64Data, { base64: true });
			return {
				trigger: k.trigger,
				w: k.w,
				h: k.h,
				m: k.m,
				bw: k.bw,
				mr: k.mr,
				imageFile: fileName
			};
		});

		zip.file('keywords.json', JSON.stringify(metadata, null, 2));

		const content = await zip.generateAsync({ type: 'blob' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(content);
		link.download = 'custom_keywords.zip';
		link.click();
		addToast('exportKeywordsSuccess', 'success');
	};

	const handleImportZip = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		try {
			const zip = await JSZip.loadAsync(file);
			const jsonFile = zip.file('keywords.json');
			if (!jsonFile) throw new Error('keywords.json not found');

			const metadata = JSON.parse(await jsonFile.async('string'));
			const importedKeywords: CustomKeyword[] = [];

			for (const item of metadata) {
				const imageFile = zip.file(`images/${item.imageFile}`);
				if (imageFile) {
					const base64 = await imageFile.async('base64');
					const image = `data:image/png;base64,${base64}`;
					importedKeywords.push({
						trigger: item.trigger,
						image: image,
						file: '',
						w: item.w,
						h: item.h,
						m: item.m,
						bw: item.bw,
						mr: item.mr
					});
				}
			}

			customKeywords.update((ks) => {
				const existingTriggers = new Set(ks.map((k) => k.trigger));
				const uniqueNew = importedKeywords.filter((k) => !existingTriggers.has(k.trigger));
				return [...ks, ...uniqueNew];
			});

			addToast('importKeywordsSuccess', 'success');
			target.value = '';
		} catch (error) {
			console.error('Import error:', error);
			addToast('importKeywordsError', 'error');
		}
	};

	const startEditing = (data: CustomKeyword) => {
		customTrigger = data.trigger;
		customImage = data.image;
		customWidth = data.w;
		customHeight = data.h;
		editingTrigger = data.trigger;
	};

	const handleRemoveCustomKeyword = (trigger: string) => {
		removeCustomKeyword(trigger);
		addToast('Keyword removed', 'info');
		if (editingTrigger === trigger) {
			resetForm();
		}
	};

	const handleAddKeyword = (key: string) => {
		addKeyword(key);
		addedKey = key;
		setTimeout(() => (addedKey = null), 1000);
	};
</script>

{#if $showKeywordModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		transition:fade={{ duration: 300 }}
		onclick={() => showKeywordModal.set(false)}
		class="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md"
	>
		<div
			transition:scale={{ start: 0.95, duration: 400, opacity: 0 }}
			onclick={(e) => e.stopPropagation()}
			class="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl dark:bg-gray-900"
		>
			<!-- Row 1: Title & Close -->
			<div
				class="flex items-center justify-between border-b border-slate-100 p-6 md:px-12 dark:border-gray-800"
			>
				<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
					<div class="space-y-1">
						<h3
							class="text-2xl font-black tracking-tighter text-slate-800 md:text-3xl dark:text-white"
						>
							{$t('keywordLibrary')}
						</h3>
						<p class="hidden text-sm font-medium text-slate-400 sm:block">
							{$t('selectIcon')}
						</p>
					</div>
					<div class="flex items-center gap-2">
						<label
							class="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-[10px] font-black text-slate-600 transition-all hover:bg-indigo-600 hover:text-white dark:bg-gray-800 dark:text-slate-300"
						>
							<input type="file" accept=".zip" onchange={handleImportZip} class="hidden" />
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3.5 w-3.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
								/>
							</svg>
							{$t('importKeywords')}
						</label>
						<button
							onclick={exportKeywords}
							class="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-[10px] font-black text-slate-600 transition-all hover:bg-indigo-600 hover:text-white dark:bg-gray-800 dark:text-slate-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3.5 w-3.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
								/>
							</svg>
							{$t('exportKeywords')}
						</button>
					</div>
				</div>
				<button
					onclick={() => showKeywordModal.set(false)}
					class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500 dark:bg-gray-800 dark:hover:bg-rose-950/30"
					aria-label="Close modal"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Scrollable Content Area -->
			<div class="custom-scrollbar flex-1 overflow-y-auto">
				<!-- Row 2: Filter & Search -->
				<div
					class="sticky top-0 z-20 border-b border-slate-100 bg-white/80 p-6 backdrop-blur-md md:px-12 dark:border-gray-800 dark:bg-gray-900/80"
				>
					<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div class="flex items-center gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-gray-800">
							{#each ['all', 'existing', 'custom'] as filter}
								<button
									onclick={() => (keywordFilter = filter)}
									class="flex-1 rounded-xl px-4 py-2 text-[10px] font-black uppercase transition-all md:flex-none {keywordFilter ===
									filter
										? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
										: 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}"
								>
									{$t(filter as TranslationKey)}
								</button>
							{/each}
						</div>

						<div class="group relative max-w-md flex-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500"
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
							<input
								type="text"
								bind:value={searchQuery}
								placeholder={$t('searchKeywords')}
								class="w-full rounded-2xl border-2 border-slate-100 bg-white py-3 pr-4 pl-12 text-sm font-bold transition-all outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-800 dark:text-slate-200 dark:focus:border-indigo-500"
							/>
						</div>
					</div>
				</div>

				<!-- Row 3: Add Custom Keyword Section -->
				<div
					class="border-b border-slate-100 bg-slate-50/30 p-6 md:p-12 dark:border-gray-800 dark:bg-gray-900/30"
				>
					<div class="mx-auto max-w-3xl">
						<div class="mb-6 flex items-center gap-4">
							<h4 class="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
								{$t('addCustomKeyword')}
							</h4>
							<div class="h-px flex-1 bg-slate-200 dark:bg-gray-800"></div>
						</div>

						<div class="flex flex-col gap-6">
							<!-- Identity Row -->
							<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div class="space-y-1.5">
									<p class="pl-1 text-[9px] font-black tracking-widest text-slate-400 uppercase">
										{$t('trigger')}
									</p>
									<input
										type="text"
										bind:value={customTrigger}
										placeholder="e.g. MyKey"
										class="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm font-bold transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
									/>
								</div>

								<div class="space-y-1.5">
									<p class="pl-1 text-[9px] font-black tracking-widest text-slate-400 uppercase">
										{$t('iconImage')}
									</p>
									<label
										class="flex cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed border-slate-200 bg-white px-5 py-3.5 transition-all hover:border-indigo-50 hover:bg-indigo-50/30 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-indigo-950/10"
									>
										<input
											type="file"
											accept="image/*"
											onchange={handleCustomImageUpload}
											class="hidden"
										/>
										{#if customImage}
											<div class="flex items-center gap-3">
												<img src={customImage} alt="preview" class="h-6 w-6 object-contain" />
												<span class="text-[10px] font-black text-indigo-600 uppercase"
													>{$t('changeImage')}</span
												>
											</div>
										{:else}
											<div class="flex items-center gap-3">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-5 w-5 text-slate-300"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
													/>
												</svg>
												<span class="text-[10px] font-black text-slate-400 uppercase"
													>{$t('chooseImage')}</span
												>
											</div>
										{/if}
									</label>
								</div>
							</div>

							<!-- Settings & Actions Row -->
							<div class="flex flex-col gap-6 lg:flex-row lg:items-end">
								<div class="grid flex-1 grid-cols-2 gap-4">
									<div class="space-y-1.5">
										<p class="pl-1 text-[9px] font-black tracking-widest text-slate-400 uppercase">
											{$t('width')}
										</p>
										<input
											type="number"
											bind:value={customWidth}
											class="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-xs font-bold transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
										/>
									</div>
									<div class="space-y-1.5">
										<p class="pl-1 text-[9px] font-black tracking-widest text-slate-400 uppercase">
											{$t('height')}
										</p>
										<input
											type="number"
											bind:value={customHeight}
											class="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-xs font-bold transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
										/>
									</div>
								</div>

								<div class="flex items-center gap-2">
									<button
										onclick={addCustomKeywordAction}
										disabled={!customTrigger || !customImage}
										class="min-w-32 flex-1 rounded-2xl bg-indigo-600 py-4 text-[11px] font-black tracking-[0.2em] text-white uppercase shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 lg:flex-none dark:shadow-none"
									>
										{editingTrigger ? $t('update' as any) : $t('add')}
									</button>
									{#if editingTrigger}
										<button
											onclick={resetForm}
											class="rounded-2xl bg-slate-100 px-6 py-4 text-[11px] font-black tracking-[0.2em] text-slate-500 uppercase transition-all hover:bg-rose-50 hover:text-rose-500 active:scale-95 dark:bg-gray-800 dark:text-slate-400 dark:hover:bg-rose-950/30"
										>
											{$t('cancel')}
										</button>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Row 4: Keyword Grid -->
				<div class="p-6 md:p-12">
					{#if filteredKeywords.length === 0}
						<div class="flex flex-col items-center justify-center py-20 text-center opacity-50">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-16 w-16 text-slate-300"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<p class="mt-4 text-lg font-bold text-slate-400">{$t('noKeywordsFound')}</p>
						</div>
					{:else}
						<div
							class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
						>
							{#each filteredKeywords as [key, data]}
								<div class="group relative">
									<button
										onclick={() => handleAddKeyword(key)}
										class="flex w-full flex-col items-center gap-4 rounded-[2rem] border-2 border-slate-50 bg-slate-50 p-6 transition-all hover:scale-[1.02] hover:border-indigo-500 hover:bg-white hover:shadow-2xl dark:border-gray-800 dark:bg-gray-800/50 dark:hover:bg-gray-800 dark:hover:shadow-none"
									>
										<div class="flex h-14 w-full items-center justify-center">
											<img
												src={data.isCustom ? data.image : `/images/keywords/${data.file}`}
												alt={key}
												class="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 group-active:scale-95"
											/>
										</div>
										<div class="flex flex-col items-center gap-1">
											<span
												class="text-[9px] font-black tracking-widest text-slate-400 uppercase transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
											>
												{key.replace('@', '')}
											</span>
											{#if addedKey === key}
												<span class="animate-bounce text-[8px] font-black text-emerald-500"
													>{$t('added')}</span
												>
											{/if}
										</div>
									</button>

									{#if data.isCustom}
										<div class="absolute -top-1.5 -right-1.5 flex gap-1">
											<button
												onclick={(e) => {
													e.stopPropagation();
													startEditing(data);
												}}
												class="flex h-7 w-7 items-center justify-center rounded-full bg-white text-indigo-600 shadow-xl ring-1 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white active:scale-90 dark:bg-gray-700 dark:ring-gray-800"
												title="Edit custom keyword"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-3.5 w-3.5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
													/>
												</svg>
											</button>
											<button
												onclick={(e) => {
													e.stopPropagation();
													handleRemoveCustomKeyword(data.trigger);
												}}
												class="flex h-7 w-7 items-center justify-center rounded-full bg-white text-rose-500 shadow-xl ring-1 ring-slate-100 transition-all hover:bg-rose-500 hover:text-white active:scale-90 dark:bg-gray-700 dark:ring-gray-800"
												title="Remove custom keyword"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-4 w-4"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="3"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
