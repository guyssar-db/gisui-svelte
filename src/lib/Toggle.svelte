<script lang="ts">
	let { 
		checked = $bindable(false), 
		label,
		class: className = ''
	}: { 
		checked: boolean, 
		label?: string,
		class?: string
	} = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
	class="inline-flex items-center gap-3 cursor-pointer group {className}"
	onclick={() => checked = !checked}
>
	<div 
		class="relative w-12 h-6 rounded-full transition-all duration-300 {checked ? 'bg-ui-primary shadow-lg shadow-indigo-200 dark:shadow-none' : 'bg-slate-200 dark:bg-gray-800'}"
	>
		<div 
			class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform {checked ? 'translate-x-6' : ''}"
		></div>
	</div>
	{#if label}
		<span class="text-[10px] font-black tracking-[0.1em] text-slate-500 uppercase transition-colors group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-white">
			{label}
		</span>
	{/if}
</div>
