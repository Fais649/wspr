<script lang="ts">
  import { type DateValue } from "@internationalized/date";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import { date, todos } from "$lib/stores/todayStore";
  import {
    ElementType,
    emitSimpleEvent,
    EventType,
  } from "$lib/stores/eventStore";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { onDestroy, onMount } from "svelte";
  import { Keyboard } from "@capacitor/keyboard";
  import type { PluginListenerHandle } from "@capacitor/core";
  import {
    loadTodayInfoFile,
    saveTodayInfoFile,
  } from "$lib/services/filesystem";

  let kbOut: boolean = false;
  let keyboardShowHandle: PluginListenerHandle;
  let keyboardHideHandle: PluginListenerHandle;
  let indented: boolean = false;

  onMount(async () => {
    keyboardShowHandle = await Keyboard.addListener("keyboardWillShow", () => {
      kbOut = true;
    });
    keyboardHideHandle = await Keyboard.addListener("keyboardWillHide", () => {
      kbOut = false;
    });
  });

  onDestroy(() => {
    keyboardShowHandle.remove();
    keyboardHideHandle.remove();
  });

  const steps = [
    { value: -7, label: "󰇙󰇙" },
    { value: -3, label: "󰇙" },
    { value: -1, label: "" },
    { value: 0, label: "" },
    { value: 1, label: "" },
    { value: 3, label: "s󰇙" },
    { value: 7, label: "󰇙󰇙" },
  ];

  let dateValue: DateValue | undefined = undefined;

  function changeDateBy(days: number) {
    saveTodayInfoFile($date.dateString);
    date.stepDateByDays(days);
    loadTodayInfoFile($date.dateString);
    dateValue = $date.date;
  }

  $: if (dateValue && dateValue !== $date.date) {
    date.setDate(dateValue);
    loadTodayInfoFile($date.dateString);
  }

  function triggerAddTodoItemEvent() {
    let noEdit = true;

    $todos.forEach((todo) => {
      if (todo.editing) {
        console.log(todo.id.toString());
        emitSimpleEvent(EventType.addTodoItem, {
          targetId: todo.id.toString(),
          elementType: ElementType.todoItem,
        });
        setTimeout(() => {
          indented = todo.indentNumber > 0;
        }, 3);
        noEdit = false;
      }
    });

    if (noEdit) {
      emitSimpleEvent(EventType.addTodoItem);
    }
  }

  function triggerIndentTodoItemEvent() {
    $todos.forEach((todo) => {
      if (todo.editing) {
        emitSimpleEvent(EventType.indentTodoItem, {
          targetId: todo.id.toString(),
          elementType: ElementType.todoItem,
        });
        setTimeout(() => {
          indented = todo.indentNumber > 0;
        }, 3);
      }
    });
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
    <Drawer.Root>
      <Drawer.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline">
          {$date.dayOfWeek + " : " + $date.dateString}
        </Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <div class="mx-auto w-full max-w-sm">
          <Drawer.Header>
            <Drawer.Title>
              {$date.dayOfWeek + " : " + $date.dateString}
            </Drawer.Title>
          </Drawer.Header>
        </div>
        <div class="rounded-md border-0">
          <div>
            <Calendar class="border-0" bind:value={dateValue} />
          </div>
          <div class="flex flex-row">
            {#each steps as item}
              <Button
                variant="ghost"
                class="w-[14%]"
                on:click={() => changeDateBy(item.value)}>{item.label}</Button
              >
            {/each}
          </div>
        </div>
        <Drawer.Footer></Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>

    <Button
      variant="ghost"
      class="text-center"
      on:click={() => {
        changeDateBy(1);
      }}></Button
    >
  </div>

  {#if kbOut}
    <div
      class="border-t-[1px] border-dotted h-10 w-full justify-center flex flex-row items-center"
    >
      <Button
        on:click={() => {
          emitSimpleEvent(EventType.addCalendarEventItem);
        }}
        variant="ghost"
        class="text-center text-xl"></Button
      >

      <Button
        variant="ghost"
        class="text-center text-2xl"
        on:click={() => {
          triggerAddTodoItemEvent();
        }}>+</Button
      >

      <Button
        variant="ghost"
        class="text-center text-lg"
        on:click={() => {
          triggerIndentTodoItemEvent();
        }}>{indented ? "󰌥" : "󰌒"}</Button
      >
    </div>
  {:else}
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
      <Button variant="ghost" class="text-center text-xl"></Button>
    </div>
  {/if}
</div>
