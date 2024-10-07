<template>
	<div class="container w-full mx-auto lg:p-8 p-2 py-10 min-h-dvh flex items-center justify-center flex-col">
		<div class="w-full shadow-2xl card bg-white rounded p-5">
			<div class="text-center">
				<h1
					class="md:text-5xl text-4xl mt-3 font-extrabold leading-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
					Chemistry Formula Quiz
				</h1>
				<p class="md:text-xl text-sm md:my-4">Test your knowledge of chemical formulas!</p>
				<div class="flex items-center justify-center space-x-4 md:text-xl text-base mt-2">
					<TrophyIcon class="text-yellow-500 md:h-8 md:w-8 w-5 h-5" />
					<span> Score: 0/0 </span>
				</div>
			</div>
			<!-- <div class="flex mt-10 justify-end lg:gap-10 flex-wrap lg:flex-nowrap min-h-fit">
				<div class="lg:w-2/5 w-full lg:mt-0 mt-5 relative flex flex-col justify-end">
					<transition name="fade" class="lg:absolute static top-0 w-full lg:mt-0 mt-5">
						<formatGuide
							:key="store.state.currentMode"
							:mode="store.state.currentMode"
							:rules="store.state.currentMode == 'naming' ? namingRules : writingRules" />
					</transition>
					<alertView />
				</div> -->
			<div class="flex mt-10 justify-end lg:gap-10 flex-wrap lg:flex-nowrap min-h-fit">
				<div class="lg:w-2/5 w-full lg:mt-0 mt-5 relative flex flex-col">
					<div class="xl:min-h-60 xl:mb-10 lg:min-h-[292px] lg:mb-10 relative">
						<transition name="fade" class="lg:absolute static top-0 w-full lg:mt-0 mt-5">
							<formatGuide
								:key="store.state.currentMode"
								:mode="store.state.currentMode"
								:rules="store.state.currentMode == 'naming' ? namingRules : writingRules" />
						</transition>
					</div>
					<alertView />
				</div>

				<div class="lg:w-3/5 w-full order-first lg:order-2 h-fit">
					<div
						:style="pesudoStyles"
						class="w-full mx-auto rounded bg-purple-100 p-2 flex justify-center tablist items-center gap-3 relative">
						<div class="tab" :class="{ active: currentMode == 'naming' }" @click="changeMode('naming')">
							<BookA class="sm:block hidden w-5 h-5" :stroke-width="1.5" />
							Formula Naming
						</div>
						<div class="tab" :class="{ active: currentMode == 'writing' }" @click="changeMode('writing')">
							<PencilIcon class="sm:block hidden h-5 w-5" />
							Formula Writing
						</div>
					</div>
					<router-view v-slot="{ Component }">
						<transition name="fade" mode="out-in">
							<component :is="Component" />
						</transition>
					</router-view>
				</div>
			</div>
		</div>
		<footer class="mt-10 text-center text-white text-xs">
			<div>© {{ new Date().getFullYear() }} Chemistry Formula Quiz. Happy learning!</div>
			<div>developed by <a href="https://github.com/athena3140" class="underline hover:no-underline">athena3140</a></div>
		</footer>
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { TrophyIcon, PencilIcon, BookA } from "lucide-vue-next";
import formatGuide from "./components/formatGuide.vue";
import alertView from "./components/alertView.vue";

const store = useStore();
const router = useRouter();
const isFirstTime = ref(true);
const currentMode = computed(() => store.state.currentMode);
onMounted(() => {
	setTimeout(() => {
		isFirstTime.value = false;
	}, 150);
});

const namingRules = [
	{ correct: true, text: "Capitalization doesn't matter (e.g., 'carbon dioxide')." },
	{ correct: true, text: "Use British english (e.g., 'Sulphide')." },
	{ correct: true, text: "Use spaces for multi-word names" },
	{ correct: false, text: "Don't use chemical symbols or formulas" },
	{ correct: false, text: "Don't include charges or states" },
];

const writingRules = [
	{ correct: true, text: "Use correct element symbols (e.g., 'H' for Hydrogen)" },
	{ correct: true, text: "Use numbers for subscripts (e.g., 'H2O' not 'H₂O')" },
	{ correct: true, text: "Capitalize correctly (e.g., 'CO2' not 'Co2')" },
	{ correct: false, text: "Don't use spelled-out element names" },
	{ correct: false, text: "Don't include charges or states" },
];

const changeMode = (newMode) => {
	currentMode.value !== newMode ? store.commit("changeMode", newMode) : null;
	newMode == "writing" ? router.push({ path: "/writing" }) : router.push({ path: "/" });
};

const pesudoStyles = computed(() => {
	return {
		"--translate-X": currentMode.value == "naming" ? "calc(-100% - 1rem)" : "0%",
		"--transition": isFirstTime.value ? "0" : "150ms",
	};
});
</script>

<style scoped>
.tablist::before {
	content: "";
	z-index: 10;
	width: calc(50% - 1rem);
	height: calc(100% - 1rem);
	transform: translate(var(--translate-X), -50%);
	transition-property: all;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: var(--transition);
	@apply rounded bg-white absolute right-2 top-1/2 shadow-md;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
