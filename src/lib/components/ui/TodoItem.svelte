<script lang="ts">
	import { Input } from "$lib/components/ui/input/index";
	import { type TodoItem } from "$lib/types/index";
	import { createEventDispatcher, onMount, tick } from "svelte";

	export let todo: TodoItem;
	const dispatch = createEventDispatcher<{ delete: { id: number } }>();

	function handleBlur() {
		if (todo.text.trim().length === 0) {
			dispatch("delete", { id: todo.id });
		} else {
			todo.editing = false;
		}
	}

	function handleTextClick() {
		todo.editing = true;
		setTimeout(() => {
			let input = document.querySelector(".todo-input") as HTMLElement;
			input.focus();
		}, 10);
	}
</script>

<div class="mt-0 flex flex-row pl-2 gap-2 w-full h-[28px]">
	<div class="flex-row flex justify-start">
		<div
			class="text-[16px] pr-2"
			on:pointerdown={(e) => {
				e.preventDefault();
				if (!todo.editing) {
					todo.completed = !todo.completed;
				}
			}}
		>
			{#if todo.completed}
				󰄴
			{:else}
				󰄰
			{/if}
		</div>
		{#if todo.editing}
			<Input
				class="todo-input h-[28px]"
				placeholder=">..."
				on:blur={() => {
					handleBlur();
				}}
				bind:value={todo.text}
			/>
		{:else}
			<div
				class="eventTitle text-left text-[16px] {todo.completed
					? 'line-through'
					: ''}"
				on:pointerdown={() => {
					handleTextClick();
				}}
			>
				{todo.text}
			</div>
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
