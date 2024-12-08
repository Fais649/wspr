<script lang="ts">
  import Label from "./label/label.svelte";
  import TodoItemComponent from "$lib/components/ui/TodoItem.svelte";
  import { type EventItem, type TodoItem } from "$lib/types/index";
  import { date } from "$lib/stores/todayStore";
  import CalendarEventItem from "$lib/components/ui/CalendarEventItem.svelte";
  import { onMount } from "svelte";
  import { CapacitorCalendar } from "@ebarooni/capacitor-calendar";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { reloadWidget } from "$lib/services/widget";
  import { loadTodayInfoFile } from "$lib/services/filesystem";
  import type { PaneGroupAPI } from "paneforge";
  import {
    deleteTodoItem,
    loadCalendarEvents,
    getTodos,
    getEvents,
  } from "$lib/components/ui/Items.svelte";

  interface Props {
    paneGroup: PaneGroupAPI;
    portrait: boolean;
  }

  let { paneGroup, portrait }: Props = $props();

  onMount(async () => {
    await CapacitorCalendar.requestFullCalendarAccess();
    await CapacitorCalendar.getDefaultCalendar();
    await loadTodayInfoFile($date.dateString);
    await loadCalendarEvents();
    await reloadWidget();
  });
</script>

<div id="itemList" data-type="itemList" class="wrapper">
  <Label class="pl-1 h-[40px] mb-2 relative top-0">items;</Label>
  <ScrollArea scrollbarYClasses="w-[5px]" class="pt-2 h-[80%] overflow-scroll">
    {#each getEvents() as event}
      <div class="pl-[7px]">
        <CalendarEventItem {event} />
      </div>
    {/each}

    {#each getTodos() as todo (todo.id)}
      <div class="">
        {#if !todo.completed}
          <TodoItemComponent
            {portrait}
            {paneGroup}
            {todo}
            on:delete={() => deleteTodoItem(todo)}
          />
        {/if}
      </div>
    {/each}

    {#each getTodos() as todo (todo.id)}
      <div class="">
        {#if todo.completed}
          <TodoItemComponent
            {portrait}
            {paneGroup}
            {todo}
            on:delete={() => deleteTodoItem(todo)}
          />
        {/if}
      </div>
    {/each}
  </ScrollArea>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    padding: 2px;
  }
</style>
