<script lang="ts">
	import { Alert, Badge } from '$lib';

	const tailwindCode = `@import "tailwindcss";

/* GisUI Custom Variant */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-brand-primary: var(--color-indigo-600);
  --color-brand-secondary: var(--color-slate-800);
  
  --radius-ui: 1.5rem;
  --radius-ui-lg: 3rem;

  --shadow-ui-xl: 0 20px 40px -15px rgba(0, 0, 0, 0.1);
  --shadow-ui-2xl: 0 32px 80px -20px rgba(0, 0, 0, 0.2);
}`;
</script>

<div class="space-y-12">
	<div class="space-y-4">
		<h1 class="text-4xl font-black uppercase tracking-tighter dark:text-white sm:text-6xl">Installation</h1>
		<p class="text-lg text-slate-500 font-medium leading-relaxed">
			Setting up GisUI is straightforward. Since it's a CSS-native library, most of the configuration happens in your stylesheet.
		</p>
	</div>

	<!-- Step 1 -->
	<section class="space-y-6">
		<div class="flex items-center gap-4">
			<div class="h-10 w-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black">1</div>
			<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">Configure Tailwind 4</h2>
		</div>
		<p class="text-sm text-slate-500 leading-relaxed">
			Ensure your project is using Tailwind CSS 4. Add the following configuration to your global CSS file (e.g., <code class="bg-slate-100 dark:bg-gray-800 px-1 rounded">src/app.css</code>).
		</p>
		<div class="relative group">
			<pre class="bg-slate-900 text-slate-300 p-6 rounded-[2rem] overflow-x-auto text-xs leading-relaxed border-4 border-slate-800 shadow-2xl"><code>{tailwindCode}</code></pre>
			<button 
				onclick={() => navigator.clipboard.writeText(tailwindCode)}
				class="absolute top-6 right-6 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all opacity-0 group-hover:opacity-100"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
				</svg>
			</button>
		</div>
	</section>

	<!-- Step 2 -->
	<section class="space-y-6">
		<div class="flex items-center gap-4">
			<div class="h-10 w-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black">2</div>
			<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">Import Components</h2>
		</div>
		<p class="text-sm text-slate-500 leading-relaxed">
			Copy the <code class="bg-slate-100 dark:bg-gray-800 px-1 rounded">/src/lib</code> directory to your project. You can now import any component from your lib folder.
		</p>
		<Alert variant="primary" title="Pro Tip">
			We recommend putting them in <code class="font-bold">src/lib/gisui</code> for better organization.
		</Alert>
	</section>

	<div class="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
		<a href="/docs" class="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">← Overview</a>
		<a href="/docs/components/button" class="text-sm font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors">Next: Button →</a>
	</div>
</div>
