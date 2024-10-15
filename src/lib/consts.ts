import { tick } from "svelte";
import TodoList from "./components/ui/TodoList.svelte";
import { Device } from "@capacitor/device";
import { Keyboard } from "@capacitor/keyboard";
import { loadPreferences } from "./scripts/preferences";
import { loadContentData } from "./scripts/content";

let os = '';
let isFocused: boolean = false;
let contentDiv: HTMLElement;
let todoList: TodoList;
let todoListParentDiv: HTMLElement;
let dateString: string = '';
let noteString: string = '';
let boxStyle = '';
let boxHeightStr = '';
let boxWidthStr = '';
let footerStyle = '';
let footerClass = '';

let fontSize: number = 14;

let keyboardHeight = 0;
let viewportHeightPx: number = -1;

let defaultBoxHeightLg: number = 300;
let defaultBoxHeightSm: number = 220;

let defaultBoxWidthLg: number = 300;
let defaultBoxWidthSm: number = 220;

let defaultHeaderHeightLg: string = `25px`;
let defaultHeaderHeightSm: string = `15px`;
let defaultHeaderFontSizeLg: string = `16px`;
let defaultHeaderFontSizeSm: string = `12px`;

let boxHeight = defaultBoxHeightLg;
$: boxHeightStr = `${boxHeight}px`;

let boxWidth = defaultBoxWidthLg;
$: boxWidthStr = `${boxWidth}px`;

let headerHeight: string;
let headerFontSize: string;


let smolPhone: boolean = false;
let bigPhone: boolean = true;

$: boxStyle = `min-height: ${boxHeightStr};`;

$: footerStyle =
	os === 'ios'
		? `transition: transform 0.4s ease; transform: translateY(-${keyboardHeight}px)`
		: '';

$: footerClass = `fixed bottom-0 z-[120] flex h-10 w-full items-center justify-center ${os !== 'ios' ? (bigPhone ? 'bottom-2 mb-8' : 'bottom-2 mb-4') : 'pb-6'}`;

$: if (viewportHeightPx > 650) {
	boxHeight = defaultBoxHeightLg;
	headerHeight = defaultHeaderHeightLg;
	headerFontSize = defaultHeaderFontSizeLg;

	if (os === 'ios') {
		boxHeight += 20;
	}
	bigPhone = true;
	smolPhone = false;
} else {
	boxHeight = defaultBoxHeightSm;
	headerHeight = defaultHeaderHeightSm;
	headerFontSize = defaultHeaderFontSizeSm;

	if (os === 'ios') {
		boxHeight += 20;
	}
	bigPhone = false;
	smolPhone = true;
}

async function init() {
	try {
		const info = await Device.getInfo();

		os = info.platform;
		viewportHeightPx = window.innerHeight;
	} catch (error) {
		console.error('Error getting lol info:', error);
		os = 'unknow';
	}

	Keyboard.addListener('keyboardWillShow', (info) => {
		keyboardHeight = info.keyboardHeight;
	});

	Keyboard.addListener('keyboardWillHide', () => {
		keyboardHeight = 0;
	});

	await tick();
	await loadPreferences();
	await tick();
	await loadContentData();
}
