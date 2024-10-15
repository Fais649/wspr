<script lang="ts">
	import DatePicker from '$lib/components/ui/DatePicker.svelte';
	import TextAreaWLabel from '$lib/components/ui/TextAreaWLabel.svelte';
	import TodoList from '$lib/components/ui/TodoList.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import { onMount } from 'svelte';
	import { updateCSSVariables } from './themes';
	import { loadPreferences, preferences } from '$lib/scripts/preferences';
	import { loadContent } from '$lib/scripts/content';

	let previousDateString = '';

	let dateString: string;
	$: if (dateString && dateString !== previousDateString) {
		loadContent(dateString);
		previousDateString = dateString;
	}

	onMount(() => {
		loadPreferences();
		loadContent(dateString);
		updateCSSVariables(preferences.theme);
	});
</script>

<div class="flex w-full flex-col items-center justify-center p-2 align-middle">
	<TodoList />
	<TextAreaWLabel />
	<div class="absolute bottom-0 m-2 flex w-full flex-row items-center justify-center align-middle">
		<Logo />
		<DatePicker bind:dateString />
	</div>
</div>

<style>
	:global(.ui) {
		background: var(--background);
		color: var(--foreground);
	}

	:root {
		background: var(--background);
		color: var(--foreground);
	}

	* {
		background: var(--background);
		color: var(--foreground);
	}
</style>
