import { writeFile, readFile, journalDir } from './filesystem';


export const saveContent = async (dateString: string, note: string, todo: string) => {
	const contentString = JSON.stringify({ note, todo });
	await writeFile(`${journalDir}${dateString}`, 'note.txt', note);
	await writeFile(`${journalDir}${dateString}`, 'todo.txt', todo);
	await writeFile(`${journalDir}${dateString}`, 'content.json', contentString);
};

export const loadContent = async (dateString: string): Promise<{ note: string; todo: string }> => {
	try {
		const contentString = await readFile(`${journalDir}${dateString}`, 'content.json');
		const contentJson = JSON.parse(contentString);
		return {
			note: contentJson.note,
			todo: contentJson.todo.toString()
		};
	} catch (error) {
		console.error('Error loading content:', error);
		return { note: '', todo: '' };
	}
};
