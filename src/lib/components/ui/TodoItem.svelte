<script lang="ts">
  import { Input } from "$lib/components/ui/input/index";
  import {
    ElementType,
    emitSimpleEvent,
    EventType,
  } from "$lib/stores/eventStore";
  import { type TodoItem } from "$lib/types/index";
  import type { PluginListenerHandle } from "@capacitor/core";
  import { Keyboard } from "@capacitor/keyboard";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { swipe } from "svelte-gestures";
  import { reloadWidget } from "$lib/services/widget";

  export let todo: TodoItem;
  export let isChild: boolean = false;

  let keyboardHandler: PluginListenerHandle;
  const dispatch = createEventDispatcher<{ delete: { id: number } }>();

  onMount(async () => {
    focusActiveItem();
    keyboardHandler = await Keyboard.addListener("keyboardDidShow", () => {});
    await reloadWidget();
  });

  onDestroy(async () => {
    keyboardHandler.remove();
    await reloadWidget();
  });

  function focusActiveItem() {
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
    }
  }

  function triggerEditTodoItemEvent() {
    emitSimpleEvent(EventType.editTodoItem, {
      targetId: todo.id.toString(),
      elementType: ElementType.todoItem,
    });
    todo.editing = true;
    setTimeout(() => {
      focusActiveItem();
    }, 1);
  }

  function toggleCompleteTodoItem() {
    todo.completed = !todo.completed;
  }

  function handleKeyDown(e: KeyboardEvent): void {}

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
      on:swipe={handleSwipe}
      on:click={(e) => {
        e.preventDefault();
        if (!todo.editing) {
          toggleCompleteTodoItem();
        }
      }}
    >
      {#if todo.completed}
        {isChild ? "" : ""}
      {:else}
        {isChild ? "" : ""}
      {/if}
    </button>
    {#if todo.editing}
      <Input
        class="todo-input pl-2 rounded-2xl text-[13px] w-full h-[28px]"
        placeholder=">..."
        on:blur={handleBlur}
        on:keydown={handleKeyDown}
        bind:value={todo.text}
      />
    {:else}
      <button
        style={todo.completed ? "color: grey;" : ""}
        class="eventTitle text-left w-[50%] text-[13px] {todo.completed
          ? 'line-through'
          : ''}"
        on:click={() => {
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
