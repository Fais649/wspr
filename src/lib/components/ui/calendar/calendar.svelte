<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import * as Calendar from "./index.js";
	import { cn } from "$lib/utils.js";

	type $$Props = CalendarPrimitive.Props;
	type $$Events = CalendarPrimitive.Events;


	interface Props {
		value?: $$Props["value"];
		placeholder?: $$Props["placeholder"];
		weekdayFormat?: $$Props["weekdayFormat"];
		class?: $$Props["class"];
		[key: string]: any
	}

	let {
		value = $bindable(undefined),
		placeholder = $bindable(undefined),
		weekdayFormat = "short",
		class: className = undefined,
		...rest
	}: Props = $props();
	
</script>

<div>
	<CalendarPrimitive.Root
		bind:value
		bind:placeholder
		{weekdayFormat}
		class={cn("p-3", className)}
		{...rest}
		on:keydown
		
		
	>
		{#snippet children({ months, weekdays })}
				<Calendar.Header>
				<Calendar.PrevButton />
				<Calendar.Heading />
				<Calendar.NextButton />
			</Calendar.Header>
			<Calendar.Months>
				{#each months as month}
					<Calendar.Grid>
						<Calendar.GridBody class="w-fit items-center justify-center">
							{#each month.weeks as weekDates}
								<Calendar.GridRow class="mt-2 justify-center">
									{#each weekDates as date}
										<Calendar.Cell {date}>
											<Calendar.Day {date} month={month.value} />
										</Calendar.Cell>
									{/each}
								</Calendar.GridRow>
							{/each}
						</Calendar.GridBody>

						<Calendar.GridHead>
							<Calendar.GridRow class="flex w-full items-center justify-center">
								{#each weekdays as weekday}
									<Calendar.HeadCell>
										{weekday.slice(0, 2)}
									</Calendar.HeadCell>
								{/each}
							</Calendar.GridRow>
						</Calendar.GridHead>
					</Calendar.Grid>
				{/each}
			</Calendar.Months>
					{/snippet}
		</CalendarPrimitive.Root>
</div>

<style>
	:root {
		font-size: 1.2rem;
	}
</style>
