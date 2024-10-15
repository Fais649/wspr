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

<div class="flex h-[30px] w-full flex-row justify-center p-3 text-center">
	<div
		class="flex w-[40px]"
		on:pointerdown={(e) => {
			e.preventDefault();
			if (!todo.editing) {
				todo.completed = !todo.completed;
			}
		}}
	>
		{#if todo.completed}
			[x]
		{:else}
			[ ]
		{/if}
	</div>
	{#if todo.editing}
		<Input
			placeholder=">..."
			class="todo-input h-[28px] w-full rounded-xl border-[1px] border-dotted
			pl-2 pr-2 text-[14px] ring-0"
			on:blur={() => {
				handleBlur();
			}}
			bind:value={todo.text}
		/>
	{:else}
		<div
			class="flex h-[28px] w-full items-center pl-2 text-left align-middle
			text-[14px] {todo.completed ? 'line-through' : ''}"
			on:pointerdown={() => {
				handleTextClick();
			}}
		>
			{todo.text}
		</div>
	{/if}
</div>
