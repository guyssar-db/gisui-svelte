<script lang="ts">
	let { 
		src, 
		alt = 'Avatar', 
		size = 'md',
		fallback = '?',
		class: className = ''
	}: { 
		src?: string, 
		alt?: string, 
		size?: 'sm' | 'md' | 'lg' | 'xl',
		fallback?: string,
		class?: string
	} = $props();

	const sizes = {
		sm: "h-8 w-8 text-xs",
		md: "h-12 w-12 text-sm",
		lg: "h-16 w-16 text-xl",
		xl: "h-24 w-24 text-3xl"
	};
</script>

<div class="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[1.2rem] bg-indigo-50 font-black text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 {sizes[size]} {className}">
	{#if src}
		<img {src} {alt} class="h-full w-full object-cover" />
	{:else}
		<span class="uppercase">{fallback}</span>
	{/if}
</div>
