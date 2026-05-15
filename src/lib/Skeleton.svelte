<script lang="ts">
	let { 
		width = 'w-full', 
		height = 'h-4',
		variant = 'rect',
		class: className = ''
	}: { 
		width?: string, 
		height?: string,
		variant?: 'rect' | 'circle' | 'text',
		class?: string
	} = $props();

	const variants = {
		rect: "rounded-xl",
		circle: "rounded-full",
		text: "rounded-md"
	};
</script>

<div 
	class="animate-pulse bg-slate-100 dark:bg-gray-800 {width} {height} {variants[variant]} {className}"
></div>
