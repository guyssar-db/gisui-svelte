<script lang="ts">
	import { t } from '$lib/translations';
	import { slide } from 'svelte/transition';

	let {
		styleoptions,
		typeoptions,
		monsterOptions,
		Styleselected = $bindable(),
		Typeselected = $bindable(),
		Worldselected = $bindable(),
		Chaosselected = $bindable(),
		Hundredselected = $bindable(),
		ReBselected = $bindable(),
		Size = $bindable(),
		PowerValue = $bindable(),
		CriticalValue = $bindable(),
		DefenseValue = $bindable(),
		abilityText = $bindable(),
		selectedStyleData,
		lineCount,
		Cardname = $bindable(),
		Attibute = $bindable(),
		isMobile = false
	}: {
		styleoptions: any[];
		typeoptions: any[];
		monsterOptions: any[];
		Styleselected: string;
		Typeselected: string;
		Worldselected: string;
		Chaosselected: string;
		Hundredselected: string;
		ReBselected: string;
		Size: number;
		PowerValue: number;
		CriticalValue: number;
		DefenseValue: number;
		abilityText: string;
		selectedStyleData: any;
		lineCount: number;
		Cardname: string;
		Attibute: string;
		isMobile?: boolean;
	} = $props();

	let isCollapsed = $state(false);
	let isClassIdentityCollapsed = $state(false);
	let isCombatStatsCollapsed = $state(false);
	let isContentLoreCollapsed = $state(false);
	let isMetadataVariantsCollapsed = $state(false);
</script>

<div
	class="flex w-full flex-col gap-10 rounded-[3rem] border border-slate-200/60 bg-white/50 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 sm:p-8 md:p-12 dark:border-gray-800/60 dark:bg-gray-950/80"
