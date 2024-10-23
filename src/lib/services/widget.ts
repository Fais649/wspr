import { WidgetsBridgePlugin } from "capacitor-widgetsbridge-plugin";
import { getTodayInfoJson } from "$lib/services/filesystem";

export async function reloadWidget() {
	await WidgetsBridgePlugin.setItem({
		key: "demo",
		value: await getTodayInfoJson(),
		group: "group.punk",
	});

	await WidgetsBridgePlugin.reloadTimelines({ ofKind: "items" });
}
