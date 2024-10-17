<template>
	<div>
		<table class="w-full caption-bottom text-sm">
			<thead class="[&_tr]:border-b" :class="data.iscustomStyling ? 'md:table-header-group hidden ' : ''">
				<tr class="bg-gray-100 transition-colors">
					<th
						class="h-12 px-4 capitalize text-xs text-left align-middle font-medium"
						v-for="(head, index) in data.head"
						:key="index">
						{{ head }}
					</th>
				</tr>
			</thead>
			<tbody class="[&_tr:last-child]:border-0" :class="data.iscustomStyling ? 'md:border-t-0 border-t' : ''">
				<tr class="border-b" v-for="(row, index) in data.body" :key="index">
					<td class="p-4 align-middle" v-for="(value, key) in row" :key="key" v-html="formatData(key, value)"></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
	data: Array,
	rules: Array,
});

const formatData = (field, data) => {
	if (field == "formula" || field == "elements" || field == "acidRadical") {
		data = data.replace(/_(\d+)/g, "<sub>$1</sub>");
		data = data.replace(/(\d*)([+-]*)$/, "<sup>$1$2</sup>");
		data = data.replace(/<sup><\/sup>/g, "");
		return data;
	}

	if (field == "charges") {
		return data.replace(/([A-Z][a-z]*)(\d+[\\+-])/g, (_, e, c) => `${e}<sup>${c}</sup>`);
	}
	if (field == "oxidationNumber") {
		return data.replace(/([A-Za-z]+)\s*((\+|-)\d+(,\s*(\+|-)\d+)*)/g, "$1<sup>$2</sup>");
	}

	if (field == "latin" || field == "english") {
		return data.replace(/_([A-Za-z]+)_/g, "<u>$1</u>");
	}

	return data;
};
</script>

<style>
u {
	@apply relative no-underline;

	&:after {
		content: "";
		@apply absolute left-0 bottom-0 z-0  w-full h-[1px] bg-purple-500;
	}
}
</style>
