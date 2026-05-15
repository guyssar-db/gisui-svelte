<script lang="ts">
	import { page } from '$app/stores';
	import { t, type TranslationKey } from '$lib/translations';
	import { fade, fly } from 'svelte/transition';
	import {
		theme as themeStore,
		language as languageStore,
		user,
		userImageStore,
		showKeywordModal,
		showExportModal,
		authModalMode,
		showAuthModal
	} from '$lib/themeStore';

	let {
		isMobileMenuOpen = $bindable(),
		isUploadDropdownOpen = $bindable(),
		isExportDropdownOpen = $bindable(),
		isProfileDropdownOpen = $bindable(),
		handleLogout,
		toggleTheme,
		theme,
		language,
		handleFileChange
	}: {
		isMobileMenuOpen: boolean;
		isUploadDropdownOpen: boolean;
		isExportDropdownOpen: boolean;
		isProfileDropdownOpen: boolean;
		handleLogout: () => void;
		toggleTheme: () => void;
		theme: string;
		language: string;
		handleFileChange: (e: Event) => void;
	} = $props();
</script>

<nav
	class="fixed top-0 z-50 flex w-full items-center justify-between border-b bg-white/70 px-6 py-3.5 backdrop-blur-xl transition-all duration-300 sm:px-12 dark:border-gray-800/50 dark:bg-gray-950/70 dark:text-white"
