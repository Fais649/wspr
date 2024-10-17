<script lang="ts">
	import Label from "./label/label.svelte";
	import TodoItemComp from "$lib/components/ui/TodoItem.svelte";
	import { type TodoItem } from "$lib/types/index";
	import { events, todos } from "$lib/stores/todayStore";
	import CalendarEvents from "./CalendarEvents.svelte";

	let todoItemId: number = 1;

	function handlePointerDown(e: Event) {
		if (e.currentTarget !== e.target) {
			return;
		}

		const input = document.querySelector(".todo-input") as HTMLElement | null;
		if (input && document.activeElement !== input) {
			input.focus();
			input.scrollIntoView();
			return;
		}

		if ($todos.length === 0 || !$todos[$todos.length - 1].editing) {
			addTodo("", false, true);
		}
	}

	function addTodo(text: string, completed: boolean, editing: boolean) {
		const newTodo: TodoItem = {
			id: todoItemId++,
			text: text,
			completed: completed,
			editing: editing,
		};

		todos.update((items: TodoItem[]) => [...items, newTodo]);
	}

	function handleDelete(event: CustomEvent) {
		const idToDelete = event.detail.id;
		todos.update((items) => items.filter((item) => item.id !== idToDelete));
	}
</script>

<div class="wrapper">
	<div style="box-shadow: -2px 2px;" class="todo-component rounded-xl">
		<Label
			class="pl-2 box h-[40px] flex  items-center text-left border-b-white
		border-dotted border-b-[1px]">todo;</Label
		>
		<div
			class="h-full pb-8 w-full resize-none overflow-scroll"
			on:pointerup={(e) => {
				e.preventDefault();
				handlePointerDown(e);
			}}
		>
			<CalendarEvents />
			{#if $events.length > 0}
				<div class="border-white border-[1px] border-solid w-[3%] mb-3" />
			{/if}
			{#each $todos as todo (todo.id)}
				<TodoItemComp {todo} on:delete={handleDelete} />
			{/each}
		</div>
	</div>
</div>

<style>
	.wrapper {
		width: 300px;
		height: 300px;
		padding: 2px;
	}

	.todo-component {
		position: relative;
		box-shadow: -2px 2px;
		border: 1px dotted white;
		background-color: black;
		padding: 2px;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		z-index: 10;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}
</style>
