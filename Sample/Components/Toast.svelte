<script lang="ts">
	import { toasts, removeToast } from '$lib/themeStore';
	import { t } from '$lib/translations';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
</script>

<div class="fixed top-24 right-4 z-110 flex flex-col gap-3 sm:right-8">
	{#each $toasts as toast (toast.id)}
		<div
			animate:flip={{ duration: 300 }}
			in:fly={{ y: -20, duration: 400 }}
			out:fly={{ x: 100, duration: 300 }}
			class="group relative flex min-w-[300px] items-center gap-4 overflow-hidden rounded-[1.5rem] border border-slate-200/50 bg-white/90 p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all hover:scale-[1.02] dark:border-gray-800/50 dark:bg-gray-950/90"
		>
			<div
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl
                {toast.type === 'success'
					? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10'
					: toast.type === 'error'
						? 'bg-rose-50 text-rose-500 dark:bg-rose-500/10'
						: 'bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10'} shadow-sm"
			>
				{#if toast.type === 'success'}
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
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{:else if toast.type === 'error'}
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
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{:else}
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
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{/if}
			</div>

			<div class="flex-1 space-y-0.5">
				<p class="text-[11px] font-black tracking-wider text-slate-800 uppercase dark:text-white">
					{toast.type === 'success'
						? $t('success' as any) || 'Success'
						: toast.type === 'error'
							? $t('error' as any) || 'Error'
							: $t('notification' as any) || 'Notification'}
				</p>
				<p class="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
					{$t(toast.message as any) || toast.message}
				</p>
			</div>

			<button
				onclick={() => removeToast(toast.id)}
				class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500 dark:bg-gray-900"
				aria-label="Remove toast"
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
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<!-- Progress bar -->
			{#if toast.duration && toast.duration > 0}
				<div
					class="absolute bottom-0 left-0 h-1 bg-indigo-500/30 dark:bg-indigo-500/20"
					style="width: 100%"
				>
					<div
						class="h-full {toast.type === 'success'
							? 'bg-emerald-500'
							: toast.type === 'error'
								? 'bg-rose-500'
								: 'bg-indigo-500'}"
						style="animation: toast-progress {toast.duration}ms linear forwards"
					></div>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	@keyframes toast-progress {
		from {
			width: 100%;
		}
		to {
			width: 0%;
		}
	}
</style>
