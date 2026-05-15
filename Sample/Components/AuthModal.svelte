<script lang="ts">
	import { t } from '$lib/translations';
	import { user, showAuthModal, authModalMode, addToast } from '$lib/themeStore';
	import { goto, invalidateAll } from '$app/navigation';
	import { fade, scale } from 'svelte/transition';

	let username = $state('');
	let email = $state('');
	let phone = $state('');
	let password = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');
	let loginIdentifier = $state(''); // email or username
	let error = $state('');
	let message = $state('');
	let isLoading = $state(false);

	let showPassword = $state(false);
	let showNewPassword = $state(false);
	let showConfirmPassword = $state(false);
	let isAgreedToTerms = $state(false);

	// Reset fields when mode changes or modal opens
	$effect(() => {
		if ($showAuthModal) {
			error = '';
			message = '';
			password = '';
			newPassword = '';
			confirmPassword = '';
			showPassword = false;
			showNewPassword = false;
			showConfirmPassword = false;
		}
	});

	async function handleRegister() {
		if (!isAgreedToTerms) {
			error = 'agreeToTermsError';
			return;
		}
		error = '';
		message = '';
		isLoading = true;
		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				body: JSON.stringify({ username, email, phone })
			});

			let data;
			try {
				data = await res.json();
			} catch (e) {
				error = 'Server returned an invalid response';
				return;
			}

			if (res.ok) {
				addToast('registrationSuccess', 'success');
				await invalidateAll();
				setTimeout(() => {
					showAuthModal.set(false);
					goto('/verify');
				}, 2000);
			} else {
				error = data.error || 'Registration failed';
			}
		} catch (e) {
			error = 'Something went wrong. Please check your connection.';
		} finally {
			isLoading = false;
		}
	}

	async function handleLogin() {
		error = '';
		message = '';
		isLoading = true;
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify({ login: loginIdentifier, password })
			});

			let data;
			try {
				data = await res.json();
			} catch (e) {
				error = 'Server returned an invalid response';
				return;
			}

			if (res.ok) {
				user.set(data.user);
				addToast('loginSuccess', 'success');
				await invalidateAll();
				showAuthModal.set(false);
			} else {
				error = data.error || 'Login failed';
			}
		} catch (e) {
			error = 'Something went wrong. Please check your connection.';
		} finally {
			isLoading = false;
		}
	}

	async function handleChangePassword() {
		if (newPassword !== confirmPassword) {
			error = 'passwordsDoNotMatch';
			return;
		}
		error = '';
		message = '';
		isLoading = true;
		try {
			const res = await fetch('/api/auth/change-password', {
				method: 'POST',
				body: JSON.stringify({ oldPassword: password, newPassword })
			});

			let data;
			try {
				data = await res.json();
			} catch (e) {
				error = 'Server returned an invalid response';
				return;
			}

			if (res.ok) {
				addToast('passwordChangedSuccess', 'success');
				await invalidateAll();
				setTimeout(() => {
					showAuthModal.set(false);
				}, 2000);
			} else {
				error = data.error || 'Update failed';
			}
		} catch (e) {
			error = 'Something went wrong. Please check your connection.';
		} finally {
			isLoading = false;
		}
	}
</script>

