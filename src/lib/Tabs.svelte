<script lang="ts">
	let { 
		tabs = [], 
		activeTab = $bindable(),
		variant = 'primary',
		class: className = ''
	}: { 
		tabs: { id: string, label: string, icon?: string }[], 
		activeTab: string,
		variant?: 'primary' | 'ghost',
		class?: string
	} = $props();

	if (!activeTab && tabs.length > 0) {
		activeTab = tabs[0].id;
	}

	const variants = {
		primary: "bg-slate-100 p-1 dark:bg-gray-900",
		ghost: "border-b border-slate-200 dark:border-gray-800"
	};
</script>

<div class="flex items-center gap-2 rounded-[1.5rem] {variants[variant]} {className}">
	{#each tabs as tab}
		<button
			onclick={() => activeTab = tab.id}
			class="relative flex flex-1 items-center justify-center gap-2 px-6 py-3 text-[10px] font-black tracking-widest uppercase transition-all
			{activeTab === tab.id 
				? 'text-indigo-600 dark:text-white' 
				: 'text-slate-400 hover:text-slate-600 dark:text-gray-500 dark:hover:text-gray-300'}"
		>
			{#if activeTab === tab.id && variant === 'primary'}
				<div 
					class="absolute inset-0 rounded-xl bg-white shadow-sm dark:bg-gray-800"
				></div>
			{/if}
			{#if activeTab === tab.id && variant === 'ghost'}
				<div 
					class="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
				></div>
			{/if}
			<span class="relative z-10 flex items-center gap-2">
				{#if tab.icon}
					<span class="opacity-70">{@html tab.icon}</span>
				{/if}
				{tab.label}
			</span>
		</button>
	{/each}
</div>
