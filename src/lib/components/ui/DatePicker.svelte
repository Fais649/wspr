<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import { type DateValue } from "@internationalized/date";
  import {
    getDate,
  } from "$lib/components/ui/Items.svelte";

  interface Props {
    dateValue: DateValue | undefined;
    changeDateBy: Function;
  }

  let { dateValue = $bindable(), changeDateBy }: Props = $props();

  const steps = [
    { value: -7, label: "󰇙󰇙" },
    { value: -3, label: "󰇙" },
    { value: -1, label: "" },
    { value: 0, label: "" },
    { value: 1, label: "" },
    { value: 3, label: "󰇙" },
    { value: 7, label: "󰇙󰇙" },
  ];
</script>

<Drawer.Root>
  <Drawer.Trigger asChild >
    {#snippet children({ builder })}
        <Button builders={[builder]} variant="outline">
        {getDate().toString()}
      </Button>
          {/snippet}
    </Drawer.Trigger>
  <Drawer.Content>
    <div class="mx-auto w-fit max-w-sm">
      <Drawer.Header>
        <Drawer.Title>
        {getDate().toString()}
        </Drawer.Title>
      </Drawer.Header>
    </div>
    <div class="rounded-md border-0">
      <div>
        <Calendar class="border-0" bind:value={dateValue} />
      </div>
      <Drawer.Footer
        class="flex-row flex justify-center gap-0 w-full items-center pb-10 "
      >
        {#each steps as item}
          <Button
            variant="ghost"
            size="sm"
            on:click={() => changeDateBy(item.value)}>{item.label}</Button
          >
        {/each}
      </Drawer.Footer>
    </div>
    <Drawer.Footer></Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
