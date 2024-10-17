<script lang="ts">
	import { type DateValue } from "@internationalized/date";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { date } from "$lib/stores/todayStore";

	let isFocused = false;

	const steps = [
		{ value: -7, label: "󰇙󰇙" },
		{ value: -3, label: "󰇙" },
		{ value: -1, label: "" },
		{ value: 0, label: "" },
		{ value: 1, label: "" },
		{ value: 3, label: "󰇙" },
		{ value: 7, label: "󰇙󰇙" },
	];

	let dateValue: DateValue | undefined = undefined;
	function decrementDate() {
		date.stepDateByDays(-1);
		dateValue = $date.date;
	}

	function incrementDate() {
		date.stepDateByDays(1);
		dateValue = $date.date;
	}

	function changeDateBy(days: number) {
		date.stepDateByDays(days);
		dateValue = $date.date;
	}

	$: if (dateValue) {
		date.setDate(dateValue);
	}
</script>

<div
	class=" {isFocused
		? ''
		: 'txt-shadow '} flex w-fit scale-[80%] flex-row items-center justify-center overflow-hidden rounded-2xl border-[1px] border-dotted"
>
	<Button variant="ghost" on:click={decrementDate} class="text-center "
		></Button
	>
	<Popover.Root openFocus>
		<Popover.Trigger asChild let:builder>
			<Button variant="ghost" builders={[builder]}>
				{$date.dayOfWeek + " : " + $date.dateString}
			</Button>
		</Popover.Trigger>
		<Popover.Content
			class="flex flex-col overflow-clip rounded-xl border-[1px] border-dotted p-0"
		>
			<div class="rounded-md border-0">
				<div>
					<Calendar class="border-0" bind:value={dateValue} />
				</div>
				<div class="flex flex-row">
					{#each steps as item}
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
