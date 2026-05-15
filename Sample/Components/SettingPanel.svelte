<script lang="ts">
	import { t, type TranslationKey } from '$lib/translations';
	import { slide } from 'svelte/transition';

	let {
		BGscale = $bindable(),
		BGtranslateX = $bindable(),
		BGtranslateY = $bindable(),
		isBGLocked = $bindable(),
		move,
		resetTransform,
		Textcolor = $bindable(),
		textcolorOptions,
		CardNameScaleX = $bindable(),
		AttributeScaleX = $bindable(),
		CardNameOffsetX = $bindable(),
		CardNameOffsetY = $bindable(),
		AttributeOffsetX = $bindable(),
		AttributeOffsetY = $bindable(),
		EffectOffsetX = $bindable(),
		EffectOffsetY = $bindable(),
		isMobile = false
	}: {
		BGscale: number;
		BGtranslateX: number;
		BGtranslateY: number;
		isBGLocked: boolean;
		move: (x: number, y: number) => void;
		resetTransform: () => void;
		Textcolor: string;
		textcolorOptions: any[];
		CardNameScaleX: number;
		AttributeScaleX: number;
		CardNameOffsetX: number;
		CardNameOffsetY: number;
		AttributeOffsetX: number;
		AttributeOffsetY: number;
		EffectOffsetX: number;
		EffectOffsetY: number;
		isMobile?: boolean;
	} = $props();

	let isCollapsed = $state(true);
</script>

