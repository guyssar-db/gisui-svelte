<script lang="ts">
	let { 
		children, 
		dotColor = 'currentColor',
		dotOpacity = '0.05',
		dotSize = '1px',
		spacing = '24px',
		class: className = ''
	}: { 
		children?: any, 
		dotColor?: string,
		dotOpacity?: string,
		dotSize?: string,
		spacing?: string,
		class?: string
	} = $props();
</script>

<div 
	class="relative w-full min-h-full {className}"
	style="
		background-image: radial-gradient({dotColor} {dotSize}, transparent 0);
		background-size: {spacing} {spacing};
		--dot-opacity: {dotOpacity};
	"
>
	<!-- Overlay to control opacity precisely -->
	<div class="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50 pointer-events-none" style="opacity: calc(1 - var(--dot-opacity))"></div>
	
	<div class="relative z-10">
		{@render children?.()}
	</div>
</div>
