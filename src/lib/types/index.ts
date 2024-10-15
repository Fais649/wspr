export interface Preferences {
	theme: string;
}

export interface Content {
	note: string;
	todo: TodoItem[];
	event: EventItem[]
}

export interface TodoItem {
	id: number;
	text: string;
	completed: boolean;
	editing: boolean;
}

export interface EventItem {
	id: string;
	title: string;
	desc: string;
	start: number;
	end: number;
}

export interface Timer {
	name: string,
	seconds: number,
}

export interface DeviceInfo {
	os: string,
	heightPx: number,
	widthPx: number,
	kbHeightPx: number,
}
