<script lang="ts">
  import Label from "./label/label.svelte";
  import TodoItemComponent from "$lib/components/ui/TodoItem.svelte";
  import { type EventItem, type TodoItem } from "$lib/types/index";
  import { todos, events, date } from "$lib/stores/todayStore";
  import CalendarEventItem from "$lib/components/ui/CalendarEventItem.svelte";
  import { onMount } from "svelte";
  import {
    EventType,
    type SimpleEvent,
    simpleEvent,
  } from "$lib/stores/eventStore";
  import { CapacitorCalendar } from "@ebarooni/capacitor-calendar";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { reloadWidget } from "$lib/services/widget";
  import { loadTodayInfoFile } from "$lib/services/filesystem";
  import type { PaneGroupAPI } from "paneforge";

  export let paneGroup: PaneGroupAPI;
  export let portrait: boolean;

  onMount(async () => {
    await CapacitorCalendar.requestFullCalendarAccess();
    await CapacitorCalendar.getDefaultCalendar();
    await loadTodayInfoFile($date.dateString);
    await loadCalendarEvents();
    await reloadWidget();
  });

  $: if ($simpleEvent) {
    (async () => {
      switch ($simpleEvent.eventType) {
        case EventType.addTodoItem:
          await addTodoItemEvent($simpleEvent);
          break;
        case EventType.addCalendarEventItem:
          await addCalendarEvent($simpleEvent);
          break;
        case EventType.editCalendarEventItem:
          await editCalendarEvent($simpleEvent);
          break;
        default:
          break;
      }
      simpleEvent.clear();
    })();
  }

  async function addCalendarEvent(event: SimpleEvent) {
    await CapacitorCalendar.createEventWithPrompt({
      title: "",
      startDate: $date.startDateUnix,
      endDate: $date.endDateUnix,
    });
    await loadCalendarEvents();
  }

  async function editCalendarEvent(event: SimpleEvent) {
    if (!event.detail) {
      return;
    }

    await CapacitorCalendar.modifyEventWithPrompt({
      id: event.detail.targetId,
    });
    await loadCalendarEvents();
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

  async function addTodoItemEvent(event: SimpleEvent) {
    let newId: number = $todos.length;

    let input = document.querySelector(".todo-input") as HTMLElement | null;
    if (document.activeElement === input) {
      if (input?.value.length > 0) {
        input?.blur();
      } else {
        input?.focus();
        return;
      }
    }

    const newTodo: TodoItem = {
      id: newId,
      text: "",
      completed: false,
      editing: true,
      isChild: false,
    };

    todos.update((items: TodoItem[]) => [...items, newTodo]);
  }

  function deleteTodoItem(event: CustomEvent) {
    const idToDelete = event.detail.id;
    todos.update((items) => items.filter((item) => item.id !== idToDelete));
  }

  date.subscribe((date) => {
    loadTodayInfoFile(date.dateString);
    loadCalendarEvents();
  });
</script>

<div id="itemList" data-type="itemList" class="wrapper">
  <Label class="pl-1 h-[40px] mb-2 relative top-0">items;</Label>
  <ScrollArea scrollbarYClasses="w-[5px]" class="pt-2 h-[80%] overflow-scroll">
    {#each $events as event}
      <div class="pl-[7px]">
        <CalendarEventItem {event} />
      </div>
    {/each}

    {#each $todos as todo (todo.id)}
      <div class="">
        {#if !todo.completed}
          <TodoItemComponent
            {portrait}
            {paneGroup}
            {todo}
            on:delete={deleteTodoItem}
          />
        {/if}
      </div>
    {/each}

    {#each $todos as todo (todo.id)}
      <div class="">
        {#if todo.completed}
          <TodoItemComponent
            {portrait}
            {paneGroup}
            {todo}
            on:delete={deleteTodoItem}
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
