import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Device } from "@capacitor/device";

export let journalDir = 'journal/';

export const initJournalDir = async () => {
	const ss = await Device.getInfo();
	journalDir = ss.operatingSystem === 'ios' ? 'journal/' : 'wisp_r/journal/';
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

export const readFile = async (dir: string, name: string): Promise<string> => {
	try {
		const contents = await Filesystem.readFile({
			path: `${dir}/${name}`,
			directory: Directory.Documents,
			encoding: Encoding.UTF8
		});
		return contents.data as string;
	} catch (error) {
		console.error('Error reading file:', error);
		return '';
	}
};
