<template>
	<Toaster :position="isMdscreen ? 'bottom-left' : 'top-center'" :rich-colors="true" theme="dark" :duration="duration" />
</template>

<script setup>
import { computed, watch, ref, defineComponent, h, markRaw } from "vue";
import { useStore } from "vuex";
import { Toaster, toast } from "vue-sonner";

const store = useStore();
const data = computed(() => store.state.alertStatus);
const duration = ref(3000);

watch(data, (alert) => {
	const message = alert.message;
	const CustomDiv = getCustomComponent(message);
	alert.isCorrect ? toast.success(CustomDiv) : toast.error(CustomDiv);
	duration.value = alert.duration ? alert.duration : 3000;
});

const getCustomComponent = (text) =>
	markRaw(
		defineComponent({
			setup: () => () => h("div", { innerHTML: text }),
		})
	);

const isMdscreen = ref(window.innerWidth >= 768);
</script>

<style>
[data-title] {
	text-align: start;
}
</style>
