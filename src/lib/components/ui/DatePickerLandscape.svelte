<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { date } from "$lib/stores/todayStore";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import { type DateValue } from "@internationalized/date";

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
        {$date.dayOfWeek + " : " + $date.dateString}
      </Button>
          {/snippet}
    </Drawer.Trigger>
  <Drawer.Content>
    <div class="mx-auto w-full max-w-sm">
      <Drawer.Header>
        <Drawer.Title>
          {$date.dayOfWeek + " : " + $date.dateString}
        </Drawer.Title>
      </Drawer.Header>
    </div>
    <div class="rounded-md border-0">
      <div>
        <Calendar class="border-0" bind:value={dateValue} />
      </div>
      <Drawer.Footer class="flex-row justify-center w-full items-center pb-10 ">
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
