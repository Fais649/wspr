import initDevice, { deviceInfo } from "$lib/utils/device";
import { initConstants } from "./constants";

export default async function startup() {
	await initDevice();
	await initConstants(deviceInfo);
	await loadDefaults();
	await loadContents();
}

