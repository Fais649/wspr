<script lang="ts">
	import {
		SortableItem,
		SortableList,
		IconHandle,
		type SortableItemData,
		type SortEventDetail,
	} from "@rodrigodagostino/svelte-sortable-list";

	import { swipe, type SwipeCustomEvent } from "svelte-gestures";
	import Sortable from "./Sortable.svelte";

	let items: Item[] = $state([]);
	let direction = $state("");
	let target;
	let pointerType;

	interface Child extends SortableItemData {
		title: string;
		edit: boolean;
	}

	interface Item extends SortableItemData {
		title: string;
		edit: boolean;
		children: Child[];
	}

	function handleSort(event: CustomEvent<SortEventDetail>) {
		const { prevItemIndex, nextItemIndex } = event.detail;
		items = sortItems(items, prevItemIndex, nextItemIndex);
	}

	function sortItems(items: Item[], from: number, to: number) {
		const clone = items.slice(); // Shallow copy of the array
		clone.splice(
			to < 0 ? clone.length + to : to,
			0,
			clone.splice(from, 1)[0],
		);
		return clone;
	}

	function addItem() {
		const item: Item = {
			id: "list-item-" + (items.length + 1),
			text: "list-item-" + (items.length + 1),
			title: "list-item-" + (items.length + 1),
			edit: true,
			children: [],
		};

		items = [...items, item];
	}

	function addChild(item: Item) {
		const child: Child = {
			id:
				"list-item-" +
				(items.length + 1) +
				"-" +
				(item.children.length + 1),
			text: "list-item-" + (item.children.length + 1),
			title: "list-item-" + (item.children.length + 1),
			edit: true,
		};

		item.children = [...item.children, child];
	}

	function toggleEdit(item: Item) {
		item.edit = !item.edit;
	}

	function toggleDone(item: Item) {
		console.log("done");
		item.text = item.text + "done";
	}

	function focus(el) {
		el.focus();
	}

	function handler(event: SwipeCustomEvent, item: Item) {
		direction = event.detail.direction ?? "";
		target = event.detail.target;
		pointerType = event.detail.pointerType;

		if (direction === "left") {
			console.log("splice");
			const index = items.indexOf(item);
			console.log(index);
			if (index > -1) {
				items.splice(index, 1);
			}
		}
	}
</script>

<button onclick={addItem}>+++</button>
<SortableList on:sort={handleSort}>
	{#each items as item, index (item.id)}
		<SortableItem id={item.id} {index}>
			<div
				use:swipe={{ timeframe: 300, minSwipeDistance: 60 }}
				onswipe={(e) => {
					handler(e, item);
				}}
				class="flex items-center flex-row w-full h-10 gap-2"
			>
				{direction}
				<div class="w-1/5 flex overflow-clip flex-row border-2 rounded-xl">
					<div
						class="w-10 bg-white text-black p-3 flex items-center justify-center h-10"
					>
						<IconHandle />
					</div>
					<button
						class="w-10 bg-black h-10"
						onclick={() => toggleDone(item)}>x</button
					>
				</div>
				{#if item.edit}
					<input
						class="bg-black text-white w-full h-10"
						onblur={() => toggleEdit(item)}
						bind:value={item.text}
						use:focus
					/>
				{:else}
					<button
						onclick={(e) => {
							e.preventDefault();
							toggleEdit(item);
						}}
						class="bg-black text-white w-full h-10 text-ellipsis truncate overflow-x-hidden"
					>
						{item.text}
					</button>
				{/if}
				<button
					onclick={() => {
						addChild(item);
					}}>+++</button
				>
			</div>

			<div class="ml-10">
				<Sortable items={item.children} />
			</div>
		</SortableItem>
	{/each}
</SortableList>
