import { Device } from "@capacitor/device";
import { tick } from "svelte";

interface DeviceInfo {
	os: string,
	viewportHeight: number
	viewportWidth: number
}

export let deviceInfo: DeviceInfo = {
	os: 'ios',
	viewportHeight: -1,
	viewportWidth: -1
};

export default async function initDevice() {
	let info = await Device.getInfo();
	tick();
	deviceInfo.os = info.operatingSystem.toString();
	deviceInfo.viewportHeight = window.innerHeight;
	deviceInfo.viewportWidth = window.innerWidth;
	return deviceInfo;
}
