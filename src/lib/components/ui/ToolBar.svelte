<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import DatePicker from "./DatePicker.svelte";
  import {
    getDate,
    addTodoItem,
    stepDateByDays,
  } from "$lib/components/ui/Items.svelte";
</script>

<div
  id="toolbar"
  class="bg-black border-dotted border-[1px] rounded-3xl flex w-fit scale-[80%] flex-col items-center justify-center
overflow-hidden"
>
  <div class="flex-row flex justify-center items-center overflow-hidden">
    <Button
      variant="ghost"
      on:click={() => {
        stepDateByDays(-1);
      }}
      class="text-center "></Button
    >

    {getDate().toString()}
    <Button
      variant="ghost"
      class="text-center"
      on:click={() => {
        stepDateByDays(1);
      }}></Button
    >
  </div>
  <div
    class="border-t-[1px] border-dotted h-10 w-full justify-center flex flex-row items-center"
  >
    <Button variant="ghost" class="text-center text-xl" on:click={() => {}}
      >󰃶</Button
    >
    <Button
      on:click={() => {
        addTodoItem();
      }}
      variant="ghost"
      class="text-center text-xl"></Button
    >
  </div>
</div>
