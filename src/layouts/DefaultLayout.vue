<template>
	<div class="container w-full mx-auto lg:p-8 p-2 py-10 min-h-dvh flex items-center justify-center flex-col">
		<div class="w-full shadow-2xl bg-white rounded p-5 text-center">
			<h1 class="heading mt-3 md:text-5xl text-4xl">Chemistry Formula Quiz</h1>
			<p class="md:text-xl text-sm md:my-4">Test your knowledge of chemical formulas!</p>

			<div class="flex relative group w-fit mx-auto items-center justify-center gap-4 pb-2 md:text-xl text-base mt-2">
				<TrophyIcon class="text-yellow-500 md:h-8 md:w-8 w-5 h-5" />
				<div class="flex gap-3 cursor-pointer select-none">
					<div>Score:</div>
					<div class="flex font-mono">
						<div class="relative overflow-hidden flex items-start justify-center">
							<div
								v-for="(digit, index) in currentCorrect.toString()"
								:key="index"
								class="relative w-[10px]">
								<transition name="number-up">
									<div class="absolute overflow-hidden left-1/2 -translate-x-1/2" :key="digit">
										{{ digit }}
									</div>
								</transition>
							</div>
						</div>
						/
						<div class="relative flex items-start justify-center overflow-hidden">
							<div v-for="(digit, index) in currentTotal.toString()" :key="index" class="relative w-[10px]">
								<transition name="number-up">
									<div class="absolute overflow-hidden left-1/2 -translate-x-1/2" :key="digit">
										{{ digit }}
									</div>
								</transition>
							</div>
						</div>
					</div>
				</div>
				<div
					class="pt-5 inline-block w-64 absolute translate-x-1/2 right-1/2 transition-all ease-linear group-hover:top-8 top-12 group-hover:scale-100 scale-90 group-hover:opacity-100 opacity-0 group-hover:pointer-events-auto pointer-events-none z-50">
					<div class="p-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-lg">
						<h3 class="font-semibold mb-3">Quiz Progress</h3>
						<div class="space-y-2">
							<div class="flex justify-between text-green-500">
								<span>Correct</span>
								<span>{{ currentScore.correctAnswers }}</span>
							</div>
							<div class="flex justify-between text-red-500">
								<span>Incorrect</span>
								<span>{{ incorrectAnswers }}</span>
							</div>
							<div class="flex justify-between text-purple-500">
								<span>Skipped</span>
								<span>{{ currentScore.skippedQuestions }}</span>
							</div>
							<hr />
							<div class="flex justify-between text-black">
								<span>Total</span>
								<span>{{ currentScore.totalQuestion }}</span>
							</div>
						</div>
					</div>
				</div>
				<div
					class="absolute w-full h-[3px] bottom-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 right-0 flex">
					<div class="w-full h-full bg-green-500" :style="{ width: correctPercentage + '%' }"></div>
					<div class="w-full h-full bg-red-500" :style="{ width: incorrectPercentage + '%' }"></div>
					<div class="w-full h-full bg-purple-500" :style="{ width: skippedPercentage + '%' }"></div>
				</div>
			</div>
			<div class="flex mt-10 justify-end lg:gap-10 flex-wrap lg:flex-nowrap min-h-fit">
				<div class="lg:w-2/5 w-full lg:mt-0 mt-5 relative flex flex-col">
					<div class="relative" :style="{ height: alertViewHeight }">
						<transition name="fade" class="lg:absolute static top-0 w-full">
							<formatGuide
								id="formatGuide"
								:key="store.state.currentMode"
								:mode="store.state.currentMode"
								:rules="store.state.currentMode == 'naming' ? namingRules : writingRules" />
						</transition>
					</div>

					<div
						class="rounded-lg text-start border bg-card text-card-foreground shadow-sm bg-gradient-to-r from-pink-50 to-purple-50 p-4 mt-6">
						<div class="flex items-start gap-3">
							<div class="bg-pink-100 rounded-full p-2">
								<Lightbulb class="lucide lucide-lightbulb w-5 h-5 text-pink-600" />
							</div>
							<div>
								<h3 class="font-semibold text-base text-pink-700 mb-1">Did you know ?</h3>
								<p class="text-sm text-pink-600/90">
									You can make <span class="font-medium">576</span> binary compounds with just Grade 10
									elements!
								</p>
							</div>
						</div>
					</div>
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
		<alertView />
		<router-link
			to="/guide"
			class="inline-flex my-10 items-center justify-center text-zinc-900 bg-white font-medium shadow-sm cursor-pointer h-8 rounded-md px-3 py-5 text-sm">
			<BookOpenIcon class="mr-2 h-4 w-4" />
			Need help? View Naming Guide
		</router-link>
		<footer class="text-center text-white text-xs">
			<div>© {{ new Date().getFullYear() }} Chemistry Formula Quiz. Happy learning!</div>
			<div>developed by <a href="https://github.com/athena3140" class="underline hover:no-underline">athena3140</a></div>
		</footer>
	</div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { TrophyIcon, PencilIcon, BookA, BookOpenIcon, Lightbulb } from "lucide-vue-next"
