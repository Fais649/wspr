import { writable } from 'svelte/store';
import type { Timer, EventItem, TodoItem } from '$lib/types/index'
import { DateFormatter, getLocalTimeZone, today, type DateValue } from '@internationalized/date';

export const note = writable<string>('');
export const todos = writable<TodoItem[]>([]);
export const events = writable<EventItem[]>([]);
export const timers = writable<Timer[]>([])

export interface DateInfo {
	date: DateValue;
	prevDate: DateValue | null;
	dateString: string;
	dayOfWeek: string;
	startDateUnix: number;
	endDateUnix: number;
}

function createDateStore() {
	const { subscribe, set } = writable<DateInfo>();

	window.addEventListener("changeDate", (e) => {
		console.log('eventChangeDateTriggered');
		console.log(e);
	});

	let date: DateValue = today(getLocalTimeZone());
	let prevDate: DateValue | null = null;

	const dateFormatter = new DateFormatter('de-DE', { dateStyle: 'medium' });
	const dayOfWeekFormatter = new DateFormatter('de-DE', { weekday: 'short' });

	function setDateInfo() {
		const dateString = dateFormatter.format(date.toDate(getLocalTimeZone()));
		const dayOfWeek = dayOfWeekFormatter.format(date.toDate(getLocalTimeZone()));
		const startDateUnix = date.toDate(getLocalTimeZone()).setHours(0, 0, 0, 0);
		const endDateUnix = date.toDate(getLocalTimeZone()).setHours(23, 59, 59, 999);

		set({
			date,
			prevDate,
			dateString,
			dayOfWeek,
			startDateUnix: startDateUnix,
			endDateUnix: endDateUnix,
		});
	}

	function stepDateByDays(days: number = 1) {
		prevDate = date;

		if (days == 0) {
			date = today(getLocalTimeZone());
		} else {
			date = date.add({ days });
		}

		setDateInfo();
	}

	function setDate(newDate: DateValue) {
		prevDate = date;
		date = newDate;
		setDateInfo();
	}

	setDateInfo();

	return {
		subscribe,
		stepDateByDays,
		setDate,
	};
}

export const date = createDateStore();
