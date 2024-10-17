<template>
	<div>
		<div class="p-6 rounded-md space-y-4 text-start" :class="mode == 'naming' ? 'bg-purple-100' : 'bg-pink-100'">
			<h4 class="font-semibold flex items-center text-xl">
				<InfoIcon class="mr-2 h-5 w-5" />
				{{ mode == "naming" ? "Naming" : "Writing" }} Format Guide:
			</h4>
			<ul class="space-y-2 list-outside list-disc">
				<li
					v-for="(rule, index) in rules"
					:key="index"
					class="grid grid-rows-1 grid-cols-[auto_1fr] gap-3 items-center">
					<CheckIcon v-if="rule.correct" class="h-4 w-4 text-green-600" />
					<XIcon v-else class="h-4 w-4 text-red-600" />
					<p class="text-sm" :class="rule.correct ? 'text-green-700' : 'text-red-700'">{{ rule.text }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { InfoIcon, CheckIcon, XIcon } from "lucide-vue-next";
// eslint-disable-next-line no-undef
const props = defineProps({
	mode: String,
	rules: Array,
});
</script>
