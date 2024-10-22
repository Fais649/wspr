<script lang="ts">
  import { Footer } from "$lib/components/ui/card";
  import ToolBar from "$lib/components/ui/ToolBar.svelte";
  import { device, type DeviceInfo } from "$lib/stores/deviceStore";
  import DividerPanel from "$lib/components/ui/DividerPanel.svelte";
  import { loadTodayInfoFile } from "$lib/services/filesystem";
  import { onMount } from "svelte";
  import { date } from "$lib/stores/todayStore";

  let deviceInfo: DeviceInfo;
  device.subscribe((data) => {
    deviceInfo = data;
  });

  $: containerHeight = deviceInfo !== undefined ? deviceInfo.heightPx : 800;
  onMount(() => {
    loadTodayInfoFile($date.dateString);
  });
</script>

<div
  style="height: {containerHeight}px;"
  class="page fixed overflow-hidden flex flex-col w-full items-center
	justify-start p-2"
>
  <div class="flex justify-center h-full w-full mt-1 mb-20">
    <DividerPanel />
  </div>

  <Footer class="w-full absolute bottom-0 z-50">
    <div class="w-full flex flex-row justify-center">
      <ToolBar />
    </div>
  </Footer>
</div>

<style>
  .page {
    transition: all 0.3s;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
