import { writable } from 'svelte/store';
import type { Timer, EventItem, TodoItem } from '$lib/types/index'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';

export const date = writable<CalendarDate>(today(getLocalTimeZone()));
export const note = writable<string>('');
export const todos = writable<TodoItem[]>([]);
export const events = writable<EventItem[]>([]);
export const timers = writable<Timer[]>([])
