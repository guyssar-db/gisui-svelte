<script lang="ts">
	let { 
		children, 
		class: className = '',
		glass = false
	}: { 
		children: any, 
		class?: string,
		glass?: boolean
	} = $props();

	const baseStyles = "rounded-[2rem] border border-slate-100 bg-white p-6 shadow-ui-xl dark:border-gray-800 dark:bg-gray-950";
	const glassStyles = "bg-white/90 backdrop-blur-xl dark:bg-gray-950/90";
</script>

<div class="{baseStyles} {glass ? glassStyles : ''} {className}">
	{@render children()}
</div>
