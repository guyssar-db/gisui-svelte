<script lang="ts">
	import { Button, Badge, toasts } from '$lib';

	const codeSnippet = `<script>
  import { toasts } from 'gisui';
<\/script>

<Button onclick={() => toasts.success('Profile updated!')}>
  Show Success
</Button>

<Button onclick={() => toasts.error('Failed to save changes')}>
  Show Error
</Button>`;
</script>

<div class="space-y-12">
	<div class="space-y-4">
		<div class="flex items-center gap-3">
			<h1 class="text-4xl font-black uppercase tracking-tighter dark:text-white sm:text-6xl">Toast</h1>
			<Badge variant="primary">Component</Badge>
		</div>
		<p class="text-lg text-slate-500 font-medium leading-relaxed">
			A non-intrusive notification system. Managed via a simple API and featuring premium glassmorphic design and smooth flip animations.
		</p>
	</div>

	<!-- Example -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">Live Demo</h2>
		<div class="p-8 rounded-[2rem] border border-slate-100 bg-white dark:border-gray-800 dark:bg-gray-900 flex flex-wrap gap-4 items-center justify-center">
			<Button variant="primary" onclick={() => toasts.success('Success! Your changes were saved.')}>Success Toast</Button>
			<Button variant="secondary" onclick={() => toasts.error('Error! Something went wrong.')}>Error Toast</Button>
			<Button variant="outline" onclick={() => toasts.info('Information: New update available.')}>Info Toast</Button>
			<Button variant="danger" onclick={() => toasts.warning('Warning! Disk space is low.')}>Warning Toast</Button>
		</div>
	</section>

	<!-- Usage -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">Setup</h2>
		<p class="text-sm text-slate-500 leading-relaxed">
			First, ensure you have the <code class="font-bold">ToastProvider</code> in your root layout:
		</p>
		<pre class="bg-slate-900 text-slate-300 p-6 rounded-[2rem] overflow-x-auto text-xs leading-relaxed border-4 border-slate-800 shadow-2xl"><code>{`<!-- +layout.svelte -->\n<script>\n  import { ToastProvider } from 'gisui';\n</script>\n\n<ToastProvider />\n<slot />`}</code></pre>

		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white pt-8">Usage</h2>
		<p class="text-sm text-slate-500 leading-relaxed">
			Import the <code class="font-bold">toasts</code> store anywhere in your app to trigger notifications.
		</p>
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
		<a href="/docs/components/modal" class="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">← Modal</a>
		<a href="/docs/components/toggle" class="text-sm font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors">Next: Toggle →</a>
	</div>
</div>
