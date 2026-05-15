<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let { 
		value = $bindable(), 
		label, 
		type = 'text', 
		placeholder = '...', 
		error,
		class: className = '',
		...rest 
	}: {
		value?: any,
		label?: string,
		type?: HTMLInputAttributes['type'],
		placeholder?: string,
		error?: string,
		class?: string,
		[key: string]: any
	} = $props();
</script>

<div class="group space-y-1.5 {className}">
	{#if label}
		<p class="pl-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600">
			{label}
		</p>
	{/if}
	<div class="relative">
		<input
			bind:value
			{type}
			{placeholder}
			class="w-full rounded-[1.5rem] border-2 border-slate-50 bg-slate-50/50 py-5 px-6 text-sm font-semibold transition-all focus:border-ui-primary focus:bg-white focus:outline-none dark:border-gray-900 dark:bg-gray-900/50 dark:focus:border-ui-primary {error ? 'border-ui-danger focus:border-ui-danger' : ''}"
			{...rest}
		/>
		{#if error}
			<p class="mt-1.5 pl-1 text-[9px] font-bold tracking-wider text-rose-500 uppercase">
				{error}
			</p>
		{/if}
	</div>
</div>
