<script lang="ts">
  import Minus from "svelte-radix/Minus.svelte";
  import Plus from "svelte-radix/Plus.svelte";
  import { VisGroupedBar, VisXYContainer } from "@unovis/svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
</script>

<Drawer.Root>
  <Drawer.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline">Open Drawer</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <div class="mx-auto w-full max-w-sm">
      <Drawer.Header>
        <Drawer.Title>Move Goal</Drawer.Title>
        <Drawer.Description>Set your daily activity goal.</Drawer.Description>
      </Drawer.Header>
      <div class="mt-3 h-[120px]"></div>
    </div>
    <Drawer.Footer>
      <Drawer.Close asChild let:builder>
        <div class="w-full flex justify-center pb-10">
          <Button
            builders={[builder]}
            variant="outline"
            class="border-2 border-dotted border-white w-10 h-10 rounded-[50%]"
            >X</Button
          >
        </div>
      </Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
