<template>
	<div>
		<div class="p-6 rounded-md space-y-4" :class="mode == 'naming' ? 'bg-purple-100' : 'bg-pink-100'">
			<h4 class="font-semibold flex items-center text-xl">
				<InfoIcon class="mr-2 h-5 w-5" />
				{{ mode == "naming" ? "Naming" : "Writing" }} Format Guide:
			</h4>
			<ul class="space-y-2">
				<li v-for="(rule, index) in rules" :key="index" class="flex items-center">
					<CheckIcon v-if="rule.correct" class="mr-2 h-4 w-4 text-green-600" />
					<XIcon v-else class="mr-2 h-4 w-4 text-red-600" />
					<span class="text-sm" :class="rule.correct ? 'text-green-700' : 'text-red-700'">{{ rule.text }}</span>
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
