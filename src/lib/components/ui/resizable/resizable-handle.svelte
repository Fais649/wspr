<script lang="ts">
  import DragHandleDots2 from "svelte-radix/DragHandleDots2.svelte";
  import * as ResizablePrimitive from "paneforge";
  import { cn } from "$lib/utils.js";

  type $$Props = ResizablePrimitive.PaneResizerProps & {
    withHandle?: boolean;
  };

  interface Props {
    withHandle?: $$Props["withHandle"];
    el?: $$Props["el"];
    class?: $$Props["class"];
  }

  let { withHandle = false, el = $bindable(undefined), class: className = undefined }: Props = $props();
  
</script>

<ResizablePrimitive.PaneResizer
  bind:el
  class={cn(
    "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[direction=vertical]:h-px data-[direction=vertical]:w-full data-[direction=vertical]:after:left-0 data-[direction=vertical]:after:h-1 data-[direction=vertical]:after:w-full data-[direction=vertical]:after:-translate-y-1/2 data-[direction=vertical]:after:translate-x-0 [&[data-direction=vertical]>div]:rotate-90",
    className,
  )}
>
  {#if withHandle}
    <div
      class="bg-border right-[-50%] relative z-10 flex h-6 w-2 items-center justify-center border"
    >
      <DragHandleDots2 class="h-2.5 w-2.5" />
    </div>
  {/if}
</ResizablePrimitive.PaneResizer>
