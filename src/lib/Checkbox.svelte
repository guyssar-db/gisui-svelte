<script lang="ts">
	let { 
		checked = $bindable(false), 
		label,
		disabled = false,
		class: className = ''
	}: { 
		checked: boolean, 
		label?: string,
		disabled?: boolean,
		class?: string
	} = $props();
</script>

<label class="inline-flex items-center gap-3 cursor-pointer group {disabled ? 'opacity-50 cursor-not-allowed' : ''} {className}">
	<div class="relative flex items-center justify-center">
		<input 
			type="checkbox" 
			bind:checked 
			{disabled}
			class="peer sr-only"
		/>
		<div class="h-6 w-6 rounded-xl border-2 border-slate-200 bg-white transition-all group-hover:border-indigo-400 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 dark:border-gray-800 dark:bg-gray-950 dark:peer-checked:bg-indigo-600"></div>
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			class="absolute h-3.5 w-3.5 text-white scale-0 transition-transform peer-checked:scale-100" 
			viewBox="0 0 20 20" 
			fill="currentColor"
		>
			<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
		</svg>
	</div>
	{#if label}
		<span class="text-[11px] font-black tracking-widest text-slate-500 uppercase transition-colors group-hover:text-slate-800 dark:text-gray-400 dark:group-hover:text-white">
			{label}
		</span>
	{/if}
</label>
