<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/translations';
	import type { Profile } from '$lib/types/database.types';
	import { monsterOptions, keywordMap } from '$lib/data/keyword';
	import { addToast } from '$lib/themeStore';

	interface CardExport {
		id: string;
		username: string;
		card_name: string;
		card_json: any;
		created_at: string;
	}

	let users = $state<Profile[]>([]);
	let exports = $state<CardExport[]>([]);
	let isLoading = $state(true);
	let isBackgroundLoading = $state(false);
	let activeTab = $state<'users' | 'exports' | 'cards'>('users');
	let error = $state('');
	let lastUpdated = $state<Date>(new Date());

	let newUsername = $state('');
	let newEmail = $state('');
	let isAdding = $state(false);
	let searchQuery = $state('');

	// Derived filtered lists
	let filteredUsers = $derived(
		users.filter(
			(u) =>
				u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
				u.email.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	let filteredExports = $derived(
		exports.filter(
			(e) =>
				e.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				e.card_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				e.card_json.ability?.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	function getWorldName(worldId: string) {
		return monsterOptions.find((opt) => opt.id === worldId)?.name || worldId;
	}

	function isOnline(lastSeen: string | null) {
		if (!lastSeen) return false;
		const lastSeenDate = new Date(lastSeen);
		const now = new Date();
		const diffInMinutes = (now.getTime() - lastSeenDate.getTime()) / (1000 * 60);
		return diffInMinutes < 5; // Online if active in the last 5 minutes
	}

	function formatText(text: string) {
		if (!text) return '';

		// Escape HTML to prevent XSS
		const escaped = text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');

		const tagged = escaped
			.replace(
				/\[\]/g,
				'<img src="/images/nctext.png" style="height: 11px; width: 11px; display: inline-block; vertical-align: middle;" alt="" />'
			)
			.replace(
				/\[b\]/g,
				'<img src="/images/bnctext.png" style="height: 11px; width: 11px; display: inline-block; vertical-align: middle;" alt="" />'
			)
			.replace(/\[#([0-9A-Fa-f]{6})\](.*?)\[\/\]/gs, (match, hex, content) => {
				return `<span style="display: inline-grid; vertical-align: middle; grid-template-columns: 1fr;">
                    <span style="grid-area: 1/1; -webkit-text-stroke: 4px #ffffff; text-stroke: 4px #ffffff;">${content}</span>
                    <span style="grid-area: 1/1; -webkit-text-stroke: 2px #${hex}; text-stroke: 2px #${hex};">${content}</span>
                    <span style="grid-area: 1/1; position: relative;">${content}</span>
                </span>`;
			})
			.replace(/\*_(.*?)_\*/g, '<span style="text-decoration: underline;">$1</span>')
			.replace(/\*~(.*?)~\*/g, '<span style="font-style: italic;">$1</span>')
			.replace(/\*\/(.*?)\/\*/g, '<span style="color: #ff0000;">$1</span>');

		const formatted = tagged.replace(/\[@([^\]]+)\]/g, (match, key) => {
			const iconData = (keywordMap as any)[key.toLowerCase()];
			if (iconData) {
				return `<img src="/images/keywords/${iconData.file}" style="height: ${iconData.h}px; width: ${iconData.w}px; display: inline-block; vertical-align: middle; margin-top: -${iconData.m}px; margin-right: ${iconData.mr}px;" alt="${key}" />`;
			}
			return match;
		});

		return formatted;
	}

	async function fetchData(background = false) {
		if (background) {
			isBackgroundLoading = true;
		} else {
			isLoading = true;
		}
		try {
			const [usersRes, exportsRes] = await Promise.all([
				fetch('/api/admin/users'),
				fetch('/api/admin/exports')
			]);

			if (usersRes.ok) {
				users = await usersRes.json();
			} else {
				const errData = await usersRes.json();
				console.error('Users fetch error:', errData);
			}

			if (exportsRes.ok) {
				exports = await exportsRes.json();
			} else {
				const errData = await exportsRes.json();
				console.error('Exports fetch error:', errData);
				error = errData.error || 'Failed to fetch exports';
			}
			lastUpdated = new Date();
		} catch (e) {
			console.error('Fetch data exception:', e);
			if (!background) {
				error = 'Something went wrong while fetching data';
			}
		} finally {
			isLoading = false;
			isBackgroundLoading = false;
		}
	}

	async function handleAddUser() {
		isAdding = true;
		try {
			const res = await fetch('/api/admin/users', {
				method: 'POST',
				body: JSON.stringify({ username: newUsername, email: newEmail })
			});
			if (res.ok) {
				const newUser = await res.json();
				users = [newUser, ...users];
				newUsername = '';
				newEmail = '';
				addToast(
					`User added. Tokens: Email=${newUser.token1}, Phone=${newUser.token2}`,
					'success',
					10000
				);
			} else {
				const errData = await res.json();
				addToast(`Failed to add user: ${errData.error || 'Unknown error'}`, 'error');
			}
		} catch (e) {
			addToast('Something went wrong', 'error');
		} finally {
			isAdding = false;
		}
	}

	async function toggleBan(userId: string, currentBanStatus: boolean | null) {
		try {
			const res = await fetch('/api/admin/users', {
				method: 'PATCH',
				body: JSON.stringify({ userId, is_banned: !currentBanStatus })
			});
			if (res.ok) {
				users = users.map((u) => (u.id === userId ? { ...u, is_banned: !currentBanStatus } : u));
				addToast(currentBanStatus ? 'User access restored' : 'User suspended', 'success');
			} else {
				addToast('Failed to update user', 'error');
			}
		} catch (e) {
			addToast('Something went wrong', 'error');
		}
	}

	onMount(() => {
		fetchData();
		const interval = setInterval(() => fetchData(true), 30000); // Poll every 30 seconds for efficiency
		return () => clearInterval(interval);
	});
</script>

<div
	class="flex min-h-[85vh] w-full flex-col gap-6 rounded-3xl border border-slate-200/60 bg-white/80 p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 md:gap-10 md:rounded-[3rem] md:p-12 dark:border-gray-800/60 dark:bg-gray-950/80"
>
	<div class="flex flex-col items-start justify-between gap-6 md:flex-row lg:items-center">
		<div class="flex w-full items-center justify-between gap-5 md:w-auto md:justify-start">
			<div class="space-y-1">
				<h2
					class="text-2xl font-black tracking-tight text-slate-800 uppercase md:text-3xl dark:text-white"
				>
					{$t('adminConsole').split(' ')[0]}
					<span class="text-indigo-600">{$t('adminConsole').split(' ')[1]}</span>
				</h2>
				<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
					<p class="text-[11px] font-semibold text-slate-400 md:text-sm">
						{$t('systemManagement')}
					</p>
					<span class="hidden h-1 w-1 rounded-full bg-slate-300 md:block"></span>
					<p class="text-[9px] font-bold tracking-wider text-slate-400 uppercase md:text-[10px]">
						{$t('update')}: {lastUpdated.toLocaleTimeString()}
						{#if isBackgroundLoading}
							<span class="ml-1 inline-block animate-pulse text-indigo-500">...</span>
						{/if}
					</p>
				</div>
			</div>
			<a
				href="/"
				class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500 active:scale-90 md:hidden dark:bg-gray-900"
				aria-label="Go to Home"
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
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			</a>
		</div>
		<div class="flex w-full flex-col items-center gap-3 sm:flex-row md:w-auto">
			<div class="group relative block w-full sm:w-auto">
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
					placeholder={$t('search')}
					class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 py-2 pr-4 pl-10 text-[11px] font-black tracking-wider uppercase transition-all outline-none focus:border-indigo-500 focus:bg-white sm:min-w-[200px] dark:border-gray-800 dark:bg-gray-900 dark:text-slate-200 dark:focus:border-indigo-500"
				/>
			</div>
			<div
				class="flex w-full items-center gap-1 rounded-2xl bg-slate-50 p-1.5 sm:w-auto dark:bg-gray-900"
			>
				<button
					onclick={() => (activeTab = 'users')}
					class="flex-1 rounded-xl px-4 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all sm:flex-none sm:px-5 {activeTab ===
					'users'
						? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none'
						: 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}"
				>
					{$t('users' as any)}
				</button>
				<button
					onclick={() => (activeTab = 'exports')}
					class="flex-1 rounded-xl px-4 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all sm:flex-none sm:px-5 {activeTab ===
					'exports'
						? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none'
						: 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}"
				>
					{$t('exports' as any)}
				</button>
				<button
					onclick={() => (activeTab = 'cards')}
					class="flex-1 rounded-xl px-4 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all sm:flex-none sm:px-5 {activeTab ===
					'cards'
						? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none'
						: 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}"
				>
					{$t('cardEditor' as any)}
				</button>
			</div>
			<a
				href="/"
				class="hidden h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500 active:scale-90 md:flex dark:bg-gray-900"
				aria-label="Go to Home"
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
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			</a>
		</div>
	</div>

	{#if activeTab === 'users'}
		<div class="animate-in fade-in slide-in-from-bottom-4 flex flex-col gap-6 md:gap-8">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-end lg:grid-cols-3 xl:grid-cols-4">
				<div class="group space-y-2">
					<p
						class="pl-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
					>
						{$t('newUsername')}
					</p>
					<input
						type="text"
						bind:value={newUsername}
						class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-3 text-sm font-bold transition-all outline-none focus:border-indigo-500 focus:bg-white md:py-3.5 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
					/>
				</div>
				<div class="group space-y-2">
					<p
						class="pl-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
					>
						{$t('newEmail')}
					</p>
					<input
						type="email"
						bind:value={newEmail}
						class="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-3 text-sm font-bold transition-all outline-none focus:border-indigo-500 focus:bg-white md:py-3.5 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
					/>
				</div>
				<button
					onclick={handleAddUser}
					disabled={isAdding || !newUsername || !newEmail}
					class="rounded-2xl bg-indigo-600 py-3.5 text-[11px] font-black tracking-[0.2em] text-white uppercase shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 md:py-4 dark:shadow-none"
				>
					{$t('addAccount')}
				</button>
			</div>

			<div
				class="custom-scrollbar overflow-auto rounded-[1.5rem] border border-slate-100 bg-slate-50/30 md:rounded-[2rem] dark:border-gray-800 dark:bg-gray-950/30"
			>
				<table class="w-full text-left">
					<thead>
						<tr class="border-b border-slate-100 dark:border-gray-800">
							<th class="p-4 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase md:p-6"
								>{$t('userIdentity')}</th
							>
							<th class="p-4 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase md:p-6"
								>{$t('secureTokens')}</th
							>
							<th class="p-4 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase md:p-6"
								>{$t('status')}</th
							>
							<th class="p-4 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase md:p-6"
								>{$t('management')}</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-100 dark:divide-gray-800">
						{#each filteredUsers as user}
							<tr class="group transition-colors hover:bg-slate-50/50 dark:hover:bg-gray-900/50">
								<td class="p-4 md:p-6">
									<div class="flex items-center gap-2">
										<a
											href="/profile/{user.username}"
											class="text-sm font-black tracking-tight text-slate-800 uppercase transition-colors hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400"
										>
											{user.username}
										</a>
										<span
											class="h-2 w-2 rounded-full {isOnline(user.last_seen)
												? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
												: 'bg-slate-300'}"
											title={isOnline(user.last_seen) ? $t('online') : $t('offline')}
										></span>
									</div>
									<p class="text-[10px] font-bold text-slate-400">{user.email}</p>
								</td>
								<td class="p-4 md:p-6">
									<div class="flex flex-col gap-2 md:flex-row md:gap-4">
										<div class="space-y-0.5">
											<p class="text-[8px] font-black text-slate-400 uppercase">{$t('email')}</p>
											<p class="font-mono text-[11px] font-black text-indigo-600">
												{user.token1 || 'N/A'}
											</p>
										</div>
										<div class="space-y-0.5">
											<p class="text-[8px] font-black text-slate-400 uppercase">{$t('phone')}</p>
											<p class="font-mono text-[11px] font-black text-violet-600">
												{user.token2 || 'N/A'}
											</p>
										</div>
									</div>
								</td>
								<td class="p-4 md:p-6">
									<div class="flex flex-wrap items-center gap-2">
										<span
											class="rounded-lg px-2.5 py-1 text-[9px] font-black tracking-widest uppercase {user.is_verified
												? 'bg-emerald-100 text-emerald-600'
												: 'bg-amber-100 text-amber-600'}"
										>
											{user.is_verified ? $t('verified') : $t('pending')}
										</span>
										{#if user.is_banned}
											<span
												class="rounded-lg bg-rose-100 px-2.5 py-1 text-[9px] font-black tracking-widest text-rose-600 uppercase"
												>{$t('banned')}</span
											>
										{/if}
									</div>
								</td>
								<td class="p-4 md:p-6">
									<button
										onclick={() => toggleBan(user.id, user.is_banned)}
										class="text-[10px] font-black tracking-widest whitespace-nowrap uppercase transition-all {user.is_banned
											? 'text-emerald-500 hover:text-emerald-600'
											: 'text-rose-500 hover:text-rose-600'}"
									>
										{user.is_banned ? $t('restoreAccess') : $t('suspendUser')}
									</button>
								</td>
							</tr>
						{/each}
						{#if filteredUsers.length === 0 && !isLoading}
							<tr>
								<td colspan="4" class="p-12 text-center">
									<p class="text-sm font-black tracking-[0.2em] text-slate-400 uppercase">
										{$t('noUserRecordsFound')}
									</p>
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	{:else if activeTab === 'cards'}
		<div class="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center justify-center py-20 text-center">
			<div class="mb-6 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
				<svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
				</svg>
			</div>
			<h3 class="mb-2 text-2xl font-black text-slate-800 uppercase dark:text-white">Card Data Editor</h3>
			<p class="mb-8 max-w-md font-bold text-slate-400">
				Manage and edit the core card database JSON files directly.
			</p>
			<a
				href="/dashboard/cards"
				class="rounded-2xl bg-indigo-600 px-10 py-4 text-xs font-black text-white uppercase shadow-lg transition-all hover:scale-105 active:scale-95"
			>
				Open Card Editor
			</a>
		</div>
	{:else}
		<div class="animate-in fade-in slide-in-from-bottom-4 flex flex-col gap-8">
			{#if error}
				<div class="rounded-2xl bg-rose-50 p-6 text-sm font-bold text-rose-500 dark:bg-rose-950/20">
					{error}
				</div>
			{/if}

			<div
				class="custom-scrollbar overflow-auto rounded-[1.5rem] border border-slate-100 bg-slate-50/30 md:rounded-[2rem] dark:border-gray-800 dark:bg-gray-950/30"
			>
				<table class="w-full text-left">
					<thead>
						<tr class="border-b border-slate-100 dark:border-gray-800">
							<th class="p-4 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase md:p-6"
								>{$t('creator')}</th
							>
							<th class="p-4 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase md:p-6"
								>{$t('cardMetadata')}</th
							>
							<th class="p-4 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase md:p-6"
								>{$t('effectDetails')}</th
							>
							<th class="p-4 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase md:p-6"
								>{$t('exportedAt')}</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-100 dark:divide-gray-800">
						{#each filteredExports as item}
							<tr class="group transition-colors hover:bg-slate-50/50 dark:hover:bg-gray-900/50">
								<td class="p-4 md:p-6">
									<div class="flex items-center gap-3">
										<div
											class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-400 transition-all group-hover:bg-indigo-600 group-hover:text-white"
										>
											{item.username ? item.username[0].toUpperCase() : '?'}
										</div>
										<a
											href="/profile/{item.username}"
											class="text-sm font-black tracking-tight text-slate-800 uppercase transition-colors hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400"
										>
											{item.username || 'Unknown'}
										</a>
									</div>
								</td>
								<td class="min-w-[180px] p-4 md:p-6">
									<p
										class="text-sm leading-none font-black text-slate-800 uppercase dark:text-white"
									>
										{item.card_name}
									</p>
									<div class="mt-2 flex flex-wrap gap-1.5">
										<span
											class="rounded-md bg-slate-100 px-1.5 py-0.5 text-[8px] font-black text-slate-500 uppercase dark:bg-gray-800"
											>{item.card_json.type || 'N/A'}</span
										>
										<span
											class="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[8px] font-black text-indigo-600 uppercase dark:bg-indigo-950/30"
											>{getWorldName(item.card_json.world)}</span
										>
									</div>
								</td>
								<td class="min-w-[300px] p-4 md:p-6">
									<div
										class="text-[10px] leading-[2.3] font-semibold whitespace-pre-wrap text-slate-700 dark:text-slate-300"
									>
										{@html formatText(item.card_json.ability) ||
											`<span class="italic text-slate-400">${$t('noSkillsDefined')}</span>`}
									</div>
								</td>
								<td class="min-w-[150px] p-4 md:p-6">
									<p class="font-mono text-[10px] font-black text-slate-400 uppercase">
										{new Date(item.created_at).toLocaleDateString()}<br />
										{new Date(item.created_at).toLocaleTimeString()}
									</p>
								</td>
							</tr>
						{/each}
						{#if filteredExports.length === 0 && !isLoading}
							<tr>
								<td colspan="4" class="p-12 text-center">
									<p class="text-sm font-black tracking-[0.2em] text-slate-400 uppercase">
										{$t('noExportRecordsFound')}
									</p>
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