{#if $showAuthModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		transition:fade={{ duration: 300 }}
		onclick={() => showAuthModal.set(false)}
		class="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md"
	>
		<div
			transition:scale={{ start: 0.95, duration: 400, opacity: 0 }}
			onclick={(e) => e.stopPropagation()}
			class="w-full max-w-md rounded-[3rem] border border-slate-100 bg-white/95 p-10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.2)] backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-950/95"
		>
			<div class="mb-10 flex items-center justify-between">
				<div class="flex items-center gap-4">
					<h2 class="text-2xl font-black tracking-tight text-slate-800 uppercase dark:text-white">
						{#if $authModalMode === 'login'}
							{$t('login')}
						{:else}
							{$authModalMode === 'register' ? $t('register') : $t('changePassword')}
						{/if}
					</h2>
				</div>
				<button
					onclick={() => showAuthModal.set(false)}
					class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500 active:scale-90 dark:bg-gray-900"
					aria-label="Close modal"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			{#if error}
				<div
					class="animate-in fade-in slide-in-from-top-2 mb-8 flex items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50/50 p-4 text-[10px] font-black tracking-wider text-rose-500 uppercase dark:border-rose-900/50 dark:bg-rose-950/20"
				>
					<div
						class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-rose-500 text-white shadow-sm shadow-rose-200 dark:shadow-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
						>
					</div>
					{$t(error as any) || error}
				</div>
			{/if}

			{#if message}
				<div
					class="animate-in fade-in slide-in-from-top-2 mb-8 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-[10px] font-black tracking-wider text-emerald-500 uppercase dark:border-emerald-900/50 dark:bg-emerald-950/20"
				>
					<div
						class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm shadow-emerald-200 dark:shadow-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
						>
					</div>
					{$t(message as any) || message}
				</div>
			{/if}

			<div class="space-y-6">
				{#if $authModalMode === 'login'}
					<div class="group space-y-1.5">
						<p
							class="pl-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
						>
							{$t('usernameOrEmail')}
						</p>
						<input
							type="text"
							bind:value={loginIdentifier}
							class="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
						/>
					</div>
					<div class="group space-y-1.5">
						<p
							class="pl-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
						>
							{$t('password')}
						</p>
						<div class="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								bind:value={password}
								class="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
							/>
							<button
								type="button"
								onclick={() => (showPassword = !showPassword)}
								class="absolute top-1/2 right-5 -translate-y-1/2 text-slate-400 transition-colors hover:text-indigo-600"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									{#if showPassword}
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									{:else}
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.888 9.888L3 3m18 18l-6.888-6.888"
										/>
									{/if}
								</svg>
							</button>
						</div>
					</div>
					<button
						onclick={handleLogin}
						disabled={isLoading}
						class="w-full rounded-[1.5rem] bg-indigo-600 py-5 text-xs font-black tracking-[0.2em] text-white uppercase shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02] hover:bg-indigo-700 active:scale-95 disabled:opacity-50 dark:shadow-none"
					>
						{isLoading ? '...' : $t('login')}
					</button>
					<div class="mt-4 flex flex-col gap-2 text-center">
						<p class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
							{$t('dontHaveAccount')}
							<button
								onclick={() => authModalMode.set('register')}
								class="text-indigo-600 hover:underline">{$t('register')}</button
							>
						</p>
					</div>
				{:else if $authModalMode === 'register'}
					<div class="space-y-5">
						<div class="group space-y-1.5">
							<p
								class="pl-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
							>
								{$t('username')}
							</p>
							<input
								type="text"
								bind:value={username}
								class="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
							/>
						</div>
						<div class="group space-y-1.5">
							<p
								class="pl-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
							>
								{$t('email')}
							</p>
							<input
								type="email"
								bind:value={email}
								class="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
							/>
						</div>
						<div class="group space-y-1.5">
							<p
								class="pl-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
							>
								{$t('phone')}
							</p>
							<input
								type="text"
								bind:value={phone}
								class="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
							/>
						</div>

						<div class="flex items-center gap-4 px-2 py-2">
							<input
								type="checkbox"
								id="terms"
								bind:checked={isAgreedToTerms}
								class="mt-1 h-5 w-5 rounded-lg border-slate-200 text-indigo-600 transition-all focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-900"
							/>
							<label for="terms" class="text-[10px] leading-relaxed font-bold text-slate-400">
								{$t('agreeTo')}
								<a
									href="/terms"
									class="font-black text-indigo-600 hover:underline"
									target="_blank"
									onclick={(e) => e.stopPropagation()}>{$t('termsOfService')}</a
								>
								{$t('and')}
								<a
									href="/privacy"
									class="font-black text-indigo-600 hover:underline"
									target="_blank"
									onclick={(e) => e.stopPropagation()}>{$t('termsOfUse')}</a
								>
							</label>
						</div>

						<button
							onclick={handleRegister}
							disabled={isLoading || !isAgreedToTerms}
							class="w-full rounded-[1.5rem] bg-indigo-600 py-5 text-xs font-black tracking-[0.2em] text-white uppercase shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02] hover:bg-indigo-700 active:scale-95 disabled:opacity-50 dark:shadow-none"
						>
							{isLoading ? '...' : $t('register')}
						</button>

						<div
							class="rounded-3xl border border-slate-100 bg-slate-50/50 p-6 text-center dark:border-gray-800 dark:bg-gray-900/50"
						>
							<p class="mb-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase">
								{$t('disclaimerTitle')}
							</p>
							<p class="text-[10px] leading-relaxed font-semibold text-slate-500">
								{$t('officialDisclaimer')}
							</p>
						</div>

						<p class="text-center text-[10px] font-black tracking-widest text-slate-400 uppercase">
							{$t('alreadyHaveAccount')}
							<button
								onclick={() => authModalMode.set('login')}
								class="text-indigo-600 hover:underline">{$t('login')}</button
							>
						</p>
					</div>
				{:else if $authModalMode === 'changePassword'}
					<div class="space-y-5">
						<div class="group space-y-1.5">
							<p
								class="pl-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
							>
								{$t('oldPassword')}
							</p>
							<div class="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									bind:value={password}
									class="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
								/>
								<button
									type="button"
									onclick={() => (showPassword = !showPassword)}
									class="absolute top-1/2 right-5 -translate-y-1/2 text-slate-400"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										>{#if showPassword}<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>{:else}<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.888 9.888L3 3m18 18l-6.888-6.888"
											/>{/if}</svg
									></button
								>
							</div>
						</div>
						<div class="group space-y-1.5">
							<p
								class="pl-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
							>
								{$t('newPassword')}
							</p>
							<div class="relative">
								<input
									type={showNewPassword ? 'text' : 'password'}
									bind:value={newPassword}
									class="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
								/>
								<button
									type="button"
									onclick={() => (showNewPassword = !showNewPassword)}
									class="absolute top-1/2 right-5 -translate-y-1/2 text-slate-400"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										>{#if showNewPassword}<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>{:else}<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.888 9.888L3 3m18 18l-6.888-6.888"
											/>{/if}</svg
									></button
								>
							</div>
						</div>
						<div class="group space-y-1.5">
							<p
								class="pl-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600"
							>
								{$t('confirmPassword')}
							</p>
							<div class="relative">
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									bind:value={confirmPassword}
									class="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
								/>
								<button
									type="button"
									onclick={() => (showConfirmPassword = !showConfirmPassword)}
									class="absolute top-1/2 right-5 -translate-y-1/2 text-slate-400"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										>{#if showConfirmPassword}<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>{:else}<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.888 9.888L3 3m18 18l-6.888-6.888"
											/>{/if}</svg
									></button
								>
							</div>
						</div>
						<button
							onclick={handleChangePassword}
							disabled={isLoading}
							class="w-full rounded-[1.5rem] bg-indigo-600 py-5 text-xs font-black tracking-[0.2em] text-white uppercase shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02] hover:bg-indigo-700 active:scale-95 disabled:opacity-50 dark:shadow-none"
						>
							{isLoading ? '...' : $t('updatePassword')}
						</button>
						<p class="text-center text-[10px] font-black tracking-widest text-slate-400 uppercase">
							<button
								onclick={() => authModalMode.set('login')}
								class="text-indigo-600 hover:underline">{$t('backToLogin')}</button
							>
						</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
