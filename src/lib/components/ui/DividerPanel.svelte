<script lang="ts">
  import ItemList from "./ItemList.svelte";
  import Note from "./Note.svelte";
  import * as Resizable from "$lib/components/ui/resizable";
  import type { PaneGroupAPI } from "paneforge";
  import { onDestroy, onMount } from "svelte";
  import { Keyboard } from "@capacitor/keyboard";
  import type { PluginListenerHandle } from "@capacitor/core";

  let isPointerDown: boolean = false;
  let focusedItem: boolean = false;
  let vertical: boolean = true;
  let focusedNote: boolean;
  let paneGroup: PaneGroupAPI;

  let keyboardShowHandle: PluginListenerHandle;
  let keyboardHideHandle: PluginListenerHandle;

  onMount(async () => {
    paneGroup.setLayout([70, 30]);
    keyboardShowHandle = await Keyboard.addListener("keyboardWillShow", () => {
      if (focusedNote) {
        paneGroup.setLayout([10, 90]);
        focusedItem = false;
      } else if (document.activeElement) {
        focusedItem = true;
        paneGroup.setLayout([90, 10]);
      }
    });

    keyboardHideHandle = await Keyboard.addListener("keyboardWillHide", () => {
      paneGroup.setLayout([70, 30]);
      focusedItem = false;
      focusedNote = false;
    });
  });

  onDestroy(() => {
    keyboardShowHandle.remove();
    keyboardHideHandle.remove();
  });
</script>

<Resizable.PaneGroup
  class="flex h-full w-full max-w-xs"
  bind:paneGroup
  direction={vertical ? "vertical" : "horizontal"}
>
  <Resizable.Pane
    class="transition-all duration-[0.35s] {focusedNote
      ? 'opacity-10 scale-90'
      : isPointerDown
        ? 'opacity-100 duration-[0.35s]'
        : 'opacity-100 duration-0'}"
    id="topPanel"
  >
    <ItemList />
  </Resizable.Pane>

  <Resizable.Handle
    on:pointerdown={() => {
      isPointerDown = true;
    }}
    on:pointerup={() => {
      isPointerDown = false;
    }}
  />

  <Resizable.Pane
    class="transition-all duration-[0.35s] {focusedItem
      ? 'opacity-10 scale-90'
      : isPointerDown
        ? 'opacity-100 duration-[0.35s]'
        : 'opacity-100 duration-0'}"
    id="bottomPanel"
  >
    <Note bind:isFocused={focusedNote} />
  </Resizable.Pane>
</Resizable.PaneGroup>
