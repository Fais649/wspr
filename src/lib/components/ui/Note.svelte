<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { date, note } from "$lib/stores/todayStore";
  import type { PaneGroupAPI } from "paneforge";
  import { saveTodayInfoFile } from "$lib/services/filesystem";

  export let portrait: boolean;

  export let paneGroup: PaneGroupAPI;
  export let isFocused: boolean = false;
</script>

<div id="note" data-type="note" class="wrapper">
  <div
    class="mx-auto rounded-lg shadow-lg relative
    after:content-[''] after:absolute after:inset-x-0 after:bottom-[-5%]
    after:h-8
    after:bg-gradient-to-b after:from-transparent after:to-black h-full"
  >
    <Label class="pl-1 pt-1">note;</Label>
    <Textarea
      class="w-full h-full focus-visible:ring-0 rounded-b-2xl"
      on:click={() => {
        isFocused = true;
        paneGroup.setLayout([0, 100]);
      }}
      on:blur={() => {
        isFocused = false;
        paneGroup.setLayout(portrait ? [80, 20] : [50, 50]);
        saveTodayInfoFile($date.dateString);
      }}
      placeholder=">..."
      id="textarea"
      bind:value={$note}
    />
  </div>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    padding: 2px;
  }
</style>
