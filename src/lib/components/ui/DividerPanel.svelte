<script lang="ts">
  import ItemList from "./ItemList.svelte";
  import Note from "./Note.svelte";
  import * as Resizable from "$lib/components/ui/resizable";
  import type { PaneGroupAPI } from "paneforge";
  import { onMount } from "svelte";
  import { ScreenOrientation } from "@capacitor/screen-orientation";

  interface Props {
    portrait?: boolean;
  }

  let { portrait = true }: Props = $props();

  let isPointerDown: boolean = $state(false);
  let focusedItem: boolean = false;
  let focusedNote: boolean = $state(false);
  let paneGroup: PaneGroupAPI;

  onMount(() => {
    paneGroup.setLayout(portrait ? [80, 20] : [50, 50]);

    ScreenOrientation.addListener("screenOrientationChange", (e) => {
      let input = document.querySelector(".todo-input") as HTMLElement | null;
      if (document.activeElement === input) {
        paneGroup.setLayout([100, 0]);
      } else if (focusedNote) {
        paneGroup.setLayout([0, 100]);
      } else {
        paneGroup.setLayout(
          e.type === "portrait-primary" ? [80, 20] : [50, 50],
        );
      }
    });
  });
</script>

<Resizable.PaneGroup
  class="flex h-full w-full max-w-md"
  bind:paneGroup
  direction={portrait ? "vertical" : "horizontal"}
>
  <Resizable.Pane
    class="transition-all duration-[0.35s] {focusedNote
      ? 'opacity-10 scale-90'
      : isPointerDown
        ? 'opacity-100 duration-[0.35s]'
        : 'opacity-100 duration-0'}"
    id="topPanel"
  >
    <ItemList {portrait} {paneGroup} />
  </Resizable.Pane>

  <Resizable.Handle />

  <Resizable.Pane
    class=" transition-all duration-[0.35s] {focusedItem
      ? 'opacity-10 scale-90'
      : isPointerDown
        ? 'opacity-100 duration-[0.35s]'
        : 'opacity-100 duration-0'}"
    id="bottomPanel"
  >
    <Note {portrait} {paneGroup} bind:isFocused={focusedNote} />
  </Resizable.Pane>
</Resizable.PaneGroup>
