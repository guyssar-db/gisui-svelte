<script lang="ts">
	import { Badge } from '$lib';
</script>

<div class="space-y-8">
	<div class="space-y-4">
		<h1 class="text-4xl font-black uppercase tracking-tighter dark:text-white sm:text-6xl">Overview</h1>
		<p class="text-lg text-slate-500 font-medium leading-relaxed">
			Welcome to GisUI, a premium UI library designed for modern web applications. Built with the cutting-edge power of <strong>Svelte 5</strong> and <strong>Tailwind CSS 4</strong>.
		</p>
	</div>

	<div class="grid sm:grid-cols-2 gap-6 pt-8">
		<div class="p-6 rounded-[2rem] border border-slate-100 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
			<h3 class="text-lg font-black uppercase mb-2 dark:text-white">Design Philosophy</h3>
			<p class="text-sm text-slate-500 leading-relaxed">
				We focus on bold typography, generous spacing, and smooth interactive feedback to create a truly premium experience.
			</p>
		</div>
		<div class="p-6 rounded-[2rem] border border-slate-100 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
			<h3 class="text-lg font-black uppercase mb-2 dark:text-white">Modern Stack</h3>
			<p class="text-sm text-slate-500 leading-relaxed">
				Leveraging Svelte 5 Runes for ultra-fast reactivity and Tailwind CSS 4 for a CSS-first styling experience.
			</p>
		</div>
	</div>

	<div class="pt-8">
		<a 
			href="/docs/installation" 
			class="inline-flex items-center gap-2 rounded-[1.5rem] bg-indigo-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-indigo-700 transition-all active:scale-95"
		>
			Get Started
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 5l7 7-7 7M5 12h14" />
			</svg>
		</a>
	</div>
</div>
