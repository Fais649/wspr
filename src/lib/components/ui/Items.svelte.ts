import { readFile, type TodayInfo } from "$lib/services/filesystem";
import { reloadWidget } from "$lib/services/widget";
import type { EventItem, TodoItem } from "$lib/types";
import { CapacitorCalendar } from "@ebarooni/capacitor-calendar";
import { DateFormatter, getLocalTimeZone, today, type DateValue } from "@internationalized/date";

interface DateInfo {
	date: DateValue;
	prevDate: DateValue | null;
	dateString: string;
	dayOfWeek: string;
	startOfDateUnix: number;
	endOfDateUnix: number;
	startDateUnix: number;
	endDateUnix: number;
}

const dataDir = "data";

let events: EventItem[] = $state([]);
let todos: TodoItem[] = $state([]);
let note: string = $state("");

let dateVal: DateValue = $state(today(getLocalTimeZone()));
let prevDate: DateValue | null = $state(null);

const dateFormatter = new DateFormatter('de-DE', { dateStyle: 'medium' });
const dayOfWeekFormatter = new DateFormatter('de-DE', { weekday: 'short' });

let dateString = $derived(dateFormatter.format(dateVal.toDate(getLocalTimeZone())));
let dayOfWeek = $derived(dayOfWeekFormatter.format(dateVal.toDate(getLocalTimeZone())));
let startOfDateUnix = $derived(dateVal.toDate(getLocalTimeZone()).setHours(0, 0, 0, 0));
let endOfDateUnix = $derived(dateVal.toDate(getLocalTimeZone()).setHours(23, 59, 59, 999));

const now = new Date();

const startDateUnix = $derived(dateVal.toDate(getLocalTimeZone()).setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()));
const endDateUnix = $derived(startDateUnix + 3600000);

let dateR = $derived(dateVal);

let date: DateInfo = $derived({
	date: dateVal,
	prevDate,
	dateString,
	dayOfWeek,
	startOfDateUnix: startOfDateUnix,
	endOfDateUnix: endOfDateUnix,
	startDateUnix: startDateUnix,
	endDateUnix: endDateUnix
});

export function getDate() {
	return dateR;
}

export function getTodos() {
	return todos;
}

export function getEvents() {
	return events;
}

export function stepDateByDays(days: number = 1) {
	console.log("step")
	//date.prevDate = date.date;
	if (days == 0) {
		dateVal = today(getLocalTimeZone());
	} else {
		dateVal.add({ days });
	}
}

export function addTodoItem() {
	const newTodo: TodoItem = {
		id: todos.length + 1,
		text: "",
		completed: false,
		editing: true,
		isChild: false,
	};

	todos = [...todos, newTodo];
}

async function addCalendarEvent() {
	await CapacitorCalendar.createEventWithPrompt({
		title: "",
		startDate: date.startDateUnix,
		endDate: date.endDateUnix,
	});
	await loadCalendarEvents();
}

async function editCalendarEvent(event: EventItem) {
	await CapacitorCalendar.modifyEventWithPrompt({
		id: event.id,
	});
	await loadCalendarEvents();
}

export async function loadCalendarEvents() {
	try {
		const { result } = await CapacitorCalendar.listEventsInRange({
			startDate: date.startOfDateUnix,
			endDate: date.endOfDateUnix,
		});

		if (!result) {
			return;
		}

		events = [];
		result.forEach((event) => {
			let newEventItem: EventItem = {
				id: event.id,
				title: event.title ?? "unknown",
				desc: event.description ?? "unknown",
				startDate: event.startDate ?? -1,
				endDate: event.endDate ?? -1,
			};

			events = [...events, newEventItem];
		});
	} catch (e) {
		console.error("Failed to load calendar events: ", e);
	}

	await reloadWidget();
}

async function loadTodayInfoFile(dateString: string) {
	const dataString = await loadInfoFile(dateString);

	let dataJson: TodayInfo = JSON.parse(dataString ?? getDefaultDataString());

	todos = dataJson.todoItems;
	events = dataJson.eventItems;
	note = dataJson.noteItem;
}

async function loadInfoFile(dateString: string) {
	let dataString: string | null = null;
	try {
		dataString = await readFile(dataDir, dateString + ".json");
	} catch (error) {
		console.log("exception, writing file")
	}

	return dataString;
}

function getDefaultDataString() {
	return JSON.stringify({
		dateInfo: date,
		todoItems: [],
		eventItems: [],
		noteItem: ""
	})
}

export function deleteTodoItem(todo: TodoItem) {
	const idToDelete = todo.id;
	todos.filter((item) => item.id !== idToDelete);
}
