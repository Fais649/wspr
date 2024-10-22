import { writable } from 'svelte/store';
import type { Timer, EventItem, TodoItem, PaymentItem } from '$lib/types/index'
import { DateFormatter, getLocalTimeZone, now, today, type DateValue } from '@internationalized/date';

export interface DateInfo {
  date: DateValue;
  prevDate: DateValue | null;
  dateString: string;
  dayOfWeek: string;
  startOfDateUnix: number;
  endOfDateUnix: number;
  startDateUnix: number;
  endDateUnix: number;
}

export const date = createDateInfo();
export const note = writable<string>('');
export const todos = writable<TodoItem[]>([]);
export const events = writable<EventItem[]>([]);
export const payments = writable<PaymentItem[]>([]);
export const timers = writable<Timer[]>([])

function createDateInfo() {
  const { subscribe, set } = writable<DateInfo>();

  let date: DateValue = today(getLocalTimeZone());
  let prevDate: DateValue | null = null;

  const dateFormatter = new DateFormatter('de-DE', { dateStyle: 'medium' });
  const dayOfWeekFormatter = new DateFormatter('de-DE', { weekday: 'short' });


  function setDateInfo() {
    const dateString = dateFormatter.format(date.toDate(getLocalTimeZone()));
    const dayOfWeek = dayOfWeekFormatter.format(date.toDate(getLocalTimeZone()));
    const startOfDateUnix = date.toDate(getLocalTimeZone()).setHours(0, 0, 0, 0);
    const endOfDateUnix = date.toDate(getLocalTimeZone()).setHours(23, 59, 59, 999);

    const now = new Date();

    const startDateUnix = date.toDate(getLocalTimeZone()).setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    const endDateUnix = startDateUnix + 3600000;

    set({
      date,
      prevDate,
      dateString,
      dayOfWeek,
      startOfDateUnix: startOfDateUnix,
      endOfDateUnix: endOfDateUnix,
      startDateUnix: startDateUnix,
      endDateUnix: endDateUnix
    });

  }

  function stepDateByDays(days: number = 1) {
    prevDate = date;

    if (days == 0) {
      date = today(getLocalTimeZone());
    } else {
      date = date.add({ days });
    }

    console.log(date);
    console.log(prevDate);

    setDateInfo();
  }

  function setDate(newDate: DateValue) {
    prevDate = date;
    date = newDate;
    setDateInfo();
  }


  setDateInfo();
  return {
    set,
    subscribe,
    stepDateByDays,
    setDate,
  };
}