import formatGuide from "../components/formatGuide.vue"
import alertView from "../components/alertView.vue"

const store = useStore()
const router = useRouter()
const isFirstTime = ref(true)
const currentMode = computed(() => store.state.currentMode)
const alertViewHeight = ref("")

const currentScore = computed(() => store.state.currentScore)
const currentCorrect = ref(currentScore.value.correctAnswers)
const currentTotal = ref(currentScore.value.totalQuestion)
const incorrectAnswers = ref(
	currentScore.value.totalQuestion - (currentScore.value.correctAnswers + currentScore.value.skippedQuestions)
)

// Watch for changes in the score and update the values
watch(
	currentScore,
	(newScore) => {
		currentCorrect.value = newScore.correctAnswers
		currentTotal.value = newScore.totalQuestion
		incorrectAnswers.value =
			currentScore.value.totalQuestion - (currentScore.value.correctAnswers + currentScore.value.skippedQuestions)
	},
	{ immediate: true }
)

const correctPercentage = computed(() => calculatePercentage(currentScore.value.correctAnswers))
const incorrectPercentage = computed(() => calculatePercentage(incorrectAnswers.value))
const skippedPercentage = computed(() => calculatePercentage(currentScore.value.skippedQuestions))

const calculatePercentage = (value) => {
	if (value === 0) return 0
	return (value / currentScore.value.totalQuestion) * 100
}

onMounted(() => {
	changeHeight()
	window.addEventListener("resize", changeHeight)
	setTimeout(() => {
		isFirstTime.value = false
	}, 150)
})

const changeHeight = () => {
	alertViewHeight.value = `${document.getElementById("formatGuide").offsetHeight}px`
}

const namingRules = [
	{ correct: true, text: "Capitalization doesn't matter (e.g., 'carbon dioxide')." },
	{ correct: true, text: "Use British english (e.g., 'Sulphide')." },
	{ correct: true, text: "Use spaces for multi-word names" },
	{ correct: false, text: "Don't use chemical symbols or formulas" },
	{ correct: false, text: "Don't include charges or states" },
]

const writingRules = [
	{ correct: true, text: "Use correct element symbols (e.g., 'H' for Hydrogen)" },
	{ correct: true, text: "Use numbers for subscripts (e.g., 'H2O' not 'H₂O')" },
	{ correct: true, text: "Capitalize correctly (e.g., 'CO2' not 'Co2')" },
	{ correct: false, text: "Don't use spelled-out element names" },
	{ correct: false, text: "Don't include charges or states" },
]

const changeMode = (newMode) => {
	currentMode.value !== newMode ? store.commit("changeMode", newMode) : null
	newMode == "writing" ? router.push("/writing") : router.push("/")
}

const pesudoStyles = computed(() => {
	return {
		"--translate-X": currentMode.value == "naming" ? "calc(-100% - 1rem)" : "0%",
		"--transition": isFirstTime.value ? "0" : "150ms",
	}
})
</script>

<style scoped>
.number-up-enter-active,
.number-up-leave-active {
	transition: transform 0.5s ease, opacity 0.5s ease;
}

.number-up-enter-from {
	@apply -translate-x-1/2 translate-y-6;
}

.number-up-leave-to {
	@apply -translate-x-1/2 -translate-y-6;
	opacity: 0;
}

footer {
	animation: scroll linear;
	animation-timeline: view();
	animation-range: 0 30px;
	animation-fill-mode: forwards;
	opacity: 0;
}

@keyframes scroll {
	100% {
		opacity: 1;
	}
}

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
