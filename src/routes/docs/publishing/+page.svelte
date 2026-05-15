<script lang="ts">
	import { Badge, Card, Alert } from '$lib';
</script>

<div class="space-y-12">
	<div class="space-y-4">
		<div class="flex items-center gap-3">
			<h1 class="text-4xl font-black uppercase tracking-tighter dark:text-white sm:text-6xl">Publishing</h1>
			<Badge variant="primary">NPM</Badge>
		</div>
		<p class="text-lg text-slate-500 font-medium leading-relaxed">
			Ready to share your library with the world? Here are the ways you can make GisUI installable.
		</p>
	</div>

	<!-- Option 1: NPM -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">1. Publish to NPM</h2>
		<p class="text-sm text-slate-500 leading-relaxed">
			The professional way to share your library.
		</p>
		<div class="space-y-4">
			<Card class="p-6 bg-slate-900 border-none text-slate-300 font-mono text-xs space-y-2">
				<p># 1. Login to your account</p>
				<p class="text-white">npm login</p>
				<p class="mt-4"># 2. Build the package</p>
				<p class="text-white">npm run build</p>
				<p class="mt-4"># 3. Publish</p>
				<p class="text-white">npm publish --access public</p>
			</Card>
			<Alert variant="warning" title="Check Name Availability">
				Make sure the name "gisui" (or your chosen name) is available on <a href="https://www.npmjs.com" class="underline">npmjs.com</a> before publishing.
			</Alert>
		</div>
	</section>

	<!-- Option 2: GitHub -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">2. Install via GitHub</h2>
		<p class="text-sm text-slate-500 leading-relaxed">
			You can install the library directly from a GitHub repository without publishing to NPM.
		</p>
		<Card class="p-6 bg-slate-900 border-none text-white font-mono text-xs">
			npm install github:yourusername/gisui
		</Card>
	</section>

	<!-- Option 3: Local Link -->
	<section class="space-y-6">
		<h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">3. Local Development (Link)</h2>
		<p class="text-sm text-slate-500 leading-relaxed">
			To use the library in another local project during development:
		</p>
		<div class="grid sm:grid-cols-2 gap-4">
			<Card class="p-4 space-y-2">
				<p class="text-[10px] font-black uppercase text-slate-400">Step 1 (In GisUI folder)</p>
				<code class="text-xs font-bold text-indigo-600">npm link</code>
			</Card>
			<Card class="p-4 space-y-2">
				<p class="text-[10px] font-black uppercase text-slate-400">Step 2 (In your app folder)</p>
				<code class="text-xs font-bold text-indigo-600">npm link gisui</code>
			</Card>
		</div>
	</section>

	<div class="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
		<a href="/docs/installation" class="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">← Installation</a>
		<a href="/docs/components/button" class="text-sm font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors">Next: Button →</a>
	</div>
</div>
