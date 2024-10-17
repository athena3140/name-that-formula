<template>
	<div>
		<component v-if="layout" :is="layout">
			<router-view />
		</component>
		<router-view v-else />
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "./layouts/DefaultLayout.vue"; // default layout for naming and writing modes.
const route = useRoute();

const layout = computed(() => {
	if (route.meta.layout == "default") {
		return DefaultLayout;
	} else {
		return null;
	}
});
</script>