>
	<div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
		<button 
			onclick={() => (isCollapsed = !isCollapsed)}
			class="group flex flex-1 items-center gap-5 text-left transition-transform active:scale-[0.98]"
		>
			<div
				class="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-indigo-600 p-0.5 shadow-lg shadow-indigo-200 transition-transform group-hover:scale-110 dark:shadow-none"
			>
				<div
					class="flex h-full w-full items-center justify-center rounded-[1.1rem] bg-white dark:bg-gray-950"
				>
					<svg
						class="h-7 w-7 text-indigo-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						/>
					</svg>
				</div>
			</div>
			<div class="space-y-1">
				<h2 class="text-3xl font-black tracking-tight text-slate-800 dark:text-white">
					{$t('cardDetails')}
				</h2>
				<p class="text-sm font-semibold text-slate-400">{$t('configureAttributes')}</p>
			</div>
		</button>

		<button
			onclick={() => (isCollapsed = !isCollapsed)}
			class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-90 dark:bg-gray-900 dark:text-slate-300 dark:hover:bg-indigo-950/30"
			aria-label={isCollapsed ? 'Expand panel' : 'Collapse panel'}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 transition-transform duration-500 {isCollapsed ? '-rotate-90' : ''}"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2.5"
					d="M19 9l-7 7-7-7"
				/>
			</svg>
		</button>
	</div>

	{#if !isCollapsed || isMobile}
		<div transition:slide={{ duration: 400 }} class="grid gap-12">
			<!-- Class & Identity -->
			<div class="space-y-6">
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<div class="space-y-2">
						<p class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
							{$t('style')}
						</p>
						<select
							bind:value={Styleselected}
							class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
						>
							{#each styleoptions as option}<option value={option.id}
									>{$t(option.name.toLowerCase() as any)}</option
								>{/each}
						</select>
					</div>

					<div class="space-y-2">
						<p class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
							{$t('type')}
						</p>
						<select
							bind:value={Typeselected}
							class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
						>
							{#each typeoptions as option}
								<option value={option.id}>
									{$t(
										option.id === 'ImpactMonsters'
											? 'impactMonster'
											: (option.name.toLowerCase().replace(/s$/, '') as any)
									)}
								</option>
							{/each}
						</select>
					</div>

					{#if selectedStyleData.id === 'Single'}
						<div class="space-y-2">
							<p class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
								{$t('world')}
							</p>
							<select
								bind:value={Worldselected}
								class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
							>
								{#each monsterOptions as option}
									<option value={option.id}>{option.name}</option>
								{/each}
							</select>
						</div>
					{:else}
						<div class="space-y-2">
							<p class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
								{$t('worldLeft')}
							</p>
							<select
								bind:value={Worldselected}
								class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
							>
								{#each monsterOptions as option}
									<option value={option.id}>{option.name}</option>
								{/each}
							</select>
						</div>
						<div class="space-y-2">
							<p class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
								{$t('worldRight')}
							</p>
							<select
								bind:value={Worldselected}
								class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
							>
								{#each monsterOptions as option}
									<option value={option.id}>{option.name}</option>
								{/each}
							</select>
						</div>
					{/if}
				</div>
			</div>

			<!-- Combat Stats -->
			<div class="space-y-6">
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
					<div class="group space-y-2">
						<p
							class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
						>
							{$t('power')}
						</p>
						<input
							type="number"
							bind:value={PowerValue}
							placeholder="0"
							class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
						/>
					</div>
					<div class="group space-y-2">
						<p
							class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
						>
							{$t('critical')}
						</p>
						<input
							type="number"
							bind:value={CriticalValue}
							placeholder="0"
							class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
						/>
					</div>
					<div class="group space-y-2">
						<p
							class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
						>
							{$t('defense')}
						</p>
						<input
							type="number"
							bind:value={DefenseValue}
							placeholder="0"
							class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
						/>
					</div>
				</div>
			</div>

			<!-- Content & Lore -->
			<div class="space-y-6">
				<div class="grid gap-6 rounded-[2rem] bg-slate-50/50 p-6 lg:p-8 dark:bg-gray-900">
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div class="group space-y-2">
							<p
								class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
							>
								{$t('cardName')}
							</p>
							<input
								type="text"
								placeholder={$t('cardName')}
								bind:value={Cardname}
								class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
							/>
						</div>
						<div class="group space-y-2">
							<p
								class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
							>
								{$t('attribute')}
							</p>
							<input
								type="text"
								placeholder={$t('attributePlaceholder')}
								bind:value={Attibute}
								class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
							/>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
						<div class="group space-y-2">
							<p
								class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
							>
								{$t('size')}
							</p>
							<input
								type="number"
								bind:value={Size}
								placeholder="0"
								class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
							/>
						</div>
						<div class="group space-y-2 sm:col-span-2">
							<p
								class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
							>
								{$t('flavorText')}
							</p>
							<input
								type="text"
								placeholder={$t('cardStory')}
								class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
							/>
						</div>
					</div>

					<div class="space-y-4">
						<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<div class="flex items-center gap-4">
								<p class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
									{$t('effect')}
								</p>
								<div class="flex flex-wrap gap-2">
									<button
										onclick={() => (abilityText += '[#246242]ข้อความ[/]')}
										class="h-7 w-7 rounded-lg border-2 border-white shadow-lg ring-1 ring-slate-100 transition-transform hover:scale-110 active:scale-95"
										style="background-color: #246242;"
										title="Insert #246242 stroke"
									></button>
									<button
										onclick={() => (abilityText += '[#304396]ข้อความ[/]')}
										class="h-7 w-7 rounded-lg border-2 border-white shadow-lg ring-1 ring-slate-100 transition-transform hover:scale-110 active:scale-95"
										style="background-color: #304396;"
										title="Insert #304396 stroke"
									></button>
									<div class="relative h-7 w-7">
										<input
											type="color"
											onchange={(e: any) =>
												(abilityText += `[#${e.target.value.substring(1).toUpperCase()}]ข้อความ[/]`)}
											class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
											title="Custom color stroke"
										/>
										<div
											class="flex h-full w-full items-center justify-center rounded-lg border-2 border-white bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg ring-1 ring-slate-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-4 w-4 text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="3"
													d="M12 4v16m8-8H4"
												/>
											</svg>
										</div>
									</div>
									<div class="mx-1 h-6 w-px bg-slate-200 dark:bg-gray-700"></div>
									<button
										onclick={() => (abilityText += '*_ข้อความ_*')}
										class="flex h-7 items-center justify-center rounded-lg border border-slate-100 bg-white px-2.5 text-[10px] font-black text-slate-600 underline shadow-sm transition-all hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800"
										>U</button
									>
									<button
										onclick={() => (abilityText += '*~ข้อความ~*')}
										class="flex h-7 items-center justify-center rounded-lg border border-slate-100 bg-white px-2.5 text-[10px] font-black text-slate-600 italic shadow-sm transition-all hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800"
										>I</button
									>
									<button
										onclick={() => (abilityText += '*/ข้อความ/*')}
										class="flex h-7 items-center justify-center rounded-lg border border-slate-100 bg-white px-3 text-[10px] font-black text-rose-500 shadow-sm transition-all hover:bg-rose-50 dark:border-gray-700 dark:bg-gray-800"
										>TEXT</button
									>
								</div>
							</div>
							<span
								class="rounded-full bg-slate-200 px-3 py-1 text-[10px] font-black text-slate-500 dark:bg-gray-800 dark:text-gray-400"
								>{lineCount} {$t('lines')}</span
							>
						</div>
						<textarea
							bind:value={abilityText}
							placeholder={$t('enterAbilities')}
							class="h-48 w-full resize-y rounded-3xl border-2 border-slate-100 bg-white px-6 py-6 text-sm leading-relaxed font-medium text-slate-700 transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
						></textarea>
					</div>
				</div>
			</div>

			<!-- Metadata & Variants -->
			<div class="space-y-6">
				<div class="flex items-center gap-3">
					<div class="h-1.5 w-1.5 rounded-full bg-indigo-600"></div>
					<h3 class="text-xs font-black tracking-widest text-slate-400 uppercase">{$t('specialFlags' as any) || 'Special Flags'}</h3>
				</div>
				<div class="grid grid-cols-1 gap-8">
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div class="group space-y-2">
							<p
								class="flex items-center gap-2 pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
							>
								<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
								</svg>
								{$t('cardSet')}
							</p>
							<input
								type="text"
								placeholder={$t('cardSetPlaceholder')}
								class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
							/>
						</div>
						<div class="group space-y-2">
							<p
								class="flex items-center gap-2 pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
							>
								<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
								</svg>
								{$t('illustrator')}
							</p>
							<input
								type="text"
								placeholder={$t('artistName')}
								class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
							/>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<button
							onclick={() => (Chaosselected = Chaosselected === 'none' ? 'chaos' : 'none')}
							class="group flex items-center justify-between rounded-2xl border-2 p-4 transition-all hover:scale-[1.02] active:scale-95 {Chaosselected !== 'none' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-slate-50 bg-slate-50 dark:bg-gray-900'}"
						>
							<div class="flex items-center gap-3">
								<div class="flex h-10 w-10 items-center justify-center rounded-xl {Chaosselected !== 'none' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400 dark:bg-gray-800'}">
									<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
									</svg>
								</div>
								<div class="text-left">
									<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">{$t('chaos')}</p>
									<p class="text-xs font-black {Chaosselected !== 'none' ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-300'} uppercase">
										{Chaosselected !== 'none' ? $t('on') : $t('off')}
									</p>
								</div>
							</div>
						</button>

						<button
							onclick={() => (Hundredselected = Hundredselected === 'none' ? 'hundred' : 'none')}
							class="group flex items-center justify-between rounded-2xl border-2 p-4 transition-all hover:scale-[1.02] active:scale-95 {Hundredselected !== 'none' ? 'border-rose-600 bg-rose-50/50 dark:bg-rose-900/20' : 'border-slate-50 bg-slate-50 dark:bg-gray-900'}"
						>
							<div class="flex items-center gap-3">
								<div class="flex h-10 w-10 items-center justify-center rounded-xl {Hundredselected !== 'none' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-400 dark:bg-gray-800'}">
									<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<div class="text-left">
									<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">{$t('hundredDemon')}</p>
									<p class="text-xs font-black {Hundredselected !== 'none' ? 'text-rose-600' : 'text-slate-600 dark:text-slate-300'} uppercase">
										{Hundredselected !== 'none' ? $t('on') : $t('off')}
									</p>
								</div>
							</div>
						</button>

						<button
							onclick={() => (ReBselected = ReBselected === 'none' ? 'reb' : 'none')}
							class="group flex items-center justify-between rounded-2xl border-2 p-4 transition-all hover:scale-[1.02] active:scale-95 {ReBselected !== 'none' ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-900/20' : 'border-slate-50 bg-slate-50 dark:bg-gray-900'}"
						>
							<div class="flex items-center gap-3">
								<div class="flex h-10 w-10 items-center justify-center rounded-xl {ReBselected !== 'none' ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-400 dark:bg-gray-800'}">
									<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
									</svg>
								</div>
								<div class="text-left">
									<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">{$t('reb')}</p>
									<p class="text-xs font-black {ReBselected !== 'none' ? 'text-amber-600' : 'text-slate-600 dark:text-slate-300'} uppercase">
										{ReBselected !== 'none' ? $t('on') : $t('off')}
									</p>
								</div>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
