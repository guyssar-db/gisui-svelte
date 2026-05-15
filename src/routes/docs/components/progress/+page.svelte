<script lang="ts">
	import { ProgressBar, Button, Badge } from '$lib';

	let progress = $state(45);

	function randomize() {
		progress = Math.floor(Math.random() * 100);
	}

	const codeSnippet = `<ProgressBar 
  progress={45} 
  label="System Capacity" 
  showValue={true} 
  variant="primary" 
  size="md" 
/>

<ProgressBar progress={80} variant="success" size="sm" />
<ProgressBar progress={20} variant="danger" size="lg" />`;
</script>

<div class="space-y-12">
	<div class="space-y-4">
		<div class="flex items-center gap-3">
			<h1 class="text-4xl font-black uppercase tracking-tighter dark:text-white sm:text-6xl">Progress</h1>
			<Badge variant="primary">Component</Badge>
		</div>
		<p class="text-lg text-slate-500 font-medium leading-relaxed">
			A fluid indicator for task completion. Features smooth spring-like animations, multiple variants, and built-in labeling.
		</p>
	</div>

	<!-- Example -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">Example</h2>
		<div class="p-8 rounded-[2rem] border border-slate-100 bg-white dark:border-gray-800 dark:bg-gray-900 flex flex-col gap-10 items-center justify-center">
			<div class="w-full max-w-md space-y-8">
				<ProgressBar 
					{progress} 
					label="Deployment Progress" 
					showValue={true} 
					variant="primary" 
				/>
				<ProgressBar 
					progress={92} 
					label="Server Health" 
					showValue={true} 
					variant="success" 
					size="sm"
				/>
				<ProgressBar 
					progress={15} 
					label="Security Threats" 
					showValue={true} 
					variant="danger" 
					size="lg"
				/>
			</div>
			
			<div class="pt-8 border-t border-slate-50 dark:border-slate-800 w-full flex justify-center">
				<Button variant="outline" onclick={randomize}>
					Randomize Progress
				</Button>
			</div>
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
		<a href="/docs/components/loading" class="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">← Loading</a>
		<a href="/docs/components/badge" class="text-sm font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors">Next: Badge →</a>
	</div>
</div>
