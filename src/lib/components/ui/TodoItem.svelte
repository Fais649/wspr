<script lang="ts">
	import { Input } from "$lib/components/ui/input/index";
	import { type TodoItem } from "$lib/types/index";
	import { createEventDispatcher, onMount, tick } from "svelte";

	export let todo: TodoItem;
	const dispatch = createEventDispatcher<{ delete: { id: number } }>();

	onMount(() => {
		setTimeout(() => {
			const input = document.querySelector(".todo-input") as HTMLElement;
			if (input) {
				input.focus();
				input.scrollIntoView();
			}
		}, 30);
	});

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
			if (input) {
				input.focus();
				input.scrollIntoView();
			}
		}, 10);
	}
</script>

<div class="mt-0 flex flex-row pl-2 gap-2 w-full h-[28px]">
	<div class="flex-row flex justify-start">
		<button
			class="text-[16px] pr-2"
			on:click={(e) => {
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
		</button>
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
			<button
				class="eventTitle text-left text-[16px] {todo.completed
					? 'line-through'
					: ''}"
				on:click={() => {
					handleTextClick();
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
