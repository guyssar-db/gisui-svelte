<script lang="ts">
	import { Checkbox, Badge } from '$lib';

	let checked = $state(true);
	const codeSnippet = `<Checkbox \n  label="Accept terms" \n  bind:checked={checked} \n/>\n\n<Checkbox \n  label="Disabled" \n  disabled={true} \n/>`;
</script>

<div class="space-y-12">
	<div class="space-y-4">
		<div class="flex items-center gap-3">
			<h1 class="text-4xl font-black uppercase tracking-tighter dark:text-white sm:text-6xl">Checkbox</h1>
			<Badge variant="primary">Component</Badge>
		</div>
		<p class="text-lg text-slate-500 font-medium leading-relaxed">
			A premium checkbox component with a custom design that matches the library's aesthetic.
		</p>
	</div>

	<!-- Preview -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">Example</h2>
		<div class="p-8 rounded-[2rem] border border-slate-100 bg-white dark:border-gray-800 dark:bg-gray-900 flex flex-col gap-6 items-center justify-center">
			<Checkbox label="Interactive Checkbox" bind:checked={checked} />
			<div class="text-[10px] font-black uppercase tracking-widest text-slate-400">Status: {checked ? 'Checked' : 'Unchecked'}</div>
		</div>
	</section>

	<!-- Usage -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">Usage</h2>
		<div class="relative group">
			<pre class="bg-slate-900 text-slate-300 p-6 rounded-[2rem] overflow-x-auto text-xs leading-relaxed border-4 border-slate-800 shadow-2xl"><code>{codeSnippet}</code></pre>
		</div>
	</section>

	<div class="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
		<a href="/docs/components/toggle" class="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">← Toggle</a>
		<a href="/docs/components/dropdown" class="text-sm font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors">Next: Dropdown →</a>
	</div>
</div>
