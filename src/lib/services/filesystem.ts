import { readFile, writeFile } from "$lib/filesystem";
import { date, todos, events, note, type DateInfo } from "$lib/stores/todayStore";
import type { EventItem, TodoItem } from "$lib/types";

export interface TodayInfo {
  dateInfo: DateInfo;
  todoItems: TodoItem[];
  eventItems: EventItem[];
  noteItem: string;
}

let dateInfo: DateInfo;
date.subscribe((date) => {
  dateInfo = date;
});

let todoItems: TodoItem[];
todos.subscribe((val) => {
  todoItems = val;
});

let eventItems: EventItem[];
events.subscribe((events) => {
  eventItems = events;
});

let noteItem: string;
note.subscribe((note) => {
  noteItem = note;
});

function stringify() {
  return JSON.stringify({
    dateInfo: dateInfo,
    todoItems: todoItems,
    eventItems: eventItems,
    noteItem: noteItem
  });
}

function stringifyBasic() {
  return JSON.stringify({
    dateInfo: {
      dateString: dateInfo.dateString ?? "",
      dayOfWeek: dateInfo.dayOfWeek ?? ""
    },
    todoItems: todoItems,
    eventItems: eventItems,
  })
}

function getDefaultDataString() {
  return JSON.stringify({
    dateInfo: dateInfo,
    todoItems: [],
    eventItems: [],
    noteItem: ""
  }
  )
}

export async function initEmptyTodayInfoFile(dateString: string) {
  writeFile("dir", dateString + ".json", getDefaultDataString())
}

export async function saveTodayInfoFile(dateString: string) {
  try {
    writeFile("dir", dateString + ".json", stringify())
  } catch (error) {
    console.log("exception while saving today file")
  }
}

async function loadInfoFile(dateString: string) {
  let dataString: string | null = null;
  try {
    dataString = await readFile("dir", dateString + ".json");
    if (!dataString) {
      initEmptyTodayInfoFile(dateString);
    }
  } catch (error) {
    console.log("exception, writing file")
    initEmptyTodayInfoFile(dateString);
    return "";
  }

  return dataString;
}


export async function getTodayInfoJson() {
  return stringifyBasic();
}

export async function loadTodayInfoFile(dateString: string) {
  const dataString = await loadInfoFile(dateString);

  let dataJson: TodayInfo = JSON.parse(dataString ?? getDefaultDataString());

  todos.set(dataJson.todoItems);
  events.set(dataJson.eventItems);
  note.set(dataJson.noteItem);
}

