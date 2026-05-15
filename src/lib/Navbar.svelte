<script lang="ts">
	import { ThemeToggle } from './index';
	import { slide, fade } from 'svelte/transition';

	let { 
		brand = 'GisUI',
		links = [],
		class: className = ''
	}: { 
		brand?: string,
		links: { label: string, href: string }[],
		class?: string
	} = $props();

	let isMobileMenuOpen = $state(false);
</script>

<nav class="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 {className}">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<div class="flex items-center gap-8">
			<a href="/" class="flex items-center gap-2 group">
				<div class="h-8 w-8 bg-ui-primary rounded-lg flex items-center justify-center text-white font-black group-hover:scale-110 transition-transform">
					{brand[0]}
				</div>
				<span class="text-xl font-black uppercase tracking-tighter dark:text-white">{brand}</span>
			</a>

			<!-- Desktop Links -->
			<div class="hidden md:flex items-center gap-6">
				{#each links as link}
					<a href={link.href} class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-ui-primary transition-colors">
						{link.label}
					</a>
				{/each}
			</div>
		</div>

		<div class="flex items-center gap-4">
			<div class="hidden sm:block">
				<ThemeToggle />
			</div>
			
			<!-- Mobile Toggle -->
			<button 
				onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
				class="md:hidden p-2 text-slate-500 hover:text-ui-primary transition-colors"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMobileMenuOpen}
		<div 
			transition:slide={{ duration: 300 }}
			class="md:hidden border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 px-4 py-6 space-y-4"
		>
			{#each links as link}
				<a 
					href={link.href} 
					onclick={() => isMobileMenuOpen = false}
					class="block text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-400"
				>
					{link.label}
				</a>
			{/each}
			<div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
				<span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Switch Theme</span>
				<ThemeToggle />
			</div>
		</div>
	{/if}
</nav>
