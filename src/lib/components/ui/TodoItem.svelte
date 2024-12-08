<script lang="ts">
  import { Input } from "$lib/components/ui/input/index";
  import {
    ElementType,
    emitSimpleEvent,
    EventType,
  } from "$lib/stores/eventStore";
  import { type TodoItem } from "$lib/types/index";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { swipe } from "svelte-gestures";
  import { reloadWidget } from "$lib/services/widget";
  import type { PaneGroupAPI } from "paneforge";
  import { saveTodayInfoFile } from "$lib/services/filesystem";
  import { date } from "$lib/stores/todayStore";

  interface Props {
    todo: TodoItem;
    paneGroup: PaneGroupAPI;
    portrait: boolean;
  }

  let { todo = $bindable(), paneGroup, portrait }: Props = $props();

  const dispatch = createEventDispatcher<{ delete: { id: number } }>();

  onMount(async () => {
    handleFocus();
    await reloadWidget();
  });

  onDestroy(async () => {
    await reloadWidget();
  });

  function handleFocus() {
    let input = document.querySelector(".todo-input") as HTMLElement;
    if (input) {
      input.focus();
      setTimeout(() => {
        input.scrollIntoView();
      }, 2);
    }
  }

  function handleBlur() {
    if (todo.text.trim().length === 0) {
      dispatch("delete", { id: todo.id });
    } else {
      todo.editing = false;
      saveTodayInfoFile($date.dateString);
    }

    reloadWidget();
  }

  function triggerEditTodoItemEvent() {
    emitSimpleEvent(EventType.editTodoItem, {
      targetId: todo.id.toString(),
      elementType: ElementType.todoItem,
    });
    todo.editing = true;
    setTimeout(() => {
      handleFocus();
    }, 1);
  }

  function toggleCompleteTodoItem() {
    todo.completed = !todo.completed;
  }

  function handleSwipe(event): void {
    if (
      event.detail.direction === "left" ||
      event.detail.direction === "right"
    ) {
      dispatch("delete", { id: todo.id });
    }
  }
</script>

<div
  id={todo.id.toString()}
  data-type="todoItem"
  class="flex mt-2 flex-row gap-2 w-full h-[28px]"
>
  <div class="pl-2 flex-row w-full flex justify-start mr-8">
    <button
      style={todo.completed ? "color: grey;" : ""}
      class="min-w-3 text-[15px] mr-3"
      use:swipe
      onswipe={handleSwipe}
      onclick={(e) => {
        e.preventDefault();
        if (!todo.editing) {
          toggleCompleteTodoItem();
        }
      }}
    >
      {#if todo.completed}
        {""}
      {:else}
        {""}
      {/if}
    </button>
    {#if todo.editing}
      <Input
        class="todo-input pl-2 rounded-2xl text-[13px] w-full h-[28px]"
        placeholder=">..."
        on:focus={() => {
          paneGroup.setLayout([100, 0]);
          handleFocus();
        }}
        on:blur={() => {
          paneGroup.setLayout(portrait ? [80, 20] : [50, 50]);
          handleBlur();
        }}
        bind:value={todo.text}
      />
    {:else}
      <button
        style={todo.completed ? "color: grey;" : ""}
        class="eventTitle text-left w-[50%] text-[13px] {todo.completed
          ? 'line-through'
          : ''}"
        onclick={() => {
          if (!todo.completed) {
            triggerEditTodoItemEvent();
          }
        }}
      >
        {todo.text}
      </button>
    {/if}
  </div>
</div>

<style>
  .eventTitle {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 250px;
  }
</style>
