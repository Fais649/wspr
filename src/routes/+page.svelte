<script lang="ts">
	import ToolBar from "$lib/components/ui/ToolBar.svelte";
	import DividerPanel from "$lib/components/ui/DividerPanel.svelte";
	import { loadTodayInfoFile } from "$lib/services/filesystem";
	import { onDestroy, onMount } from "svelte";
	import { date } from "$lib/stores/todayStore";
	import { reloadWidget } from "$lib/services/widget";
	import { App } from "@capacitor/app";
	import type { PluginListenerHandle } from "@capacitor/core";
	import { Footer } from "$lib/components/ui/drawer";
	import { Keyboard } from "@capacitor/keyboard";
	import { ScreenOrientation } from "@capacitor/screen-orientation";

	let vpHeight = $state(800);
	let vpWidth = $state(400);
	let kbHeight = $state(0);
	let containerHeight = $derived(vpHeight - kbHeight);
	let containerWidth = $derived(vpWidth);
	let portrait = $derived(containerHeight > containerWidth);

	let appListener: PluginListenerHandle;

	onMount(async () => {
		await loadTodayInfoFile($date.dateString);
		await reloadWidget();
		appListener = await App.addListener("appStateChange", ({ isActive }) => {
			reloadWidget();
		});

		vpHeight = window.innerHeight;
		vpWidth = window.innerWidth;

		Keyboard.addListener("keyboardWillShow", (e) => {
			kbHeight = e.keyboardHeight;
		});

		ScreenOrientation.addListener("screenOrientationChange", (e) => {
			vpHeight = window.innerHeight;
			vpWidth = window.innerWidth;
		});

		Keyboard.addListener("keyboardWillHide", () => {
			kbHeight = 0;
		});
	});

	window.addEventListener("resize", () => {
		vpHeight = window.innerHeight;
		vpWidth = window.innerWidth;

		console.log("width: ", window.innerWidth);
		console.log("height: ", window.innerHeight);
	});

	onDestroy(async () => {
		await reloadWidget();
		appListener.remove();
	});
</script>

<div
	style="height: {containerHeight}px;"
	class="page overflow-hidden flex flex-col w-full items-center
	justify-start p-2"
>
	<div
		class="w-full flex justify-center {portrait ? 'mt-4 mb-20' : ''} h-[100%]"
	>
		<DividerPanel {portrait} />
	</div>
	<Footer class="absolute bottom-4  w-full z-50">
		<div
			class=" w-full flex {portrait
				? ' justify-center'
				: 'justify-start scale-90 p-0 m-0 left-[-60px]'}"
		>
			<ToolBar />
		</div>
	</Footer>
</div>

<style>
	.page {
		transition: all 0.3s;
		padding-top: env(safe-area-inset-top);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
