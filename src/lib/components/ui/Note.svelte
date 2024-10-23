<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { device, type DeviceInfo } from "$lib/stores/deviceStore";
  import { note } from "$lib/stores/todayStore";
  import {
    ElementType,
    emitSimpleEvent,
    EventType,
  } from "$lib/stores/eventStore";

  export let isFocused: boolean = false;

  let deviceInfoLocal: DeviceInfo;
  device.subscribe((data) => {
    deviceInfoLocal = data;
  });
</script>

<div id="note" data-type="note" class="wrapper">
  <div class="h-full">
    <Label class="pl-1 pt-1">note;</Label>
    <Textarea
      class="h-[82%] focus-visible:ring-0 rounded-b-2xl"
      on:click={() => {
        isFocused = true;
        emitSimpleEvent(EventType.focusOn, {
          targetId: "",
          elementType: ElementType.note,
        });
      }}
      on:blur={() => {
        isFocused = false;
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
