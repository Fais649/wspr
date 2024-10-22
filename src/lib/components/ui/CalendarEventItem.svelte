<script lang="ts">
  import { emitSimpleEvent, EventType } from "$lib/stores/eventStore";
  import { ElementType } from "$lib/stores/focusStore";

  export let event: EventItem;

  interface EventItem {
    id: string;
    title: string;
    desc: string;
    startDate: number;
    endDate: number;
  }
</script>

<div
  id={event.id}
  on:pointerup={() => {
    emitSimpleEvent(EventType.editCalendarEventItem, {
      targetId: event.id,
      elementType: ElementType.eventItem,
    });
  }}
  class="flex flex-row justify-between items-center gap-2 w-full h-full"
>
  <div class="w-2 text-[18px] h-[28px] border-r-[2px]"></div>
  <div class="eventTitle text-[13px]">
    {event.title}

    <div class="items-center justify-end text-[10px]">
      {#if event.startDate > 0}
        {new Date(event.startDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      {/if}
      {#if event.endDate > 0}
        {"| " +
          new Date(event.endDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
      {/if}
    </div>
  </div>
</div>

<style>
  .eventTitle {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
  }
</style>
