<script lang="ts">
  import { Input, type InputEvents } from "$lib/components/ui/input/index";
  import { type SwipeCustomEvent, swipe } from "svelte-gestures";
  import {
    ElementType,
    emitSimpleEvent,
    EventType,
  } from "$lib/stores/eventStore";
  import { type TodoItem } from "$lib/types/index";
  import type { PluginListenerHandle } from "@capacitor/core";
  import { Keyboard } from "@capacitor/keyboard";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { todos } from "$lib/stores/todayStore";

  export let todo: TodoItem;
  let keyboardHandler: PluginListenerHandle;
  const dispatch = createEventDispatcher<{ delete: { id: number } }>();

  onMount(async () => {
    focusActiveItem();
    keyboardHandler = await Keyboard.addListener("keyboardDidShow", () => {});
  });

  onDestroy(() => {
    keyboardHandler.remove();
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
    todos.update((items) => items.filter((item) => item.id !== todo.id));

    if (todo.completed) {
      todos.update((items: TodoItem[]) => [...items, todo]);
      return;
    }

    todos.update((items: TodoItem[]) => [todo, ...items]);
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === "Escape") {
      (e.target as HTMLElement).blur();
    }
    if (e.key === "Enter") {
      if (todo.editing) {
        emitSimpleEvent(EventType.addTodoItem, {
          targetId: todo.id.toString(),
          elementType: ElementType.todoItem,
        });
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();
      todo.indentNumber = todo.indentNumber > 0 ? 0 : 1;
      (e.target as HTMLElement).focus();
    }
  }
</script>

<div
  id={todo.id.toString()}
  data-type="todoItem"
  class="flex mt-2 flex-row gap-2 w-full select-all h-[28px]"
>
  <div
    class="{todo.indentNumber >= 1
      ? 'pl-7'
      : 'pl-2'} flex-row w-full select-all flex justify-start mr-8"
  >
    <button
      class="min-w-3 text-[15px] mr-3"
      on:click={(e) => {
        e.preventDefault();
        if (!todo.editing) {
          toggleCompleteTodoItem();
        }
      }}
    >
      {#if todo.completed}
        
      {:else}
        {todo.indentNumber >= 1 ? "" : ""}
      {/if}
    </button>
    {#if todo.editing}
      <Input
        class="todo-input select-all pl-2 rounded-2xl text-[13px] w-full h-[28px]"
        placeholder=">..."
        on:blur={handleBlur}
        on:keydown={handleKeyDown}
        bind:value={todo.text}
      />
    {:else}
      <button
        class="eventTitle text-left select-all text-[13px] {todo.completed
          ? 'line-through'
          : ''}"
        on:click={triggerEditTodoItemEvent}
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
