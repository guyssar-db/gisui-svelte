<script lang="ts">
	import { page } from '$app/stores';
	import { t, type TranslationKey } from '$lib/translations';
	import { fade, fly } from 'svelte/transition';
	import {
		theme as themeStore,
		language as languageStore,
		user,
		showKeywordModal,
		showExportModal,
		authModalMode,
		showAuthModal
	} from '$lib/themeStore';

	let {
		isMobileMenuOpen = $bindable(),
		isMobileUploadDropdownOpen = $bindable(),
		isMobileExportDropdownOpen = $bindable(),
		handleLogout,
		handleFileChange
	}: {
		isMobileMenuOpen: boolean;
		isMobileUploadDropdownOpen: boolean;
		isMobileExportDropdownOpen: boolean;
		handleLogout: () => void;
		handleFileChange: (e: Event) => void;
	} = $props();

	let isMobileProfileDropdownOpen = $state(false);

	function toggleTheme() {
		themeStore.update((t) => (t === 'light' ? 'dark' : 'light'));
	}

	const theme = $derived($themeStore);
	const language = $derived($languageStore);
</script>

{#if isMobileMenuOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		transition:fade={{ duration: 200 }}
		onclick={() => (isMobileMenuOpen = false)}
		class="fixed inset-0 z-60 bg-slate-950/20 backdrop-blur-sm md:hidden"
	></div>
	<div
		transition:fly={{ x: -320, duration: 400, opacity: 1 }}
		class="fixed top-0 left-0 z-70 h-dvh w-80 border-r border-slate-200/60 bg-white/80 p-8 pb-[calc(2rem+env(safe-area-inset-bottom))] shadow-2xl backdrop-blur-2xl md:hidden dark:border-gray-800/60 dark:bg-gray-950/90"
	>
		<div class="mb-10 flex items-center gap-3">
			<span class="text-xl font-black tracking-tight dark:text-white"
				>BFT<span class="text-indigo-600">MAKER</span></span
			>
		</div>

		<div class="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto pr-2">
			{#if $page.url.pathname !== '/'}
				<a
					href="/"
					onclick={() => (isMobileMenuOpen = false)}
					class="flex items-center gap-4 rounded-2xl bg-indigo-50 p-4 text-indigo-600 transition-all active:scale-95 dark:bg-indigo-950/30 dark:text-indigo-400"
				>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-gray-800"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
					</div>
					<div class="flex flex-col items-start">
						<span class="text-xs font-black tracking-wider uppercase">{$t('editor')}</span>
						<span class="text-[9px] font-black text-indigo-400 uppercase opacity-70"
							>{$t('goToEditor')}</span
						>
					</div>
				</a>
			{/if}

			<a
				href="/deck"
				onclick={() => (isMobileMenuOpen = false)}
				class="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-indigo-50 dark:bg-gray-900 dark:hover:bg-indigo-950/30"
			>
				<div
					class="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-gray-800"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-indigo-600 dark:text-indigo-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
						/>
					</svg>
				</div>
				<div class="flex flex-col items-start">
					<span class="text-xs font-black tracking-wider text-slate-800 uppercase dark:text-white"
						>{$t('myDecks')}</span
					>
					<span class="text-[9px] font-black text-slate-400 uppercase">Manage your decks</span>
				</div>
			</a>

			<!-- Profile Section (Dropdown in List) -->
			<div class="flex flex-col gap-2">
				<button
					onclick={() => (isMobileProfileDropdownOpen = !isMobileProfileDropdownOpen)}
					class="flex w-full items-center gap-4 rounded-2xl bg-slate-50 p-5 transition-all hover:bg-indigo-50 dark:bg-gray-900 dark:hover:bg-indigo-950/30"
				>
					{#if $user}
						<div
							class="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 text-lg font-black text-white shadow-md shadow-indigo-100 dark:shadow-none"
						>
							{$user?.username?.[0] || ''}
						</div>
						<div class="flex flex-1 flex-col items-start">
							<span
								class="text-sm font-black tracking-tight text-slate-800 uppercase dark:text-white"
								>{$user?.username || ''}</span
							>
							<span class="text-[9px] font-black tracking-widest text-slate-400 uppercase"
								>{$user?.role || ''}</span
							>
						</div>
					{:else}
						<div
							class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-gray-800"
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
									stroke-width="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</div>
						<div class="flex flex-1 flex-col items-start">
							<span
								class="text-sm font-black tracking-tight text-slate-800 uppercase dark:text-white"
								>{$t('account')}</span
							>
							<span class="text-[9px] font-black tracking-widest text-slate-400 uppercase"
								>{$t('loginOrRegister')}</span
							>
						</div>
					{/if}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 text-slate-400 transition-transform duration-300 {isMobileProfileDropdownOpen
							? 'rotate-180'
							: ''}"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="3"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>

				{#if isMobileProfileDropdownOpen}
					<div
						class="animate-in fade-in slide-in-from-top-2 flex flex-col gap-3 rounded-[2rem] border border-slate-100 bg-white/50 p-5 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50"
					>
						{#if $user}
							<div class="flex flex-col gap-2">
								<a
									href="/profile"
									onclick={() => {
										isMobileMenuOpen = false;
									}}
									class="flex w-full items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-[10px] font-black text-slate-600 uppercase transition-all hover:bg-indigo-600 hover:text-white dark:bg-gray-800 dark:text-slate-300"
								>
									{$t('profile')}
								</a>
								{#if $user?.role === 'admin'}
									<a
										href="/dashboard"
										onclick={() => {
											isMobileMenuOpen = false;
										}}
										class="flex w-full items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-[10px] font-black text-slate-600 uppercase transition-all hover:bg-indigo-600 hover:text-white dark:bg-gray-800 dark:text-slate-300"
									>
										Admin Dashboard
									</a>
								{/if}
								<button
									onclick={() => {
										authModalMode.set('changePassword');
										showAuthModal.set(true);
										isMobileMenuOpen = false;
									}}
									class="flex w-full items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-[10px] font-black text-slate-600 uppercase transition-all hover:bg-indigo-600 hover:text-white dark:bg-gray-800 dark:text-slate-300"
								>
									Change Password
								</button>
							</div>
							<div class="h-px bg-slate-100 dark:bg-gray-800"></div>
						{/if}

						<div class="flex flex-col gap-4 px-1">
							<div class="flex items-center justify-between">
								<span class="text-[10px] font-black tracking-widest text-slate-400 uppercase"
									>{$t('theme' as TranslationKey)}</span
								>
								<button
									onclick={toggleTheme}
									class="group relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none
                                    {theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-200'}"
									aria-label="Toggle Theme"
								>
									<span
										class="z-10 inline-block h-4 w-4 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out
                                        {theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}"
									>
									</span>
								</button>
							</div>

							<div class="flex items-center justify-between">
								<span class="text-[10px] font-black tracking-widest text-slate-400 uppercase"
									>{$t('language' as TranslationKey)}</span
								>
								<div class="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-gray-800">
									<button
										onclick={() => languageStore.set('th')}
										class="rounded-lg px-2.5 py-1 text-[9px] font-black transition-all {language ===
										'th'
											? 'bg-indigo-600 text-white shadow-md'
											: 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}"
									>
										TH
									</button>
									<button
										onclick={() => languageStore.set('en')}
										class="rounded-lg px-2.5 py-1 text-[9px] font-black transition-all {language ===
										'en'
											? 'bg-indigo-600 text-white shadow-md'
											: 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}"
									>
										EN
									</button>
								</div>
							</div>
						</div>

						<div class="h-px bg-slate-100 dark:bg-gray-800"></div>

						{#if $user}
							<button
								onclick={handleLogout}
								class="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-50 py-3.5 text-[10px] font-black text-rose-500 uppercase transition-all hover:bg-rose-500 hover:text-white dark:bg-rose-950/20"
							>
								Logout
							</button>
						{:else}
							<div class="flex flex-col gap-2">
								<a
									href="/verify"
									onclick={() => {
										isMobileMenuOpen = false;
									}}
									class="flex w-full items-center justify-center rounded-2xl bg-amber-50 py-3.5 text-[10px] font-black text-amber-600 uppercase transition-all hover:bg-amber-500 hover:text-white dark:bg-amber-950/20"
								>
									Verify Account
								</a>
								<button
									onclick={() => {
										authModalMode.set('login');
										showAuthModal.set(true);
										isMobileMenuOpen = false;
									}}
									class="flex items-center justify-center rounded-2xl bg-slate-50 py-3.5 text-[10px] font-black text-slate-400 uppercase transition-all hover:bg-indigo-600 hover:text-white dark:bg-gray-800 dark:text-slate-200"
								>
									{$t('login')}
								</button>
								<button
									onclick={() => {
										authModalMode.set('register');
										showAuthModal.set(true);
										isMobileMenuOpen = false;
									}}
									class="flex items-center justify-center rounded-2xl bg-indigo-600 py-3 text-[10px] font-black text-slate-400 uppercase transition-all hover:bg-indigo-400 hover:text-white dark:bg-indigo-600"
								>
									{$t('register' as TranslationKey)}
								</button>
							</div>
						{/if}
					</div>
				{/if}
			</div>

			{#if $user && $page.url.pathname === '/'}
				<div class="flex flex-col gap-2">
					<button
						onclick={() => (isMobileUploadDropdownOpen = !isMobileUploadDropdownOpen)}
						class="flex w-full items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-indigo-50 dark:bg-gray-900 dark:hover:bg-indigo-950/30"
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-gray-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-indigo-600 dark:text-indigo-400"
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
						</div>
						<div class="flex flex-1 flex-col items-start">
							<span
								class="text-xs font-black tracking-wider text-slate-800 uppercase dark:text-white"
								>{$t('upload')}</span
							>
							<span class="text-[9px] font-black text-slate-400 uppercase"
								>{$t('uploadImageOrJson')}</span
							>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 text-slate-400 transition-transform duration-300 {isMobileUploadDropdownOpen
								? 'rotate-180'
								: ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					{#if isMobileUploadDropdownOpen}
						<div class="flex flex-col gap-1.5 pl-4 transition-all">
							<label
								class="flex cursor-pointer items-center gap-4 rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-gray-900"
							>
								<div
									class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30"
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
											stroke-width="2"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<span
									class="text-[10px] font-black tracking-widest text-slate-600 uppercase dark:text-slate-300"
									>{$t('uploadImage')}</span
								>
								<input type="file" accept="image/*" onchange={handleFileChange} class="hidden" />
							</label>
							<button
								class="flex items-center gap-4 rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-gray-900"
							>
								<div
									class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30"
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
											stroke-width="2"
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
								</div>
								<span
									class="text-[10px] font-black tracking-widest text-slate-600 uppercase dark:text-slate-300"
									>{$t('importJson')}</span
								>
							</button>
						</div>
					{/if}
				</div>

				<button
					onclick={() => {
						showKeywordModal.set(true);
						isMobileMenuOpen = false;
					}}
					class="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:scale-105 hover:bg-amber-50 dark:bg-gray-900 dark:hover:bg-amber-950/30"
				>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-gray-800"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-amber-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
							/>
						</svg>
					</div>
					<div class="flex flex-col items-start">
						<span class="text-xs font-black tracking-wider text-slate-800 uppercase dark:text-white"
							>{$t('keywords')}</span
						>
						<span class="text-[9px] font-black text-slate-400 uppercase"
							>{$t('openIconLibrary')}</span
						>
					</div>
				</button>

				<div class="flex flex-col gap-2">
					<button
						onclick={() => (isMobileExportDropdownOpen = !isMobileExportDropdownOpen)}
						class="flex w-full items-center gap-4 rounded-2xl bg-indigo-600 p-4 shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
					>
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-white"
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
						</div>
						<div class="flex flex-1 flex-col items-start text-white">
							<span class="text-xs font-black tracking-wider uppercase">{$t('export')}</span>
							<span class="text-[9px] font-black text-indigo-100 uppercase opacity-80"
								>{$t('uploadImageOrJson')}</span
							>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 text-indigo-100 transition-transform duration-300 {isMobileExportDropdownOpen
								? 'rotate-180'
								: ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					{#if isMobileExportDropdownOpen}
						<div class="flex flex-col gap-1.5 pl-4 transition-all">
							<button
								onclick={() => {
									showExportModal.set(true);
									isMobileMenuOpen = false;
								}}
								class="flex items-center gap-4 rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-gray-900"
							>
								<div
									class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30"
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
											stroke-width="2.5"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<span
									class="text-[10px] font-black tracking-widest text-slate-600 uppercase dark:text-slate-300"
									>{$t('exportImage')}</span
								>
							</button>
							<button
								class="flex items-center gap-4 rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-gray-900"
							>
								<div
									class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30"
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
											stroke-width="2.5"
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
								</div>
								<span
									class="text-[10px] font-black tracking-widest text-slate-600 uppercase dark:text-slate-300"
									>{$t('exportJson')}</span
								>
							</button>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}
