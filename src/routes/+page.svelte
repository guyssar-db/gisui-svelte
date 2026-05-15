<script lang="ts">
	import { 
		Button, Input, Card, Modal, Toggle, Loading, 
		Dropdown, ProgressBar, Badge, Alert, 
		Checkbox, Avatar, Tabs, Skeleton, ThemeToggle,
		DotBackground
	} from '$lib';

	let inputValue = $state('');
	let showModal = $state(false);
	let isToggled = $state(true);
	let dropdownValue = $state('option1');
	let showOverlayLoading = $state(false);
	let demoProgress = $state(45);
	let checkboxChecked = $state(true);
	let activeTab = $state('tab1');

	function startProgressDemo() {
		demoProgress = 0;
		const interval = setInterval(() => {
			if (demoProgress >= 100) {
				clearInterval(interval);
			} else {
				demoProgress += 1;
			}
		}, 50);
	}

	function handleTestClick() {
		showOverlayLoading = true;
		setTimeout(() => {
			showOverlayLoading = false;
		}, 2000);
	}
</script>

<DotBackground class="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 pb-32 transition-colors">
	<div class="max-w-5xl mx-auto space-y-16">
		<header class="text-center space-y-4 pt-8 relative">
			<div class="absolute right-0 top-8 flex gap-4">
				<Button variant="outline" size="sm" onclick={() => window.location.href = '/docs'}>Documentation</Button>
				<ThemeToggle />
			</div>
			<Badge variant="primary" class="mb-2">v0.1.0 Alpha</Badge>
			<h1 class="text-6xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
				GisUI Core
			</h1>
			<p class="text-slate-500 font-medium text-lg">The Complete Svelte 5 + Tailwind 4 UI Kit</p>
		</header>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
			<!-- Left Column: Primary Components -->
			<div class="lg:col-span-7 space-y-12">
				
				<!-- Tabs & Content -->
				<section class="space-y-6">
					<Tabs 
						bind:activeTab 
						tabs={[
							{ id: 'tab1', label: 'Basics' },
							{ id: 'tab2', label: 'Advanced' },
							{ id: 'tab3', label: 'Layout' }
						]} 
					/>
					
					<Card class="min-h-[200px] flex items-center justify-center">
						{#if activeTab === 'tab1'}
							<div class="text-center space-y-4">
								<h3 class="text-xl font-black uppercase">Standard Components</h3>
								<p class="text-sm text-slate-500">You are viewing the basic core components.</p>
							</div>
						{:else if activeTab === 'tab2'}
							<div class="w-full space-y-4">
								<Skeleton width="w-3/4" />
								<Skeleton width="w-full" height="h-32" />
								<div class="flex gap-4">
									<Skeleton variant="circle" width="w-12" height="h-12" />
									<div class="flex-1 space-y-2">
										<Skeleton width="w-1/2" />
										<Skeleton width="w-1/3" />
									</div>
								</div>
							</div>
						{:else}
							<p class="font-black uppercase text-indigo-600">Layout system coming soon...</p>
						{/if}
					</Card>
				</section>

				<!-- Buttons -->
				<section class="space-y-6">
					<h2 class="text-xs font-black tracking-[0.3em] text-slate-400 uppercase border-b border-slate-200 pb-2 dark:border-slate-800">
						Buttons & Interactions
					</h2>
					<div class="flex flex-wrap gap-4">
						<Button variant="primary">Primary</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost" class="text-rose-500 hover:text-rose-600">Ghost</Button>
					</div>
					<div class="flex items-center gap-6">
						<Toggle label="Notifications" bind:checked={isToggled} />
						<Checkbox label="Agree to Terms" bind:checked={checkboxChecked} />
					</div>
				</section>

				<!-- Inputs & Forms -->
				<section class="space-y-6">
					<h2 class="text-xs font-black tracking-[0.3em] text-slate-400 uppercase border-b border-slate-200 pb-2 dark:border-slate-800">
						Forms & Selectors
					</h2>
					<div class="grid sm:grid-cols-2 gap-6">
						<Input label="Display Name" placeholder="John Doe" bind:value={inputValue} />
						<Dropdown 
							label="Account Type" 
							bind:value={dropdownValue}
							options={[
								{ label: 'Personal', value: 'option1' },
								{ label: 'Business', value: 'option2' }
							]} 
						/>
					</div>
					<Input label="Email Address" type="email" placeholder="john@example.com" error={inputValue.length < 3 ? 'Too short' : ''} />
				</section>
			</div>

			<!-- Right Column: Feedback & Data -->
			<div class="lg:col-span-5 space-y-12">
				
				<!-- Feedback -->
				<section class="space-y-6">
					<h2 class="text-xs font-black tracking-[0.3em] text-slate-400 uppercase border-b border-slate-200 pb-2 dark:border-slate-800">
						Feedback & Status
					</h2>
					<Alert variant="success" title="Success" closable={true}>
						Your profile has been updated successfully.
					</Alert>
					<Alert variant="danger" title="Error">
						Failed to connect to the server.
					</Alert>
					<div class="space-y-4">
						<ProgressBar progress={demoProgress} showValue={true} label="Deployment Progress" />
						<Button size="sm" variant="secondary" onclick={startProgressDemo}>Trigger Demo</Button>
					</div>
				</section>

				<!-- Badges & Avatars -->
				<section class="space-y-6">
					<h2 class="text-xs font-black tracking-[0.3em] text-slate-400 uppercase border-b border-slate-200 pb-2 dark:border-slate-800">
						Identity & Labels
					</h2>
					<div class="flex flex-wrap gap-3">
						<Badge variant="primary">Active</Badge>
						<Badge variant="success">Verified</Badge>
						<Badge variant="danger">Blocked</Badge>
						<Badge variant="warning">Pending</Badge>
						<Badge variant="secondary">Draft</Badge>
					</div>
					<div class="flex items-center gap-4">
						<Avatar size="sm" fallback="JD" />
						<Avatar size="md" fallback="KB" class="bg-indigo-600 text-white" />
						<Avatar size="lg" fallback="GS" />
						<Avatar size="xl" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
					</div>
				</section>

				<!-- Overlays -->
				<section class="space-y-6">
					<h2 class="text-xs font-black tracking-[0.3em] text-slate-400 uppercase border-b border-slate-200 pb-2 dark:border-slate-800">
						Overlays
					</h2>
					<div class="flex gap-4">
						<Button variant="outline" onclick={() => showModal = true} class="flex-1">Open Modal</Button>
						<Button variant="primary" onclick={handleTestClick} class="flex-1">Overlay Loading</Button>
					</div>
				</section>
			</div>
		</div>

		<Modal bind:show={showModal} title="System Configuration">
			<div class="space-y-6">
				<p class="text-sm text-slate-500">Adjust your preferences below.</p>
				<Input label="API Key" type="password" placeholder="sk_test_..." />
				<div class="flex justify-end gap-3 pt-4">
					<Button variant="ghost" onclick={() => showModal = false}>Cancel</Button>
					<Button variant="primary" onclick={() => showModal = false}>Apply Changes</Button>
				</div>
			</div>
		</Modal>

		{#if showOverlayLoading}
			<Loading overlay={true} message="Optimizing database..." />
		{/if}

		<footer class="pt-16 text-center border-t border-slate-200 dark:border-slate-800">
			<p class="text-[10px] font-black tracking-[0.5em] text-slate-400 uppercase">
				GisUI Framework • Built with Passion & Svelte 5
			</p>
		</footer>
	</div>
</DotBackground>
