<script lang="ts">
	let { 
		progress = 0, 
		max = 100,
		label = '',
		showValue = false,
		size = 'md',
		variant = 'primary',
		class: className = ''
	}: { 
		progress: number, 
		max?: number,
		label?: string,
		showValue?: boolean,
		size?: 'sm' | 'md' | 'lg',
		variant?: 'primary' | 'success' | 'danger',
		class?: string
	} = $props();

	const percentage = $derived(Math.min(Math.max(0, (progress / max) * 100), 100));

	const sizes = {
		sm: "h-1.5",
		md: "h-3",
		lg: "h-5"
	};

	const variants = {
		primary: "bg-ui-primary shadow-sm shadow-indigo-200 dark:shadow-none",
		success: "bg-ui-success shadow-sm shadow-emerald-200 dark:shadow-none",
		danger: "bg-ui-danger shadow-sm shadow-rose-200 dark:shadow-none"
	};
</script>

<div class="w-full space-y-2 {className}">
	{#if label || showValue}
		<div class="flex justify-between items-end px-1">
			{#if label}
				<span class="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
					{label}
				</span>
			{/if}
			{#if showValue}
				<span class="text-[10px] font-black tracking-widest text-indigo-600 dark:text-indigo-400">
					{Math.round(percentage)}%
				</span>
			{/if}
		</div>
	{/if}
	
	<div class="w-full bg-slate-100 rounded-full overflow-hidden dark:bg-gray-800 {sizes[size]}">
		<div 
			class="h-full transition-all duration-500 ease-out rounded-full {variants[variant]}"
			style="width: {percentage}%"
		></div>
	</div>
</div>
