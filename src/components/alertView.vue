<template>
	<div
		class="alert"
		:class="[
			data.isCorrect ? 'bg-green-200 border-green-400 text-green-700' : 'bg-red-200 border-red-400 text-red-600',
			data.isData ? 'active' : '',
		]">
		<div v-if="data.isFormula" v-html="formatChemicalFormula(data.message)"></div>
		<div v-else>{{ data.message }}</div>
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const data = computed(() => store.state.alertStatus);

const formatChemicalFormula = (formula) => {
	return formula.replace(/([A-Za-z)])_(\d+)/g, "$1<sub>$2</sub>");
};
</script>

<style scoped>
.alert {
	@apply order-first lg:order-2 rounded-md text-center text-lg lg:text-base font-semibold;
	display: grid;
	grid-template-rows: 0fr;
	padding: 0;
	border-width: 0;
	transition: 0.5s ease;
	transition-property: padding, border-width, grid-template-rows;
}

.alert > div {
	overflow: hidden;
}

.alert.active {
	padding: 1rem;
	border-width: 1px;
	grid-template-rows: 1fr;
}
</style>
