<script lang="ts">
	import { DotBackground, Badge } from '$lib';

	const codeSnippet = `<DotBackground 
  dotColor="rgb(79, 70, 229)" 
  dotOpacity="0.1" 
  spacing="32px"
>
  <div class="p-20 text-center">
    <h1 class="text-4xl font-black uppercase tracking-tighter">
      Premium Canvas
    </h1>
  </div>
</DotBackground>`;
</script>

<div class="space-y-12">
	<div class="space-y-4">
		<div class="flex items-center gap-3">
			<h1 class="text-4xl font-black uppercase tracking-tighter dark:text-white sm:text-6xl">Dot Background</h1>
			<Badge variant="primary">Utility</Badge>
		</div>
		<p class="text-lg text-slate-500 font-medium leading-relaxed">
			A sophisticated background utility that adds depth and texture to any section. Features customizable dot density, color, and precise opacity control.
		</p>
	</div>

	<!-- Example -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">Example</h2>
		<div class="rounded-[2rem] border border-slate-100 bg-white dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
			<DotBackground 
				dotColor="rgb(79, 70, 229)" 
				dotOpacity="0.15" 
				spacing="40px"
				class="p-20 flex items-center justify-center min-h-[400px]"
			>
				<div class="text-center space-y-4 relative z-10">
					<h3 class="text-3xl font-black uppercase tracking-tighter dark:text-white">Architectural Precision</h3>
					<p class="text-slate-500 font-medium max-w-md">
						Every pixel is accounted for. Built with mathematical accuracy for the most demanding visual standards.
					</p>
				</div>
			</DotBackground>
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
		<a href="/docs/components/skeleton" class="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">← Skeleton</a>
		<div class="text-sm font-black uppercase tracking-widest text-slate-300">End of Utilities</div>
	</div>
</div>
