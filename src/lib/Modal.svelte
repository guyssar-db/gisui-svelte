<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let { 
		show = $bindable(false), 
		children, 
		title,
		class: className = ''
	}: { 
		show: boolean, 
		children: any,
		title?: string,
		class?: string
	} = $props();

	function close() {
		show = false;
	}
</script>

{#if show}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		transition:fade={{ duration: 300 }}
		onclick={close}
		class="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md"
	>
		<div
			transition:fly={{ y: -40, duration: 500, opacity: 0 }}
			onclick={(e) => e.stopPropagation()}
			class="w-full max-w-md rounded-[3rem] border border-slate-100 bg-white/95 p-10 shadow-ui-2xl backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-950/95 {className}"
		>
			<div class="mb-10 flex items-center justify-between">
				{#if title}
					<h2 class="text-2xl font-black tracking-tight text-slate-800 uppercase dark:text-white">
						{title}
					</h2>
				{:else}
					<div></div>
				{/if}
				<button
					onclick={close}
					class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500 active:scale-90 dark:bg-gray-900"
					aria-label="Close modal"
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
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="space-y-6">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
