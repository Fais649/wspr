import { writable } from 'svelte/store';

export enum EventType {
  addCalendarEventItem,
  editCalendarEventItem,
  addTodoItem,
  editTodoItem,
  addTodoItemChild,
  focusOn,

}

export enum ActionType {
  add,
  edit,
  delete,
}

export enum ElementType {
  itemList,
  note,
  todoItem,
  eventItem
}

export interface EventDetail {
  targetId: string,
  elementType: ElementType
}

export interface SimpleEvent {
  eventType: EventType;
  timestamp: number;
  detail?: EventDetail;
}

function createSimpleEventStore() {
  let detail: EventDetail | undefined = undefined;
  const { subscribe, set } = writable<SimpleEvent | null>(null);

  return {
    detail,
    subscribe,
    emit: (event: SimpleEvent) => set(event),
    clear: () => set(null),
  };
}

export const simpleEvent = createSimpleEventStore();

export function emitSimpleEvent(eventType: EventType, detail?: EventDetail) {
  simpleEvent.emit({ eventType: eventType, timestamp: Date.now(), detail });
}
