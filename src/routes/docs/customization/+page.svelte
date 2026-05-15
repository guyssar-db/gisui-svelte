<script lang="ts">
	import { Badge, Alert } from '$lib';

	const overrideCode = `@theme {
  /* Override Brand Colors */
  --color-ui-primary: #f97316;        /* Orange 500 */
  --color-ui-primary-hover: #ea580c;  /* Orange 600 */
  
  /* Override Spacing/Radius */
  --radius-ui: 0.5rem;                /* Make it less rounded */
}`;
</script>

<div class="space-y-12">
	<div class="space-y-4">
		<div class="flex items-center gap-3">
			<h1 class="text-4xl font-black uppercase tracking-tighter dark:text-white sm:text-6xl">Customization</h1>
			<Badge variant="success">Theming</Badge>
		</div>
		<p class="text-lg text-slate-500 font-medium leading-relaxed">
			GisUI is designed to be highly customizable via Tailwind 4 CSS variables. You can easily match the library to your brand's identity.
		</p>
	</div>

	<!-- Global Overrides -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">Global Overrides</h2>
		<p class="text-sm text-slate-500 leading-relaxed">
			To change the primary color or border radius globally, simply override the variables in your <code class="bg-slate-100 dark:bg-gray-800 px-1 rounded">@theme</code> block.
		</p>
		<div class="relative group">
			<pre class="bg-slate-900 text-slate-300 p-6 rounded-[2rem] overflow-x-auto text-xs leading-relaxed border-4 border-slate-800 shadow-2xl"><code>{overrideCode}</code></pre>
		</div>
	</section>

	<!-- Available Variables -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">Available Variables</h2>
		<div class="overflow-hidden rounded-[2rem] border border-slate-100 dark:border-gray-800">
			<table class="w-full text-left text-sm">
				<thead class="bg-slate-50 dark:bg-gray-900 text-[10px] font-black uppercase tracking-widest text-slate-400">
					<tr>
						<th class="px-6 py-4">Variable</th>
						<th class="px-6 py-4">Default Value</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-100 dark:divide-gray-800 dark:text-gray-300">
					<tr>
						<td class="px-6 py-4 font-mono text-xs">--color-ui-primary</td>
						<td class="px-6 py-4">Indigo 600</td>
					</tr>
					<tr>
						<td class="px-6 py-4 font-mono text-xs">--color-ui-danger</td>
						<td class="px-6 py-4">Rose 500</td>
					</tr>
					<tr>
						<td class="px-6 py-4 font-mono text-xs">--radius-ui</td>
						<td class="px-6 py-4">1.5rem</td>
					</tr>
					<tr>
						<td class="px-6 py-4 font-mono text-xs">--shadow-ui-xl</td>
						<td class="px-6 py-4">Soft Shadow</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<div class="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
		<a href="/docs/installation" class="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">← Installation</a>
		<a href="/docs/components/button" class="text-sm font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors">Next: Button →</a>
	</div>
</div>