<div
	class="flex w-full flex-col gap-10 rounded-[3rem] border border-slate-200/60 bg-white/50 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 md:p-12 dark:border-gray-800/60 dark:bg-gray-950/80"
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
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.756 0 002.573 1.066c1.543.94 3.31.826 2.37 2.37a1.724 1.756 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.756 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.756 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.756 0 00-2.573-1.066c-1.543-.94-3.31-.826-2.37-2.37a1.724 1.756 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.756 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</div>
			</div>
			<div class="space-y-1">
				<h2 class="text-3xl font-black tracking-tight text-slate-800 dark:text-white">
					{$t('settings')}
				</h2>
				<p class="text-sm font-semibold text-slate-400">{$t('fineTune')}</p>
			</div>
		</button>

		<button
			onclick={() => (isCollapsed = !isCollapsed)}
			class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-90 dark:bg-gray-900 dark:text-slate-300 dark:hover:bg-indigo-950/30"
			aria-label="Toggle Settings"
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
			<!-- Image Positioning Section -->
			<div class="space-y-8">
				<div class="flex items-center gap-4">
					<span
						class="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-[10px] font-black text-indigo-600 dark:bg-indigo-950/30"
						>01</span
					>
					<div class="flex flex-1 items-center justify-between">
						<h3 class="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
							{$t('imagePositioning')}
						</h3>
						<button
							onclick={() => (isBGLocked = !isBGLocked)}
							class="group flex items-center gap-2.5 rounded-2xl px-4 py-2 transition-all active:scale-95
							{isBGLocked
								? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200 dark:bg-rose-950/20 dark:ring-rose-800'
								: 'bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-gray-900'}"
						>
							<div class="relative flex h-4 w-4 items-center justify-center">
								{#if isBGLocked}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-3.5 w-3.5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="3"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
										<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
									</svg>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-3.5 w-3.5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
										<path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
									</svg>
								{/if}
							</div>
							<span class="text-[10px] font-black tracking-widest uppercase transition-colors">
								{$t(isBGLocked ? 'locked' : ('unlocked' as any))}
							</span>
						</button>
					</div>
					<div class="h-px w-20 bg-slate-100 lg:w-40 dark:bg-gray-800"></div>
				</div>

				<div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
					<div class="space-y-8">
						<div class="group space-y-4 rounded-[2rem] bg-slate-50/50 p-8 dark:bg-gray-900">
							<div class="flex items-center justify-between">
								<p
									class="text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
								>
									{$t('scale')}
								</p>
								<span class="text-xs font-black text-indigo-600">{(BGscale * 100).toFixed(0)}%</span
								>
							</div>
							<div class="flex items-center gap-4">
								<button
									onclick={() => (BGscale = Math.max(0.1, +(BGscale - 0.05).toFixed(2)))}
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white dark:bg-gray-800"
									aria-label="Decrease Scale"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M20 12H4"
										/></svg
									>
								</button>
								<input
									type="range"
									min="0.1"
									max="1"
									step="0.01"
									bind:value={BGscale}
									class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-600 dark:bg-gray-700"
								/>
								<button
									onclick={() => (BGscale = Math.min(5, +(BGscale + 0.05).toFixed(2)))}
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white dark:bg-gray-800"
									aria-label="Increase Scale"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 4v16m8-8H4"
										/></svg
									>
								</button>
							</div>
						</div>

						<div class="space-y-6 rounded-[2rem] bg-slate-50/50 p-8 dark:bg-gray-900">
							<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
								{$t('manualOffset')}
							</p>
							<div class="grid grid-cols-2 gap-6">
								<div class="group space-y-2">
									<p class="pl-1 text-[9px] font-black text-slate-400 uppercase">{$t('xAxis')}</p>
									<input
										type="number"
										bind:value={BGtranslateX}
										class="w-full rounded-2xl border-2 border-slate-100 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
									/>
								</div>
								<div class="group space-y-2">
									<p class="pl-1 text-[9px] font-black text-slate-400 uppercase">{$t('yAxis')}</p>
									<input
										type="number"
										bind:value={BGtranslateY}
										class="w-full rounded-2xl border-2 border-slate-100 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
									/>
								</div>
							</div>
						</div>
					</div>

					<div
						class="flex flex-col items-center justify-center gap-8 rounded-[2rem] border-2 border-dashed border-slate-100 p-8 dark:border-gray-800"
					>
						<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
							{$t('directionalControls')}
						</p>
						<div class="grid grid-cols-3 gap-3">
							<div></div>
							<button
								onclick={() => move(0, -10)}
								class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
								aria-label="Move Up"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.5"
										d="M5 15l7-7 7 7"
									/></svg
								>
							</button>
							<div></div>
							<button
								onclick={() => move(-10, 0)}
								class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
								aria-label="Move Left"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.5"
										d="M15 19l-7-7 7-7"
									/></svg
								>
							</button>
							<button
								onclick={resetTransform}
								class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500 active:scale-90 dark:bg-gray-900"
								aria-label="Reset Transform"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.5"
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/></svg
								>
							</button>
							<button
								onclick={() => move(10, 0)}
								class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
								aria-label="Move Right"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.5"
										d="M9 5l7 7-7 7"
									/></svg
								>
							</button>
							<div></div>
							<button
								onclick={() => move(0, 10)}
								class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
								aria-label="Move Down"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.5"
										d="M19 9l-7 7-7-7"
									/></svg
								>
							</button>
							<div></div>
						</div>
					</div>
				</div>
			</div>

			<!-- Typography & Styles -->
			<div class="space-y-8">
				<div class="flex items-center gap-4">
					<span
						class="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-[10px] font-black text-indigo-600 dark:bg-indigo-950/30"
						>02</span
					>
					<h3 class="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
						{$t('typographyAndStyle')}
					</h3>
					<div class="h-px flex-1 bg-slate-100 dark:bg-gray-800"></div>
				</div>

				<div class="grid gap-8">
					<!-- Row 1: Effect Section -->
					<div class="flex flex-col gap-8">
						<!-- Row 1a: Effect Text Color -->
						<div class="group space-y-4 rounded-[2rem] bg-slate-50/50 p-8 dark:bg-gray-900">
							<p class="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
								{$t('effectTextColor')}
							</p>
							<select
								bind:value={Textcolor}
								class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
							>
								{#each textcolorOptions as option}
									<option value={option.id}>{$t((option.id + 'Color') as TranslationKey)}</option>
								{/each}
							</select>
						</div>
						<div
							class="group space-y-4 rounded-[2rem] bg-slate-50/50 p-8 lg:col-span-2 dark:bg-gray-900"
						>
							<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
								{$t('effectPosition')}
							</p>
							<div class="flex flex-col gap-6">
								<div class="grid grid-cols-2 gap-4">
									<div class="space-y-1">
										<p class="pl-1 text-[8px] font-black text-slate-400 uppercase">
											{$t('xOffset')}
										</p>
										<input
											type="number"
											bind:value={EffectOffsetX}
											class="w-full rounded-xl border-2 border-slate-100 bg-white px-3 py-2 text-xs font-bold transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
										/>
									</div>
									<div class="space-y-1">
										<p class="pl-1 text-[8px] font-black text-slate-400 uppercase">
											{$t('yOffset')}
										</p>
										<input
											type="number"
											bind:value={EffectOffsetY}
											class="w-full rounded-xl border-2 border-slate-100 bg-white px-3 py-2 text-xs font-bold transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
										/>
									</div>
								</div>

								<div class="flex items-center justify-center">
									<div class="grid grid-cols-3 gap-3">
										<div></div>
										<button
											onclick={() => (EffectOffsetY -= 1)}
											class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
											aria-label="Move Up"
										>
											<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2.5"
													d="M5 15l7-7 7 7"
												/>
											</svg>
										</button>
										<div></div>
										<button
											onclick={() => (EffectOffsetX -= 1)}
											class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
											aria-label="Move Left"
										>
											<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2.5"
													d="M15 19l-7-7 7-7"
												/>
											</svg>
										</button>
										<button
											onclick={() => {
												EffectOffsetX = 0;
												EffectOffsetY = 0;
											}}
											class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500 active:scale-90 dark:bg-gray-800"
											aria-label="Reset Position"
										>
											<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2.5"
													d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
												/>
											</svg>
										</button>
										<button
											onclick={() => (EffectOffsetX += 1)}
											class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
											aria-label="Move Right"
										>
											<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2.5"
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</button>
										<div></div>
										<button
											onclick={() => (EffectOffsetY += 1)}
											class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
											aria-label="Move Down"
										>
											<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2.5"
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</button>
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Row 2: Flex-col Section -->
					<div class="flex flex-col gap-8">
						<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
							<!-- Attribute ScaleX -->
							<div class="group space-y-4 rounded-[2rem] bg-slate-50/50 p-8 dark:bg-gray-900">
								<div class="flex items-center justify-between">
									<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
										{$t('attributeScaleX')}
									</p>
									<span class="text-xs font-black text-indigo-600"
										>{(AttributeScaleX * 100).toFixed(0)}%</span
									>
								</div>
								<div class="flex items-center gap-4">
									<button
										onclick={() =>
											(AttributeScaleX = Math.max(0.1, +(AttributeScaleX - 0.05).toFixed(2)))}
										class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-100 dark:bg-gray-800"
										aria-label="Decrease Attribute Scale"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-3 w-3"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M20 12H4"
											/></svg
										></button
									>
									<input
										type="range"
										min="0.1"
										max="1"
										step="0.01"
										bind:value={AttributeScaleX}
										class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-600 dark:bg-gray-700"
									/>
									<button
										onclick={() =>
											(AttributeScaleX = Math.min(2, +(AttributeScaleX + 0.05).toFixed(2)))}
										class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-100 dark:bg-gray-800"
										aria-label="Increase Attribute Scale"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-3 w-3"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 4v16m8-8H4"
											/></svg
										></button
									>
								</div>
							</div>

							<!-- Card Name ScaleX -->
							<div class="group space-y-4 rounded-[2rem] bg-slate-50/50 p-8 dark:bg-gray-900">
								<div class="flex items-center justify-between">
									<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
										{$t('cardNameScaleX')}
									</p>
									<span class="text-xs font-black text-indigo-600"
										>{(CardNameScaleX * 100).toFixed(0)}%</span
									>
								</div>
								<div class="flex items-center gap-4">
									<button
										onclick={() =>
											(CardNameScaleX = Math.max(0.1, +(CardNameScaleX - 0.05).toFixed(2)))}
										class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-100 dark:bg-gray-800"
										aria-label="Decrease Card Name Scale"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-3 w-3"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M20 12H4"
											/></svg
										></button
									>
									<input
										type="range"
										min="0.1"
										max="1"
										step="0.01"
										bind:value={CardNameScaleX}
										class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-600 dark:bg-gray-700"
									/>
									<button
										onclick={() =>
											(CardNameScaleX = Math.min(2, +(CardNameScaleX + 0.05).toFixed(2)))}
										class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-100 dark:bg-gray-800"
										aria-label="Increase Card Name Scale"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-3 w-3"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 4v16m8-8H4"
											/></svg
										></button
									>
								</div>
							</div>

							<!-- Attribute Position -->
							<div class="group space-y-4 rounded-[2rem] bg-slate-50/50 p-8 dark:bg-gray-900">
								<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
									{$t('attributePosition')}
								</p>
								<div class="flex flex-col gap-6">
									<div class="grid grid-cols-2 gap-4">
										<div class="space-y-1">
											<p class="pl-1 text-[8px] font-black text-slate-400 uppercase">
												{$t('xOffset')}
											</p>
											<input
												type="number"
												bind:value={AttributeOffsetX}
												class="w-full rounded-xl border-2 border-slate-100 bg-white px-3 py-2 text-xs font-bold transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
											/>
										</div>
										<div class="space-y-1">
											<p class="pl-1 text-[8px] font-black text-slate-400 uppercase">
												{$t('yOffset')}
											</p>
											<input
												type="number"
												bind:value={AttributeOffsetY}
												class="w-full rounded-xl border-2 border-slate-100 bg-white px-3 py-2 text-xs font-bold transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
											/>
										</div>
									</div>

									<div class="flex items-center justify-center">
										<div class="grid grid-cols-3 gap-3">
											<div></div>
											<button
												onclick={() => (AttributeOffsetY -= 1)}
												class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
												aria-label="Move Up"
											>
												<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M5 15l7-7 7 7"
													/>
												</svg>
											</button>
											<div></div>
											<button
												onclick={() => (AttributeOffsetX -= 1)}
												class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
												aria-label="Move Left"
											>
												<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M15 19l-7-7 7-7"
													/>
												</svg>
											</button>
											<button
												onclick={() => {
													AttributeOffsetX = 0;
													AttributeOffsetY = 0;
												}}
												class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500 active:scale-90 dark:bg-gray-900"
												aria-label="Reset Position"
											>
												<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
													/>
												</svg>
											</button>
											<button
												onclick={() => (AttributeOffsetX += 1)}
												class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
												aria-label="Move Right"
											>
												<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</button>
											<div></div>
											<button
												onclick={() => (AttributeOffsetY += 1)}
												class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
												aria-label="Move Down"
											>
												<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M19 9l-7 7-7-7"
													/>
												</svg>
											</button>
											<div></div>
										</div>
									</div>
								</div>
							</div>

							<!-- Card Name Position -->
							<div class="group space-y-4 rounded-[2rem] bg-slate-50/50 p-8 dark:bg-gray-900">
								<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
									{$t('cardNamePosition')}
								</p>
								<div class="flex flex-col gap-6">
									<div class="grid grid-cols-2 gap-4">
										<div class="space-y-1">
											<p class="pl-1 text-[8px] font-black text-slate-400 uppercase">
												{$t('xOffset')}
											</p>
											<input
												type="number"
												bind:value={CardNameOffsetX}
												class="w-full rounded-xl border-2 border-slate-100 bg-white px-3 py-2 text-xs font-bold transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
											/>
										</div>
										<div class="space-y-1">
											<p class="pl-1 text-[8px] font-black text-slate-400 uppercase">
												{$t('yOffset')}
											</p>
											<input
												type="number"
												bind:value={CardNameOffsetY}
												class="w-full rounded-xl border-2 border-slate-100 bg-white px-3 py-2 text-xs font-bold transition-all outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-800"
											/>
										</div>
									</div>

									<div class="flex items-center justify-center">
										<div class="grid grid-cols-3 gap-3">
											<div></div>
											<button
												onclick={() => (CardNameOffsetY -= 1)}
												class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
												aria-label="Move Up"
											>
												<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M5 15l7-7 7 7"
													/>
												</svg>
											</button>
											<div></div>
											<button
												onclick={() => (CardNameOffsetX -= 1)}
												class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
												aria-label="Move Left"
											>
												<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M15 19l-7-7 7-7"
													/>
												</svg>
											</button>
											<button
												onclick={() => {
													CardNameOffsetX = 0;
													CardNameOffsetY = 0;
												}}
												class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500 active:scale-90 dark:bg-gray-800"
												aria-label="Reset Position"
											>
												<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
													/>
												</svg>
											</button>
											<button
												onclick={() => (CardNameOffsetX += 1)}
												class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
												aria-label="Move Right"
											>
												<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</button>
											<div></div>
											<button
												onclick={() => (CardNameOffsetY += 1)}
												class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 shadow-slate-200 ring-slate-100 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 active:scale-90 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-indigo-600"
												aria-label="Move Down"
											>
												<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M19 9l-7 7-7-7"
													/>
												</svg>
											</button>
											<div></div>
										</div>
									</div>
								</div>
							</div>

							<!-- Effect Position -->
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
