<script lang="ts">
	import {
		SortableItem,
		SortableList,
		IconHandle,
		type SortableItemData,
		type SortEventDetail,
	} from "@rodrigodagostino/svelte-sortable-list";

	import { swipe, type SwipeCustomEvent } from "svelte-gestures";
	let direction = $state("");
	let target;
	let pointerType;

	interface Child extends SortableItemData {
		title: string;
		edit: boolean;
	}

	interface Props {
		items: Child[];
	}

	let { items = $bindable([]) }: Props = $props();

	function handleSort(event: CustomEvent<SortEventDetail>) {
		const { prevItemIndex, nextItemIndex } = event.detail;
		items = sortItems(items, prevItemIndex, nextItemIndex);
	}

	function sortItems(items: Child[], from: number, to: number) {
		const clone = items.slice(); // Shallow copy of the array
		clone.splice(
			to < 0 ? clone.length + to : to,
			0,
			clone.splice(from, 1)[0],
		);
		return clone;
	}

	function toggleEdit(item: Child) {
		item.edit = !item.edit;
	}

	function toggleDone(item: Child) {
		console.log("done");
		item.text = item.text + "done";
	}

	function focus(el) {
		el.focus();
	}

	function handler(event: SwipeCustomEvent, item: Child) {
		direction = event.detail.direction ?? "";
		target = event.detail.target;
		pointerType = event.detail.pointerType;

		if (direction === "left") {
			console.log("splice");
			const index = items.indexOf(item);
			console.log(index);
			if (index > -1) {
				items.splice(index, 1);
				//items = items; // Reassign to trigger reactivity
			}
		}
	}
</script>

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
			</div>
		</SortableItem>
	{/each}
</SortableList>
