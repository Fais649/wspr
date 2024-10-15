<script lang="ts">
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { device, type DeviceInfo } from "$lib/stores/deviceStore";

	let deviceInfoLocal: DeviceInfo;
	device.subscribe((data) => {
		deviceInfoLocal = data;
	});

	let noteString: string = "";
	let isMaximized = false;
	let firstLoad = true;

	function toggleMaximize() {
		if (firstLoad) {
			firstLoad = false;
		}
		isMaximized = !isMaximized;
		if (isMaximized) {
			setTimeout(() => {
				let textarea =
					document.getElementById("textarea");
				if (textarea) {
					textarea.focus();
				}
			}, 200);
		}
	}

	$: containerWidth =
		deviceInfoLocal !== undefined ? deviceInfoLocal.widthPx : 800;
	$: maximizedClass =
		containerWidth > 800 ? "maximizedHorizontal" : "maximized";
	$: minimizedClass =
		containerWidth > 800 ? "minimizedHorizontal" : "minimized";
	$: animationClass = isMaximized ? maximizedClass : minimizedClass;
</script>

<div class="wrapper">
	<div
		class="note-component rounded-xl {firstLoad
			? ''
			: animationClass}"
	>
		<Label
			class="pl-2 box h-[40px] flex  items-center text-left border-b-white
		border-dotted border-b-[1px]"
			for="message">note;</Label
		>
		<Textarea
			on:focus={toggleMaximize}
			on:blur={toggleMaximize}
			class="h-full resize-none rounded-b-xl overflow-scroll rounded-t-none border-none shadow-none outline-none ring-0 focus-within:ring-0 focus-visible:ring-0"
			placeholder=">..."
			id="textarea"
			bind:value={noteString}
		/>
	</div>
</div>

<style>
	.wrapper {
		width: 300px;
		height: 300px;
		padding: 2px;
	}

	.note-component {
		position: relative;
		box-shadow: -2px 2px;
		border: 1px dotted;
		background-color: black;
		padding: 2px;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		z-index: 10;
		width: 100%;
		height: 100%;
	}

	/* Maximized State */
	.note-component.maximized {
		animation: moveUpAndExpand 0.6s forwards;
		padding-bottom: 8%;
	}

	/* Minimized State */
	.note-component.minimized {
		animation: shrinkAndMoveDown 0.6s forwards;
	}

	/* Keyframe for Maximizing */
	@keyframes moveUpAndExpand {
		0% {
			position: relative;
			top: 0;
			left: 0;
		}
		100% {
			position: relative;
			top: -322px;
			left: -20%;
			width: 140%;
			height: 200%;
			border-radius: 0px;
		}
	}

	/* Keyframe for Minimizing */
	@keyframes shrinkAndMoveDown {
		0% {
			position: relative;
			top: -322px;
			left: -20%;
			width: 140%;
			height: 200%;
			border-radius: 0px;
		}
		100% {
			position: relative;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}

	.note-component.maximizedHorizontal {
		animation: moveDownAndExpand 0.6s forwards;
		padding-bottom: 8%;
	}

	/* Minimized State */
	.note-component.minimizedHorizontal {
		animation: shrinkAndMoveUp 0.6s forwards;
	}

	/* Keyframe for Maximizing */
	@keyframes moveDownAndExpand {
		0% {
			position: relative;
			top: 0;
			left: 0;
		}
		100% {
			position: relative;
			left: -322px;
			top: 0;
			width: 200%;
			height: 245%;
			border-radius: 0px;
		}
	}

	/* Keyframe for Minimizing */
	@keyframes shrinkAndMoveUp {
		0% {
			position: relative;
			left: -322px;
			top: 0;
			width: 200%;
			height: 245%;
			border-radius: 0px;
		}
		100% {
			position: relative;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}
</style>
