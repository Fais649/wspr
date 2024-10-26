<script lang="ts">
  import { type DateValue } from "@internationalized/date";
  import { Button } from "$lib/components/ui/button/index.js";
  import { date, events } from "$lib/stores/todayStore";
  import { emitSimpleEvent, EventType } from "$lib/stores/eventStore";
  import {
    loadTodayInfoFile,
    saveTodayInfoFile,
  } from "$lib/services/filesystem";
  import { CapacitorCalendar } from "@ebarooni/capacitor-calendar";
  import type { EventItem } from "$lib/types";
  import { reloadWidget } from "$lib/services/widget";
  import DatePicker from "./DatePicker.svelte";

  let dateValue: DateValue | undefined = undefined;

  function changeDateBy(days: number) {
    saveTodayInfoFile($date.dateString);
    date.stepDateByDays(days);
    dateValue = $date.date;
  }

  $: if (dateValue && dateValue !== $date.date) {
    date.setDate(dateValue);
    loadTodayInfoFile($date.dateString);
    loadCalendarEvents();
  }

  async function loadCalendarEvents() {
    try {
      const { result } = await CapacitorCalendar.listEventsInRange({
        startDate: $date.startOfDateUnix,
        endDate: $date.endOfDateUnix,
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

    await reloadWidget();
  }

  function triggerAddTodoItemEvent() {
    emitSimpleEvent(EventType.addTodoItem);
  }
</script>

<div
  id="toolbar"
  on:pointerdown|preventDefault
  class="bg-black border-dotted border-[1px] rounded-3xl flex w-fit scale-[80%] flex-col items-center justify-center
overflow-hidden"
>
  <div class="flex-row flex justify-center items-center overflow-hidden">
    <Button
      variant="ghost"
      on:click={() => {
        changeDateBy(-1);
      }}
      class="text-center "></Button
    >
    <DatePicker {changeDateBy} bind:dateValue />
    <Button
      variant="ghost"
      class="text-center"
      on:click={() => {
        changeDateBy(1);
      }}></Button
    >
  </div>
  <div
    class="border-t-[1px] border-dotted h-10 w-full justify-center flex flex-row items-center"
  >
    <Button
      variant="ghost"
      class="text-center text-xl"
      on:click={() => {
        emitSimpleEvent(EventType.addCalendarEventItem);
      }}>󰃶</Button
    >
    <Button
      on:click={() => {
        triggerAddTodoItemEvent();
      }}
      variant="ghost"
      class="text-center text-xl"></Button
    >
  </div>
</div>
