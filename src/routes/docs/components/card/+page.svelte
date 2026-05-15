<script lang="ts">
	import { Card, Badge } from '$lib';

	const codeSnippet = `<Card>
  <h3 class="text-lg font-black uppercase mb-4">Standard Card</h3>
  <p class="text-sm text-slate-500">Regular card with shadow.</p>
</Card>

<Card glass={true}>
  <h3 class="text-lg font-black uppercase mb-4 text-white">Glass Card</h3>
  <p class="text-sm text-white opacity-70">Card with backdrop blur.</p>
</Card>`;
</script>

<div class="space-y-12">
	<div class="space-y-4">
		<div class="flex items-center gap-3">
			<h1 class="text-4xl font-black uppercase tracking-tighter dark:text-white sm:text-6xl">Card</h1>
			<Badge variant="primary">Component</Badge>
		</div>
		<p class="text-lg text-slate-500 font-medium leading-relaxed">
			A versatile container for grouping content, with support for standard and glassmorphic styles.
		</p>
	</div>

	<!-- Preview -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">Examples</h2>
		<div class="grid sm:grid-cols-2 gap-8">
			<Card>
				<h3 class="text-lg font-black uppercase mb-4 dark:text-white">Standard Card</h3>
				<p class="text-sm text-slate-500 leading-relaxed">
					This is a standard card component following the premium design language with rounded corners and soft shadows.
				</p>
			</Card>
			<Card glass={true} class="bg-indigo-600/20">
				<h3 class="text-lg font-black uppercase mb-4 dark:text-white">Glass Card</h3>
				<p class="text-sm text-slate-500 dark:text-indigo-200 leading-relaxed">
					This variant includes backdrop blur and subtle transparency for a modern glassmorphic look.
				</p>
			</Card>
		</div>
	</section>

	<!-- Usage -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">Usage</h2>
		<div class="relative group">
			<pre class="bg-slate-900 text-slate-300 p-6 rounded-[2rem] overflow-x-auto text-xs leading-relaxed border-4 border-slate-800 shadow-2xl"><code>{codeSnippet}</code></pre>
			<button 
				onclick={() => navigator.clipboard.writeText(codeSnippet)}
				class="absolute top-6 right-6 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all opacity-0 group-hover:opacity-100"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
				</svg>
			</button>
		</div>
	</section>

	<div class="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
		<a href="/docs/components/input" class="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">← Input</a>
		<a href="/docs/components/modal" class="text-sm font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors">Next: Modal →</a>
	</div>
</div>
