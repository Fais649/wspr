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
	class="page top-0 fixed overflow-hidden flex flex-col w-full items-center
	justify-start p-5"
>
	<div id="logo" class="text-5xl">⠋</div>
	<div class="flex {flexDirection}">
		<div>
			<TodoList />
		</div>

		<div style={separatorStyle} />

		<div>
			<TextAreaWLabel />
		</div>
	</div>

	<Footer class="absolute bottom-0">
		<div>
			<DatePicker on:changeDate={handleChangeDate} />
		</div>
	</Footer>
</div>

<style>
	.page {
		transition: all 0.6s;
	}
</style>
