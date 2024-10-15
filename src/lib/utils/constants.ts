import { tick } from "svelte";
import TodoList from "./components/ui/TodoList.svelte";
import { Device } from "@capacitor/device";
import { Keyboard } from "@capacitor/keyboard";
import { loadPreferences } from "$lib/scripts/preferences";
import { loadContent } from "$lib/scripts/content";

interface InteractionState {
	isFocused: boolean,
	dateString: string,
	noteString: string
}

interface UiDefaults {
	keyboardHeight: number,
	boxHeight: number,
	boxWidth: number,
	boxHeaderHeight: number,
	seperatorPx: number,
	fontHeaderSize: number,
	fontSize: number,
	smol: boolean,
}

let smolUiDefualts: UiDefaults {

}


export async function initConstants() {

}

export const uiDefaults: UiDefaults {

}

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
