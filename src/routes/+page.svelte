<script lang="ts">
	import { Footer } from "$lib/components/ui/card";
	import DatePicker from "$lib/components/ui/DatePicker.svelte";
	import TextAreaWLabel from "$lib/components/ui/TextAreaWLabel.svelte";
	import TodoList from "$lib/components/ui/TodoList.svelte";
	import "capacitor-plugin-safe-area";
	import { device, type DeviceInfo } from "$lib/stores/deviceStore";

	let deviceInfo: DeviceInfo;
	device.subscribe((data) => {
		deviceInfo = data;
		console.log(data);
		console.log(deviceInfo);
	});

	$: containerHeight = deviceInfo !== undefined ? deviceInfo.heightPx : 800;
	$: containerWidth = deviceInfo !== undefined ? deviceInfo.widthPx : 800;
	$: flexDirection = containerWidth > 800 ? "flex-row" : "flex-col";
	$: separatorStyle =
		flexDirection === "flex-row" ? "width: 20px;" : "height: 20px;";

	function handleChangeDate(e: CustomEvent) {
		console.log("oldDate");
		console.log(e.detail.prevDateValue);
		console.log("date");
		console.log(e.detail.dateValue);
	}
</script>

<div
	style="height: {containerHeight}px;"
	class="page top-1 fixed overflow-hidden flex flex-col w-full items-center
	justify-start p-5"
>
	<div class="flex {flexDirection}">
		<div class="m-4">
			<TodoList />
		</div>

		<div class="m-4">
			<TextAreaWLabel />
		</div>
		<div class="flex flex-row w-full justify-center">
			<div
				class="border-2 border-dashed h-6 rounded-2xl aspect-square m-4"
			></div>
			<div
				class="border-2 border-dashed h-6 rounded-2xl aspect-square m-4"
			></div>
			<div
				class="border-2 border-dashed h-6 rounded-2xl aspect-square m-4"
			></div>
			<div
				class="border-2 border-dashed h-6 rounded-2xl aspect-square m-4"
			></div>
		</div>
	</div>
	<Footer class="absolute bottom-0 z-50">
		<div class="bg-black">
			<div
				id="logo"
				class="absolute bottom-[-23%] items-center justify-center left-[47%] text-3xl"
			>
				⠋
			</div>
			<DatePicker on:changeDate={handleChangeDate} />
		</div>
	</Footer>
</div>

<style>
	.page {
		transition: all 0.3s;
	}
</style>
