<script lang="ts">
	import { CapacitorCalendar } from "@ebarooni/capacitor-calendar";
	import { type EventItem } from "$lib/types/index";
	import { date, events } from "$lib/stores/todayStore";
	import { onMount } from "svelte";
	import { getLocalTimeZone } from "@internationalized/date";

	let start: number;
	let end: number;

	date.subscribe((value) => {
		start = value.toDate(getLocalTimeZone()).setHours(0, 0, 0, 0);
		end = value.toDate(getLocalTimeZone()).setHours(23, 59, 59, 99);
	});

	onMount(async () => {
		await CapacitorCalendar.requestAllPermissions();
		await CapacitorCalendar.getDefaultCalendar();
		const { result } = await CapacitorCalendar.listEventsInRange({
			startDate: start,
			endDate: end,
		});
		result.forEach((event) => {
			let newEventItem: EventItem = {
				id: event.id,
				title: event.title ?? "unknown",
				desc: event.description ?? "unknown",
				start: event.startDate ?? -1,
				end: event.endDate ?? -1,
			};

			events.update((items: EventItem[]) => [...items, newEventItem]);
		});
	});

	function handleBlur() {}

	function handleTextClick() {}
</script>

<div class="flex h-[30px] w-full flex-row justify-center p-3 text-center">
	<div
		class="flex w-[40px]"
		on:pointerdown={(e) => {
			e.preventDefault();
		}}
	>
		[ ]
	</div>
	<div
		class="flex h-[28px] w-full items-center pl-2 text-left align-middle
			text-[14px]"
		on:pointerdown={() => {
			handleTextClick();
		}}
	></div>
</div>
