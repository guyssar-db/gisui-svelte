<script lang="ts">
	let { 
		children, 
		variant = 'primary', 
		size = 'md',
		class: className = ''
	}: { 
		children: any, 
		variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost',
		size?: 'sm' | 'md',
		class?: string
	} = $props();

	const variants = {
		primary: "bg-indigo-50 text-ui-primary dark:bg-indigo-500/10 dark:text-indigo-400",
		secondary: "bg-ui-secondary text-slate-600 dark:bg-gray-800 dark:text-gray-400",
		success: "bg-emerald-50 text-ui-success dark:bg-emerald-500/10 dark:text-emerald-400",
		danger: "bg-rose-50 text-ui-danger dark:bg-rose-500/10 dark:text-rose-400",
		warning: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
		ghost: "border border-slate-200 text-slate-500 dark:border-gray-800"
	};

	const sizes = {
		sm: "px-2 py-0.5 text-[9px]",
		md: "px-2.5 py-1 text-[10px]"
	};
</script>

<span class="inline-flex items-center font-black tracking-widest uppercase rounded-lg {variants[variant]} {sizes[size]} {className}">
	{@render children()}
</span>
