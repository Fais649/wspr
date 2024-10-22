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
  import { device, type DeviceInfo } from "$lib/stores/deviceStore";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

  let deviceInfo: DeviceInfo;
  device.subscribe((data) => {
    deviceInfo = data;
  });

  onMount(async () => {
    await CapacitorCalendar.requestFullCalendarAccess();
    await CapacitorCalendar.getDefaultCalendar();
    await loadCalendarEvents();
  });

  $: if ($simpleEvent) {
    (async () => {
      console.log("itemList");
      switch ($simpleEvent.eventType) {
        case EventType.addTodoItem:
          await addTodoEvent($simpleEvent);
          break;
        case EventType.addCalendarEventItem:
          await addCalendarEvent($simpleEvent);
          break;
        case EventType.editCalendarEventItem:
          await editCalendarEvent($simpleEvent);
          break;
        case EventType.indentTodoItem:
          await indentTodoItem($simpleEvent);
          break;
        case EventType.focusOn:
          break;
      }
    })();
  }

  async function indentTodoItem(event: SimpleEvent) {
    if (!event.detail || Number(event.detail.targetId) === 0) {
      return;
    }

    let targetId: number = Number(event.detail.targetId);

    $todos[targetId].indentNumber = $todos[targetId].indentNumber > 0 ? 0 : 1;
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
    console.log("modifyEvent Handler");
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
  }

  async function addTodoEvent(event: SimpleEvent) {
    createNewTodoItem(event);
  }

  function createNewTodoItem(event: SimpleEvent) {
    let newId: number;
    if (event.detail) {
      newId = Number(event.detail.targetId) + 1;
    } else {
      newId = $todos.length;
    }

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
      indentNumber: 0,
    };

    if ($todos.length > 0) {
      newTodo.indentNumber = $todos[newId - 1].indentNumber;
    }

    if ($todos.length === newId) {
      todos.update((items: TodoItem[]) => [...items, newTodo]);
      return;
    }

    todos.update((items: TodoItem[]) => {
      const newItems = [
        ...items.slice(0, newId),
        { ...newTodo, id: newId },
        ...items.slice(newId).map((item) => ({
          ...item,
          id: item.id + 1, // Shift the id of items after newId
        })),
      ];
      return newItems;
    });
  }

  function deleteTodoItem(event: CustomEvent) {
    const idToDelete = event.detail.id;
    todos.update((items) => items.filter((item) => item.id !== idToDelete));
  }

  date.subscribe((date) => {
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
        <TodoItemComponent {todo} on:delete={deleteTodoItem} />
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
