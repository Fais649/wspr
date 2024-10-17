import { readable, type Readable } from 'svelte/store';
import { Device, type DeviceInfo as DevInfo } from '@capacitor/device';
import { Keyboard } from '@capacitor/keyboard';

export interface DeviceInfo {
	os: string;
	heightPx: number;
	widthPx: number;
	kbHeightPx: number;
}

export const device: Readable<DeviceInfo> = readable<DeviceInfo>(undefined, (set) => {
	let info: DevInfo;
	let vpHeight: number = 0;
	let vpWidth: number = 0;
	let kbHeight: number = 0;

	async function init() {
		info = await Device.getInfo();
		vpHeight = window.innerHeight;
		vpWidth = window.innerWidth;

		window.addEventListener('resize', onResize);

		Keyboard.addListener('keyboardDidShow', (event) => {
			if (info.platform === 'ios') {
				kbHeight = event.keyboardHeight;
			}
			setDeviceInfo();
		});

		Keyboard.addListener('keyboardWillHide', () => {
			kbHeight = 0;
			setDeviceInfo();
		});

		setDeviceInfo();
	}

	function onResize() {
		vpHeight = window.innerHeight;
		vpWidth = window.innerWidth;
		setDeviceInfo();
	}

	function setDeviceInfo() {
		set({
			os: info.platform,
			heightPx: vpHeight - kbHeight,
			widthPx: vpWidth,
			kbHeightPx: kbHeight,
		});
	}

	init();

	return () => {
		Keyboard.removeAllListeners();
		window.removeEventListener('resize', onResize);
	};
});
