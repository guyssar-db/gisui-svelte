<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { 
		children, 
		type = 'button', 
		onclick, 
		variant = 'primary',
		size = 'md',
		class: className = '',
		disabled = false,
		isLoading = false,
		...rest
	}: { 
		children: any, 
		type?: HTMLButtonAttributes['type'], 
		onclick?: (e: MouseEvent) => void,
		variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline',
		size?: 'sm' | 'md' | 'lg' | 'xl',
		class?: string,
		disabled?: boolean,
		isLoading?: boolean,
		[key: string]: any
	} = $props();

	const baseStyles = "inline-flex items-center justify-center rounded-[1.5rem] font-black tracking-[0.1em] uppercase transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
	
	const variants = {
		primary: "bg-ui-primary text-white shadow-xl shadow-indigo-100 hover:scale-[1.02] hover:bg-ui-primary-hover dark:shadow-none",
		secondary: "bg-ui-secondary text-ui-secondary-text hover:bg-ui-secondary-hover dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
		danger: "bg-ui-danger text-white shadow-xl shadow-rose-100 hover:scale-[1.02] hover:bg-ui-danger-hover dark:shadow-none",
		outline: "border-2 border-slate-200 bg-transparent text-slate-800 hover:border-ui-primary hover:text-ui-primary dark:border-gray-700 dark:text-white",
		ghost: "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
	};

	const sizes = {
		sm: "px-4 py-2 text-[10px]",
		md: "px-6 py-3 text-[11px]",
		lg: "px-8 py-4 text-xs",
		xl: "px-10 py-5 text-xs tracking-[0.2em]"
	};
</script>

<button
	{type}
	{onclick}
	{disabled}
	class="{baseStyles} {variants[variant]} {sizes[size]} {className}"
	{...rest}
>
	{#if isLoading}
		<svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	{/if}
	{@render children()}
</button>
