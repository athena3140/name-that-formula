<template>
	<Toaster :position="isMdscreen ? 'bottom-left' : 'top-center'" :rich-colors="true" theme="dark" :duration="duration" />
</template>

<script setup>
import { computed, watch, ref, defineComponent, h, markRaw } from "vue"
import { useStore } from "vuex"
import { Toaster, toast } from "vue-sonner"

const store = useStore()
const data = computed(() => store.state.alertStatus)
const duration = ref(3000)

watch(data, (alert) => {
	const message = alert.isFormula ? formatChemicalFormula(alert.message) : alert.message
	const CustomDiv = getCustomComponent(message)
	alert.isCorrect ? toast.success(CustomDiv) : toast.error(CustomDiv)
	duration.value = alert.duration ? alert.duration : 3000
})

const getCustomComponent = (text) =>
	markRaw(
		defineComponent({
			setup: () => () => h("div", { innerHTML: text }),
		})
	)

const isMdscreen = ref(window.innerWidth >= 768)
const formatChemicalFormula = (formula) => {
	return formula.replace(/([A-Za-z)])_(\d+)/g, "$1<sub>$2</sub>")
}
</script>

<style>
[data-title] {
	text-align: start;
}
</style>

<!-- <template>
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
</style> -->
