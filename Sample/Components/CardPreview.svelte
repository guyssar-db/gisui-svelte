<script lang="ts">
	import { browser } from '$app/environment';
	import { tick, onMount } from 'svelte';
	import { t } from '$lib/translations';

	let {
		sourceElement = $bindable(),
		canvasElement = $bindable(),
		canvasConfig,
		selectedWorldData,
		Size,
		PowerValue,
		CriticalValue,
		DefenseValue,
		Textcolor,
		abilityText,
		formatText,
		Styleselected,
		Typeselected,
		Worldselected,
		Chaosselected,
		Hundredselected,
		ReBselected,
		updateCanvas,
		userImage,
		BGtranslateX = $bindable(),
		BGtranslateY = $bindable(),
		BGscale = $bindable(),
		isBGLocked = false,
		Cardname,
		CardNameScaleX,
		CardNameOffsetX = $bindable(),
		CardNameOffsetY = $bindable(),
		Attibute,
		AttributeScaleX,
		AttributeOffsetX = $bindable(),
		AttributeOffsetY = $bindable(),
		EffectOffsetX = $bindable(),
		EffectOffsetY = $bindable(),
		lineCount
	}: {
		sourceElement: HTMLElement | undefined;
		canvasElement: HTMLCanvasElement | undefined;
		canvasConfig: { w: number; h: number };
		selectedWorldData: any;
		Size: number;
		PowerValue: number;
		CriticalValue: number;
		DefenseValue: number;
		Textcolor: string;
		abilityText: string;
		formatText: (text: string) => string;
		Styleselected: string;
		Typeselected: string;
		Worldselected: string;
		Chaosselected: string;
		Hundredselected: string;
		ReBselected: string;
		updateCanvas: () => void;
		userImage: string | null;
		BGtranslateX: number;
		BGtranslateY: number;
		BGscale: number;
		isBGLocked: boolean;
		Cardname: string;
		CardNameScaleX: number;
		CardNameOffsetX: number;
		CardNameOffsetY: number;
		Attibute: string;
		AttributeScaleX: number;
		AttributeOffsetX: number;
		AttributeOffsetY: number;
		EffectOffsetX: number;
		EffectOffsetY: number;
		lineCount: number;
	} = $props();

	let textboxError = $state(false);
	let isDragging = $state(false);
	let isZooming = $state(false);
	let startX = $state(0);
	let startY = $state(0);
	let initialTranslateX = $state(0);
	let initialTranslateY = $state(0);
	let initialDist = $state(0);
	let initialScale = $state(1);

	// 3D Tilt Effect
	let tiltX = $state(0);
	let tiltY = $state(0);
	let cardWrapper = $state<HTMLElement>();

	function handleMouseMove(e: MouseEvent) {
		if (!cardWrapper || isDragging || isZooming) return;
		const rect = cardWrapper.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		tiltX = (centerY - y) / 20;
		tiltY = (x - centerX) / 20;
	}

	function handleMouseLeave() {
		tiltX = 0;
		tiltY = 0;
	}

	function getDistance(touches: TouchList) {
		const dx = touches[0].clientX - touches[1].clientX;
		const dy = touches[0].clientY - touches[1].clientY;
		return Math.sqrt(dx * dx + dy * dy);
	}

	function handleDragStart(e: MouseEvent | TouchEvent) {
		if (!userImage || isBGLocked) return;

		if ('touches' in e && e.touches.length === 2) {
			isZooming = true;
			isDragging = false;
			initialDist = getDistance(e.touches);
			initialScale = BGscale;
		} else {
			isDragging = true;
			isZooming = false;
			const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
			const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
			startX = clientX;
			startY = clientY;
			initialTranslateX = BGtranslateX;
			initialTranslateY = BGtranslateY;
		}

		window.addEventListener('mousemove', handleDragMove);
		window.addEventListener('touchmove', handleDragMove, { passive: false });
		window.addEventListener('mouseup', handleDragEnd);
		window.addEventListener('touchend', handleDragEnd);

		if (e.cancelable) e.preventDefault();
	}

	function handleDragMove(e: MouseEvent | TouchEvent) {
		if (isZooming && 'touches' in e && e.touches.length === 2) {
			const currentDist = getDistance(e.touches);
			const ratio = currentDist / initialDist;
			BGscale = Math.max(0.1, Math.min(10, initialScale * ratio));
			if (e.cancelable) e.preventDefault();
		} else if (isDragging) {
			const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
			const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
			const dx = clientX - startX;
			const dy = clientY - startY;
			BGtranslateX = initialTranslateX + dx;
			BGtranslateY = initialTranslateY + dy;
			if ('touches' in e && e.cancelable) e.preventDefault();
		}
	}

	function handleDragEnd() {
		if (!isDragging && !isZooming) return;
		isDragging = false;
		isZooming = false;
		window.removeEventListener('mousemove', handleDragMove);
		window.removeEventListener('touchmove', handleDragMove);
		window.removeEventListener('mouseup', handleDragEnd);
		window.removeEventListener('touchend', handleDragEnd);
	}

	function handleWheel(e: WheelEvent) {
		if (!userImage || isBGLocked) return;
		e.preventDefault();
		const delta = -e.deltaY;
		const factor = 0.001;
		const newScale = BGscale + delta * factor;
		BGscale = Math.max(0.1, Math.min(10, newScale));
	}

	$effect(() => {
		Worldselected;
		lineCount;
		textboxError = false;
	});

	$effect(() => {
		if (textboxError) {
			tick().then(updateCanvas);
		}
	});

	onMount(() => {
		sourceElement?.addEventListener('wheel', handleWheel, { passive: false });
		return () => {
			sourceElement?.removeEventListener('wheel', handleWheel);
			window.removeEventListener('mousemove', handleDragMove);
			window.removeEventListener('touchmove', handleDragMove);
			window.removeEventListener('mouseup', handleDragEnd);
			window.removeEventListener('touchend', handleDragEnd);
		};
	});
