<script lang="ts">
	import { page } from '$app/state';
	import { Button, ThemeToggle, DotBackground, Badge } from '$lib';
	import { fade, slide } from 'svelte/transition';

	let { children } = $props();
	let isMobileMenuOpen = $state(false);

	const sections = [
		{
			title: 'Getting Started',
			links: [
				{ href: '/docs', label: 'Overview' },
				{ href: '/docs/installation', label: 'Installation' },
				{ href: '/docs/customization', label: 'Customization' },
				{ href: '/docs/publishing', label: 'Publishing' }
			]
		},
		{
			title: 'Components',
			links: [
				{ href: '/docs/components/button', label: 'Button' },
				{ href: '/docs/components/input', label: 'Input' },
				{ href: '/docs/components/card', label: 'Card' },
				{ href: '/docs/components/modal', label: 'Modal' },
				{ href: '/docs/components/toggle', label: 'Toggle' },
				{ href: '/docs/components/checkbox', label: 'Checkbox' },
				{ href: '/docs/components/dropdown', label: 'Dropdown' },
				{ href: '/docs/components/loading', label: 'Loading' },
				{ href: '/docs/components/progress', label: 'Progress Bar' },
				{ href: '/docs/components/badge', label: 'Badge' },
				{ href: '/docs/components/alert', label: 'Alert' },
				{ href: '/docs/components/avatar', label: 'Avatar' },
				{ href: '/docs/components/tabs', label: 'Tabs' },
				{ href: '/docs/components/skeleton', label: 'Skeleton' }
			]
		},
		{
			title: 'Utilities',
			links: [
				{ href: '/docs/utilities/dot-background', label: 'Dot Background' }
			]
		}
	];

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}
</script>

<div class="relative min-h-screen bg-white dark:bg-slate-950 transition-colors">
	<!-- Top Navigation -->
	<nav class="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<div class="flex items-center gap-4">
				<button 
					onclick={toggleMobileMenu}
					class="lg:hidden p-2 text-slate-500 hover:text-indigo-600 transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
				<a href="/" class="flex items-center gap-2 group">
					<div class="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black group-hover:scale-110 transition-transform">G</div>
					<span class="text-xl font-black uppercase tracking-tighter dark:text-white">GisUI Docs</span>
				</a>
				<Badge variant="primary" class="hidden sm:inline-flex">v0.1.0</Badge>
			</div>
			
			<div class="flex items-center gap-4">
				<a href="https://github.com" target="_blank" class="hidden sm:block text-slate-500 hover:text-indigo-600 transition-colors">
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z"/></svg>
				</a>
				<ThemeToggle />
			</div>
		</div>
	</nav>

	<div class="mx-auto max-w-7xl lg:flex">
		<!-- Sidebar Desktop -->
		<aside class="hidden lg:block lg:w-72 lg:shrink-0 border-r border-slate-100 dark:border-slate-800 p-8 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
			<nav class="space-y-8">
				{#each sections as section}
					<div class="space-y-3">
						<h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{section.title}</h4>
						<ul class="space-y-1 pl-1">
							{#each section.links as link}
								<li>
									<a 
										href={link.href}
										class="block py-1.5 text-sm font-bold transition-all
										{page.url.pathname === link.href 
											? 'text-indigo-600 translate-x-1' 
											: 'text-slate-500 hover:text-slate-900 hover:translate-x-1 dark:text-gray-400 dark:hover:text-white'}"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>
		</aside>

		<!-- Mobile Menu Drawer -->
		{#if isMobileMenuOpen}
			<div 
				transition:fade={{ duration: 200 }}
				class="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-sm lg:hidden"
				onclick={closeMobileMenu}
			></div>
			<aside 
				transition:slide={{ axis: 'x', duration: 300 }}
				class="fixed left-0 top-0 bottom-0 z-[101] w-80 bg-white dark:bg-slate-900 shadow-2xl lg:hidden overflow-y-auto p-8"
			>
				<div class="flex items-center justify-between mb-12">
					<div class="flex items-center gap-2">
						<div class="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">G</div>
						<span class="text-xl font-black uppercase tracking-tighter dark:text-white">GisUI</span>
					</div>
					<button onclick={closeMobileMenu} class="p-2 text-slate-400 hover:text-rose-500">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<nav class="space-y-8">
					{#each sections as section}
						<div class="space-y-3">
							<h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{section.title}</h4>
							<ul class="space-y-2">
								{#each section.links as link}
									<li>
										<a 
											href={link.href}
											onclick={closeMobileMenu}
											class="block py-1 text-base font-bold transition-all
											{page.url.pathname === link.href 
												? 'text-indigo-600' 
												: 'text-slate-500 dark:text-gray-400'}"
										>
											{link.label}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</nav>
			</aside>
		{/if}

		<!-- Main Content -->
		<main class="flex-1 min-w-0">
			<DotBackground class="p-4 sm:p-8 md:p-12 lg:p-16">
				<div class="max-w-3xl">
					{@render children()}
				</div>
			</DotBackground>
		</main>
	</div>
</div>
