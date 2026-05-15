<script lang="ts">
	import { onMount } from 'svelte';
	import { updates, CURRENT_VERSION } from '$lib/data/updates';
	import { language } from '$lib/themeStore';
	import { t } from '$lib/translations';
	import { fade, scale } from 'svelte/transition';

	let showModal = $state(false);
	let latestUpdate = updates[0];

	onMount(() => {
		const lastSeenVersion = localStorage.getItem('lastSeenVersion');
		if (lastSeenVersion !== CURRENT_VERSION) {
			showModal = true;
		}
	});

	function closeAndSave() {
		localStorage.setItem('lastSeenVersion', CURRENT_VERSION);
		showModal = false;
	}
</script>

{#if showModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		transition:fade={{ duration: 300 }}
		onclick={closeAndSave}
		class="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md"
	>
		<div
			transition:scale={{ start: 0.95, duration: 400, opacity: 0 }}
			onclick={(e) => e.stopPropagation()}
			class="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950"
		>
			<!-- Header Decoration -->
			<div
				class="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
			></div>

			<div class="p-8 md:p-10">
				<div class="mb-8 flex items-center justify-between">
					<div class="flex flex-col">
						<span class="text-[10px] font-black tracking-[0.2em] text-indigo-500 uppercase">
							{$t('newUpdate')} v{latestUpdate.version}
						</span>
						<h3 class="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
							{latestUpdate.title[$language as 'en' | 'th'] || latestUpdate.title.en}
						</h3>
					</div>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
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
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
					</div>
				</div>

				<div class="mb-10 space-y-4">
					<p class="text-xs font-black tracking-widest text-slate-400 uppercase">
						{$t('whatIsNew')}
					</p>
					<ul class="space-y-3">
						{#each latestUpdate.changes[$language as 'en' | 'th'] || latestUpdate.changes.en as change}
							<li class="flex items-start gap-3">
								<div
									class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-3 w-3"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
								<span class="text-sm font-medium text-slate-600 dark:text-slate-300">
									{change}
								</span>
							</li>
						{/each}
					</ul>
				</div>

				<button
					onclick={closeAndSave}
					class="group relative w-full overflow-hidden rounded-2xl bg-slate-900 py-5 transition-all hover:bg-indigo-600 active:scale-95 dark:bg-white dark:hover:bg-indigo-500"
				>
					<div class="relative flex items-center justify-center gap-2">
						<span
							class="text-xs font-black tracking-[0.2em] text-white uppercase dark:text-slate-900 group-hover:dark:text-white"
						>
							{$t('gotIt')}
						</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 text-white transition-transform group-hover:translate-x-1 dark:text-slate-900 group-hover:dark:text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</div>
				</button>
			</div>
		</div>
	</div>
{/if}