</script>

<div class="flex flex-col items-center justify-center gap-10 p-4 md:flex-row">
	{#if selectedWorldData}
		<div class="z-10 h-fit text-center md:sticky md:top-30">
			<!-- Responsive Wrapper for Mobile -->
			<div
				class="xs:scale-85 flex origin-center scale-75 items-center justify-center transition-transform duration-300 sm:w-auto sm:scale-100"
				style="width: 100vw; max-width: {canvasConfig.w + 40}px;"
			>
				<div
					bind:this={cardWrapper}
					onmousemove={handleMouseMove}
					onmouseleave={handleMouseLeave}
					class="group relative rounded-3xl border-2 border-dashed border-indigo-200 bg-white p-2 shadow-2xl transition-all duration-100 dark:border-gray-500 dark:bg-gray-800"
					style="width: {canvasConfig.w + 20}px; transform: perspective(1000px) rotateX({tiltX}deg) rotateY({tiltY}deg); transition: transform 0.1s ease-out;"
				>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						bind:this={sourceElement}
						onmousedown={handleDragStart}
						ontouchstart={handleDragStart}
						style="width: {canvasConfig.w}px; height: {canvasConfig.h}px;"
						class="relative flex cursor-move items-center justify-center overflow-hidden rounded-2xl bg-gray-200 shadow-inner select-none"
					>
						<div>
							<div class="absolute inset-0 z-50 h-full w-full">
								{#if selectedWorldData.id != 'lwm'}
									<div
										class=" absolute h-full w-full text-center text-[28px]"
										style="translate: {selectedWorldData.size[0]}px {selectedWorldData.size[1]}px;"
									>
										<p
											class="stroked-text absolute w-10 scale-x-220 text-center"
											style="font-family: '{selectedWorldData.font}', sans-serif;"
										>
											{Size}
										</p>
										<p
											class="absolute w-10 scale-x-220 text-center text-[#ffc20e]"
											style="font-family: '{selectedWorldData.font}', sans-serif;"
										>
											{Size}
										</p>
									</div>
								{/if}

								<div class="absolute h-full w-full text-center">
									<div
										class="-rotate-90"
										style="translate:{selectedWorldData.def[0]}px {selectedWorldData.def[1]}px;"
									>
										<p
											class="absolute w-60 {selectedWorldData.skewDef} {selectedWorldData.textStyleDef} text-start"
											style="font-family: '{selectedWorldData.powerFont}', sans-serif; font-size:{selectedWorldData.statSize}pt; {selectedWorldData.powerFontBorder}"
										>
											{DefenseValue}
										</p>
										<p
											class="absolute w-60 {selectedWorldData.skewDef} {selectedWorldData.textStyleDef} text-start {selectedWorldData.colorDef}"
											style="font-family: '{selectedWorldData.powerFont}', sans-serif; font-size:{selectedWorldData.statSize}pt;"
										>
											{DefenseValue}
										</p>
									</div>
								</div>
								<div class="absolute h-full w-full text-center">
									<div
										class="-rotate-90"
										style="translate:{selectedWorldData.cri[0]}px {selectedWorldData.cri[1]}px;"
									>
										<p
											class="absolute w-30 {selectedWorldData.skewCri} {selectedWorldData.textStyleCri} text-center"
											style="font-family: '{selectedWorldData.powerFont}', sans-serif; font-size:{selectedWorldData.statSizeCri}pt; {selectedWorldData.textStyleCriStyle}"
										>
											{CriticalValue}
										</p>
										<p
											class="absolute w-30 {selectedWorldData.skewCri} {selectedWorldData.textStyleCri} text-center"
											style="font-family: '{selectedWorldData.powerFont}', sans-serif; font-size:{selectedWorldData.statSizeCri}pt;"
										>
											{CriticalValue}
										</p>
									</div>
								</div>
								<div class="absolute h-full w-full text-center">
									<div
										class="-rotate-90"
										style="translate:{selectedWorldData.power[0]}px {selectedWorldData.power[1]}px;"
									>
										<p
											class="absolute w-60 {selectedWorldData.skewPower} {selectedWorldData.textStylePower} "
											style="font-family: '{selectedWorldData.powerFont}', sans-serif; font-size:{selectedWorldData.statSize}pt; {selectedWorldData.powerFontBorder}"
										>
											{PowerValue}
										</p>
										<p
											class="absolute w-60 {selectedWorldData.skewPower} {selectedWorldData.textStylePower} {selectedWorldData.colorPower}"
											style="font-family: '{selectedWorldData.powerFont}', sans-serif; font-size:{selectedWorldData.statSize}pt;"
										>
											{PowerValue}
										</p>
									</div>
								</div>
								<div class=" absolute text-[28px]">
									<p
										class="absolute h-10 w-200 text-center {selectedWorldData.cardNameStyle3}"
										style="font-family: 'ChamnarnT', sans-serif; translate:{selectedWorldData
											.cardName[0] + CardNameOffsetX}px {selectedWorldData.cardName[1] +
											CardNameOffsetY}px; scale: {CardNameScaleX} 1;"
									>
										{Cardname}
									</p>
									<p
										class="absolute h-10 w-200 text-center {selectedWorldData.cardNameStyle2}"
										style="font-family: 'ChamnarnT', sans-serif; translate:{selectedWorldData
											.cardName[0] + CardNameOffsetX}px {selectedWorldData.cardName[1] +
											CardNameOffsetY}px; scale: {CardNameScaleX} 1;"
									>
										{Cardname}
									</p>
									<p
										class="absolute h-10 w-200 text-center {selectedWorldData.cardNameStyle}"
										style="font-family: 'ChamnarnT', sans-serif; translate:{selectedWorldData
											.cardName[0] + CardNameOffsetX}px {selectedWorldData.cardName[1] +
											CardNameOffsetY}px; scale: {CardNameScaleX} 1;"
									>
										{Cardname}
									</p>
								</div>
								<div>
									<p
										class="absolute h-10 w-200 text-center {selectedWorldData.attStyle2}"
										style="font-family: 'ChamnarnT', sans-serif; translate:{selectedWorldData
											.att[0] + AttributeOffsetX}px {selectedWorldData.att[1] +
											AttributeOffsetY}px; scale: {AttributeScaleX} 1;"
									>
										{Attibute}
									</p>
									<p
										class="absolute h-10 w-200 text-center {selectedWorldData.attStyle}"
										style="font-family: 'ChamnarnT', sans-serif; translate:{selectedWorldData
											.att[0] + AttributeOffsetX}px {selectedWorldData.att[1] +
											AttributeOffsetY}px; scale: {AttributeScaleX} 1;"
									>
										{Attibute}
									</p>
								</div>
							</div>
						</div>
						{#if abilityText}
							<div
								class="pointer-events-none absolute inset-0 z-50 w-full {selectedWorldData
									.textEffect[0]}"
								style="padding: 385px 45px 0 45px; color: {Textcolor};"
							>
								<div
									style="translate: {selectedWorldData.effect[0] +
										EffectOffsetX}px {selectedWorldData.effect[1] + EffectOffsetY}px;"
								>
									<div class="flex h-100 w-125 scale-x-80 flex-col justify-end">
										<p
											id="effectcard"
											class="text-left text-[18px] leading-[1.3] font-bold wrap-break-word whitespace-pre-wrap"
										>
											{#if browser}
												{@html formatText(abilityText)}
											{:else}
												...
											{/if}
										</p>
									</div>
								</div>
							</div>
						{/if}
						<div>
							<div class=" absolute inset-0 z-40">
								{#if Chaosselected == 'chaos'}
									<img class="absolute h-full w-full" src="/chaos.webp" alt="water mark" />
								{/if}
								{#if Hundredselected == 'hundred'}
									<img class="absolute h-full w-full" src="/hundred.webp" alt="water mark" />
								{/if}
								{#if ReBselected == 'reb'}
									<img class="absolute h-full w-full" src="/ReB.webp" alt="water mark" />
								{/if}
								<img class="absolute h-full w-full" src="/fm2.webp" alt="water mark" />
							</div>
						</div>
						<div class="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
							<img
								class="pointer-events-none absolute inset-0 z-20 h-full w-full object-contain"
								src="/images/Worlds/{Styleselected}/{Typeselected}/{Worldselected}.webp"
								alt="frame"
								onload={updateCanvas}
							/>
							{#if abilityText && !textboxError}
								<img
									onerror={() => {
										textboxError = true;
										tick().then(updateCanvas);
									}}
									class="pointer-events-none absolute inset-0 {selectedWorldData
										.textEffect[1]} h-full w-full object-contain"
									src="/images/Textbox/{Worldselected + lineCount}.png"
									alt=""
								/>
							{/if}

							{#if userImage}
								<img
									src={userImage}
									alt="user"
									style="transform: translate({BGtranslateX}px, {BGtranslateY}px) scale({BGscale}); transform-origin: center;"
									class="max-w-none transition-none"
									crossorigin="anonymous"
								/>
							{:else}
								<img
									src="https://placehold.co/450x629?text=Upload"
									alt="placeholder"
									class="h-full w-full object-cover"
									crossorigin="anonymous"
								/>
							{/if}
						</div>
					</div>
					<!-- Hidden Canvas for Exporting -->
					<canvas bind:this={canvasElement} class="hidden"></canvas>
				</div>
			</div>
		</div>
	{:else}
		<div
			class="flex h-[629px] w-[450.5px] items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/50 text-slate-400"
		>
			Loading Preview...
		</div>
	{/if}
</div>