>
	<div class="flex flex-1 items-center md:hidden">
		<button
			onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
			class="group flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-90 dark:bg-gray-900 dark:text-slate-300 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400"
			aria-label="Toggle Menu"
		>
			<div class="relative flex h-5 w-5 flex-col items-center justify-center gap-1">
				<span
					class="h-0.5 w-5 rounded-full bg-current transition-all {isMobileMenuOpen
						? 'translate-y-1.5 rotate-45'
						: ''}"
				></span>
				<span
					class="h-0.5 w-5 rounded-full bg-current transition-all {isMobileMenuOpen
						? 'opacity-0'
						: ''}"
				></span>
				<span
					class="h-0.5 w-5 rounded-full bg-current transition-all {isMobileMenuOpen
						? '-translate-y-1.5 -rotate-45'
						: ''}"
				></span>
			</div>
		</button>
	</div>

	<div
		class="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 md:static md:flex-none md:translate-x-0 md:translate-y-0"
	>
		<a href="/" class="text-xl font-black tracking-tight text-slate-800 dark:text-white"
			>BFT<span class="text-indigo-600">MAKER</span></a
		>
	</div>

	<div class="flex flex-1 items-center justify-end gap-4">
		{#if $page.url.pathname !== '/'}
			<!-- Home Link -->
			<a
				href="/"
				class="hidden h-9 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 font-black text-white shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] hover:bg-indigo-700 active:scale-95 md:flex dark:shadow-none"
				aria-label="Home"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4.5 w-4.5"
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
				<span class="text-[10px] font-black tracking-widest uppercase">{$t('backhome')}</span>
			</a>
		{/if}

		<!-- Mobile Docs Link -->
		<a
			href="/docs"
			class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-90 md:hidden dark:bg-gray-800 dark:text-slate-300 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400"
			aria-label="Documentation"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4.5 w-4.5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2.5"
					d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
				/>
			</svg>
		</a>

		<div class="mr-4 hidden items-center gap-3 md:flex">
			{#if $user && $page.url.pathname === '/'}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="relative"
					onmouseenter={() => (isUploadDropdownOpen = true)}
					onmouseleave={() => (isUploadDropdownOpen = false)}
				>
					<button
						onclick={() => (isUploadDropdownOpen = !isUploadDropdownOpen)}
						class="flex h-9 items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 transition-all hover:bg-indigo-50 hover:text-indigo-300 active:scale-95 dark:bg-gray-800 dark:hover:bg-indigo-800/30"
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
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
							/>
						</svg>
						<span class="text-[10px] font-black tracking-widest uppercase">{$t('upload')}</span>
					</button>

					{#if isUploadDropdownOpen}
						<div
							transition:fly={{ y: 10, duration: 200 }}
							class="absolute top-full left-0 z-50 w-56 pt-3"
						>
							<div
								class="overflow-hidden rounded-3xl border border-slate-100 bg-white/90 p-2 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/90"
							>
								<label
									class="flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 transition-all hover:bg-indigo-600 hover:text-white dark:text-slate-300"
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
									{$t('uploadImage')}
									<input type="file" accept="image/*" onchange={handleFileChange} class="hidden" />
								</label>
								<button
									class="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left text-xs font-bold text-slate-600 transition-all hover:bg-indigo-600 hover:text-white dark:text-slate-300"
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
									{$t('importJson')}
								</button>
							</div>
						</div>
					{/if}
				</div>

				<a
					href="/deck"
					class="flex h-9 items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 dark:bg-gray-800 dark:hover:bg-indigo-950/30"
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
							d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
						/>
					</svg>
					<span class="text-[10px] font-black tracking-widest uppercase">{$t('myDecks')}</span>
				</a>

				<button
					onclick={() => showKeywordModal.set(true)}
					class="flex h-9 items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 transition-all hover:scale-105 hover:bg-amber-50 hover:text-amber-600 active:scale-95 dark:bg-gray-800 dark:hover:bg-amber-950/30"
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
							d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
						/>
					</svg>
					<span class="text-[10px] font-black tracking-widest uppercase">{$t('keywords')}</span>
				</button>
				<a
					href="/docs"
					class="flex h-9 items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 dark:bg-gray-800 dark:hover:bg-indigo-950/30"
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
							d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
						/>
					</svg>
					<span class="text-[10px] font-black tracking-widest uppercase">{$t('docs')}</span>
				</a>
			{/if}

			{#if $user && $page.url.pathname === '/'}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="relative"
					onmouseenter={() => (isExportDropdownOpen = true)}
					onmouseleave={() => (isExportDropdownOpen = false)}
				>
					<button
						onclick={() => (isExportDropdownOpen = !isExportDropdownOpen)}
						class="flex h-9 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 font-black text-white shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] hover:bg-indigo-700 active:scale-95 dark:shadow-none"
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
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
							/>
						</svg>
						<span class="text-[10px] tracking-widest uppercase">{$t('export')}</span>
					</button>

					{#if isExportDropdownOpen}
						<div
							transition:fly={{ y: 10, duration: 200 }}
							class="absolute top-full right-0 z-50 w-56 pt-3"
						>
							<div
								class="overflow-hidden rounded-3xl border border-slate-100 bg-white/90 p-2 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/90"
							>
								<button
									onclick={() => {
										showExportModal.set(true);
										isExportDropdownOpen = false;
									}}
									class="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left text-xs font-bold text-slate-600 transition-all hover:bg-indigo-600 hover:text-white dark:text-slate-300"
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
									{$t('exportImage')}
								</button>
								<button
									class="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left text-xs font-bold text-slate-600 transition-all hover:bg-indigo-600 hover:text-white dark:text-slate-300"
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
									{$t('exportJson')}
								</button>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative"
			onmouseenter={() => (isProfileDropdownOpen = true)}
			onmouseleave={() => (isProfileDropdownOpen = false)}
		>
			<button
				onclick={() => (isProfileDropdownOpen = !isProfileDropdownOpen)}
				class="group hidden h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-all hover:scale-[1.05] hover:bg-indigo-50 active:scale-95 md:flex dark:bg-gray-900 dark:text-slate-300 dark:hover:bg-indigo-950/30"
			>
				{#if $user}
					<div
						class="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-[10px] font-black text-white uppercase shadow-md shadow-indigo-200 dark:shadow-none"
					>
						{$user?.username?.[0] || ''}
					</div>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 transition-colors group-hover:text-indigo-600"
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
				{/if}
			</button>

			{#if isProfileDropdownOpen}
				<div
					transition:fly={{ y: 10, duration: 200 }}
					class="absolute top-full right-0 z-50 w-64 pt-3"
				>
					<div
						class="hidden flex-col gap-5 overflow-hidden rounded-[2rem] border border-slate-100 bg-white/90 p-5 shadow-2xl backdrop-blur-xl md:flex dark:border-gray-800 dark:bg-gray-950/90"
					>
						{#if $user}
							<div class="flex items-center gap-4">
								<div
									class="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 text-sm font-black text-white uppercase"
								>
									{$user?.username?.[0] || ''}
								</div>
								<div class="space-y-0.5">
									<p
										class="text-xs font-black tracking-tight text-slate-800 uppercase dark:text-white"
									>
										{$user?.username || ''}
									</p>
									<p class="text-[9px] font-black tracking-[0.1em] text-slate-400 uppercase">
										{$user?.role || ''}
									</p>
								</div>
							</div>
							<div class="h-px bg-slate-100 dark:bg-gray-800"></div>
							<div class="flex flex-col gap-1.5">
								<a
									href="/profile"
									onclick={() => {
										isProfileDropdownOpen = false;
									}}
									class="flex w-full items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-[10px] font-black text-slate-600 uppercase transition-all hover:bg-indigo-600 hover:text-white dark:bg-gray-900/50 dark:text-slate-300"
								>
									{$t('profile')}
								</a>
								{#if $user?.role === 'admin'}
									<a
										href="/dashboard"
										onclick={() => {
											isProfileDropdownOpen = false;
										}}
										class="flex w-full items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-[10px] font-black text-slate-600 uppercase transition-all hover:bg-indigo-600 hover:text-white dark:bg-gray-900/50 dark:text-slate-300"
									>
										{$t('adminDashboard')}
									</a>
								{/if}
								<button
									onclick={() => {
										authModalMode.set('changePassword');
										showAuthModal.set(true);
										isProfileDropdownOpen = false;
									}}
									class="flex w-full items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-[10px] font-black text-slate-600 uppercase transition-all hover:bg-indigo-600 hover:text-white dark:bg-gray-900/50 dark:text-slate-300"
								>
									{$t('changePassword')}
								</button>
							</div>
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
								class="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-50 py-3 text-[10px] font-black text-rose-500 uppercase transition-all hover:bg-rose-500 hover:text-white dark:bg-rose-950/20"
							>
								{$t('logout')}
							</button>
						{:else}
							<div class="flex flex-col gap-1.5">
								<a
									href="/verify"
									onclick={() => {
										isProfileDropdownOpen = false;
									}}
									class="flex w-full items-center justify-center rounded-2xl bg-amber-50 py-3 text-[10px] font-black text-amber-600 uppercase transition-all hover:bg-amber-500 hover:text-white dark:bg-amber-950/20"
								>
									{$t('verifyAccount')}
								</a>
								<button
									onclick={() => {
										authModalMode.set('login');
										showAuthModal.set(true);
										isProfileDropdownOpen = false;
									}}
									class="flex items-center justify-center rounded-2xl bg-slate-50 py-3 text-[10px] font-black text-slate-400 uppercase transition-all hover:bg-indigo-600 hover:text-white dark:bg-gray-900/50"
								>
									{$t('login')}
								</button>
								<button
									onclick={() => {
										authModalMode.set('register');
										showAuthModal.set(true);
										isProfileDropdownOpen = false;
									}}
									class="flex items-center justify-center rounded-2xl bg-indigo-600 py-3 text-[10px] font-black text-slate-400 uppercase transition-all hover:bg-indigo-400 hover:text-white dark:bg-indigo-600"
								>
									{$t('register' as TranslationKey)}
								</button>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
</nav>
