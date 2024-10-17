<script lang="ts">
	import { CapacitorCalendar } from "@ebarooni/capacitor-calendar";
	import { onMount } from "svelte";
	import { date, events, type DateInfo } from "$lib/stores/todayStore";

	interface EventItem {
		id: string;
		title: string;
		desc: string;
		startDate: number;
		endDate: number;
	}

	async function loadCalendarEvents() {
		try {
			console.log("loadCalendarEvent");
			console.log($date.startDateUnix);
			console.log($date.endDateUnix);
			const { result } = await CapacitorCalendar.listEventsInRange({
				startDate: $date.startDateUnix,
				endDate: $date.endDateUnix,
			});

			if (!result) {
				return;
			}

			events.update(() => {
				return [];
			});

			result.forEach((event) => {
				let newEventItem: EventItem = {
					id: event.id,
					title: event.title ?? "unknown",
					desc: event.description ?? "unknown",
					startDate: event.startDate ?? -1,
					endDate: event.endDate ?? -1,
				};

				events.update((items: EventItem[]) => [...items, newEventItem]);
			});
		} catch (e) {
			console.error("Failed to load calendar events: ", e);
		}
	}

	onMount(async () => {
		await CapacitorCalendar.requestFullCalendarAccess();
		await CapacitorCalendar.getDefaultCalendar();
	});

	$: if ($date) {
		loadCalendarEvents();
	}
</script>

<div class="mt-2 mb-2">
	{#each $events as event}
		<div
			class="flex flex-row pl-2 justify-between items-center gap-2 w-full h-[34px]"
		>
			<div
				class="eventTitle text-[16px]"
				on:pointerdown={(e) => {
					e.preventDefault();
				}}
			>
				
				{event.title}
			</div>
			<div class="items-center pr-2 justify-end text-[16px]">
				{#if event.startDate > 0}
					{new Date(event.startDate).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
					})}
				{/if}
				{#if event.endDate > 0}
					{"- " +
						new Date(event.endDate).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
							hour12: false,
						})}
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.eventTitle {
		text-overflow: ellipsis;
		overflow: hidden;
		width: 140px;
		white-space: nowrap;
	}
</style>
