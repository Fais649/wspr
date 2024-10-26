import { date, todos, events, note, type DateInfo } from "$lib/stores/todayStore";
import type { EventItem, TodoItem } from "$lib/types";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

export interface TodayInfo {
  dateInfo: DateInfo;
  todoItems: TodoItem[];
  eventItems: EventItem[];
  noteItem: string;
}

const dataDir = "data";

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

function getJSON() {
  return {
    dateInfo: dateInfo,
    todoItems: todoItems,
    eventItems: eventItems,
    noteItem: noteItem
  };
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
  writeFile(dataDir, dateString + ".json", getDefaultDataString())
}

export async function saveTodayInfoFile(dateString: string) {
  let data = getJSON();
  if (data.todoItems.length == 0 && data.eventItems.length == 0 && data.noteItem == "") {
    return;
  }

  try {
    writeFile(dataDir, dateString + ".json", JSON.stringify(data))
  } catch (error) {
    console.log("exception while saving today file")
  }
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

export const writeFile = async (dir: string, name: string, content: string) => {
  await Filesystem.writeFile({
    path: `${dir}/${name}`,
    data: content,
    recursive: true,
    directory: Directory.Documents,
    encoding: Encoding.UTF8
  });
};

export const readFile = async (dir: string, name: string): Promise<string | null> => {
  try {
    const contents = await Filesystem.readFile({
      path: `${dir}/${name}`,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
    return contents.data as string;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
};
