<script lang="ts">
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		today,
	} from "@internationalized/date";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher<{
		changeDate: {
			dateValue: DateValue;
			prevDateValue: DateValue | undefined;
		};
	}>();

	const df = new DateFormatter("de-DE", {
		dateStyle: "medium",
	});

	export let dateString = ""; // The variable you want to bind
	let dateValue: DateValue | undefined = undefined;
	let prevDateValue: DateValue | undefined = undefined;
	let isFocused = false;

	let dayOfWeek = "";

	const formatDate = (date: DateValue) => {
		return df.format(date.toDate(getLocalTimeZone()));
	};

	const dayOfWeekFormatter = new DateFormatter("de-DE", {
		weekday: "short",
	});
	const getDayOfWeek = (date: DateValue) => {
		return dayOfWeekFormatter.format(date.toDate(getLocalTimeZone()));
	};

	$: dateString = dateValue
		? formatDate(dateValue)
		: formatDate(today(getLocalTimeZone()));

	$: dayOfWeek = dateValue
		? getDayOfWeek(dateValue)
		: getDayOfWeek(today(getLocalTimeZone()));

	$: if (dateValue !== prevDateValue && dateValue) {
		dispatch("changeDate", {
			dateValue: dateValue,
			prevDateValue: prevDateValue,
		});
		prevDateValue = dateValue;
	}

	const items = [
		{ value: -7, label: "󰇙󰇙" },
		{ value: -3, label: "󰇙" },
		{ value: -1, label: "" },
		{ value: 0, label: "" },
		{ value: 1, label: "" },
		{ value: 3, label: "󰇙" },
		{ value: 7, label: "󰇙󰇙" },
	];

	function decrementDate() {
		if (!dateValue) {
			dateValue = today(getLocalTimeZone());
		}

		prevDateValue = dateValue;
		dateValue = dateValue.subtract({ days: 1 });
		dispatchChangeDateEvent();
	}

	function incrementDate() {
		if (!dateValue) {
			dateValue = today(getLocalTimeZone());
		}
		prevDateValue = dateValue;
		dateValue = dateValue.add({ days: 1 });
		dispatchChangeDateEvent();
	}

	function changeDateBy(days: number) {
		console.log("changing date");
		console.log(days);

		if (!dateValue || days === 0) {
			dateValue = today(getLocalTimeZone());
		}

		prevDateValue = dateValue;
		dateValue = dateValue.add({ days });
		dispatchChangeDateEvent();
	}

	function dispatchChangeDateEvent() {
		if (dateValue) {
			dispatch("changeDate", {
				dateValue: dateValue,
				prevDateValue: prevDateValue,
			});
		}
	}
</script>

<div
	class=" {isFocused
		? ''
		: 'txt-shadow '} ui mb-4 flex w-fit flex-row items-center justify-center overflow-hidden rounded-2xl border-[1px] border-dotted"
>
	<Button variant="ghost" on:click={decrementDate} class="text-center "
		></Button
	>
	<Popover.Root openFocus>
		<Popover.Trigger asChild let:builder>
			<Button variant="ghost" class="" builders={[builder]}>
				{dayOfWeek + " : " + dateString}
			</Button>
		</Popover.Trigger>
		<Popover.Content
			class="ui flex flex-col overflow-clip rounded-xl border-[1px] border-dotted p-0"
		>
			<div class=" rounded-md border-0">
				<Calendar class=" border-0" bind:value={dateValue} />
				<div class="flex flex-row">
					{#each items as item}
						<Button
							variant="ghost"
							class="w-[14%]"
							on:click={() => changeDateBy(item.value)}
							>{item.label}</Button
						>
					{/each}
				</div>
			</div>
		</Popover.Content>
	</Popover.Root>

	<Button variant="ghost" class="text-center " on:click={incrementDate}
		></Button
	>
</div>

<style>
	.txt-shadow {
		box-shadow: -1px 1px;
	}
</style>
