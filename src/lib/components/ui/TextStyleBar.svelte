<script lang="ts">
	import FontBold from "svelte-radix/FontBold.svelte";
	import FontItalic from "svelte-radix/FontItalic.svelte";
	import Underline from "svelte-radix/Underline.svelte";
	import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import PopoverContent from "./popover/popover-content.svelte";
</script>

<Popover.Root openFocus>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="ghost"
			class="w-full h-full rounded"
			builders={[builder]}>Aa</Button
		>
	</Popover.Trigger>
	<PopoverContent class="w-fit">
		<ToggleGroup.Root type="multiple">
			<ToggleGroup.Item value="bold" aria-label="Toggle bold">
				<FontBold class="h-4 w-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item
				value="italic"
				aria-label="Toggle italic"
			>
				<FontItalic class="h-4 w-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item
				value="strikethrough"
				aria-label="Toggle strikethrough"
			>
				<Underline class="h-4 w-4" />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	</PopoverContent>
</Popover.Root>
