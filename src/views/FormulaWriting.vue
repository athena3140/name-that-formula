<template>
	<div>
		<div class="text-center">
			<h3 class="title">Write the formula for:</h3>
			<div class="name text-pink-600">{{ formulaInfo.name }}</div>
		</div>
		<div class="space-y-6 mt-10">
			<div>
				<label for="input" class="label">Your Answer:</label>
				<input
					type="text"
					id="input"
					v-model="input"
					@keyup.enter="checkAnswer"
					placeholder="Enter the formula of the compound"
					autocomplete="off"
					class="input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:ring-zinc-400 text-xlinput" />
			</div>

			<div class="flex space-x-4">
				<button class="btn submit" @click="checkAnswer()">Check Answer</button>
				<button class="btn skip" type="button" @click="generate()">
					<SkipForwardIcon class="mr-2 h-5 w-5" />
					Skip Question
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { generateFormulaAndName, getRandomName } from "../utils/formulaHelper.js";
import { SkipForwardIcon } from "lucide-vue-next";
import { useStore } from "vuex";
const store = useStore();
store.commit("changeMode", "writing");

let formulaInfo = ref({ formula: "", name: "" }); // to access from template
const isFirstTime = ref(true);
const input = ref("");
const currentData = computed(() => store.state.currentData.writing);

const checkAnswer = () => {
	const regex = /(\d)(?!\\_)/g;
	const inputValue = input.value.trim().replace(regex, "_$1");

	if (!inputValue) {
		store.commit("changeAlertStatus", {
			isData: true,
			isCorrect: false,
			message: "Please enter the formula of the compound.",
		});
		return;
	}

	if (inputValue === formulaInfo.value.formula) {
		store.commit("changeAlertStatus", { isData: true, isCorrect: true, message: "Correct!" });
		regenerate();
	} else {
		store.commit("changeAlertStatus", {
			isData: true,
			isCorrect: false,
			message: `Oops! That's not quite right. The correct answer is ${formulaInfo.value.formula}.`,
			isFormula: true,
			timeout: 5000,
		});
		regenerate(5000);
	}

	console.log("inputValue", inputValue);
	console.log("formulaInfo.value.formula", formulaInfo.value.formula);
};

const formulaAnimation = () => {
	const originalName = formulaInfo.value.name;
	let counter = 0;
	const maxIterations = 6;
	let startTime = null;

	const animate = (timestamp) => {
		if (!startTime) startTime = timestamp;
		const progress = timestamp - startTime;

		if (counter < maxIterations) {
			formulaInfo.value.name = getRandomName();

			counter = Math.floor(progress / 50);

			requestAnimationFrame(animate);
		} else {
			formulaInfo.value.name = originalName;
		}
	};

	requestAnimationFrame(animate);
};

const setFormulaAndCommit = (newFormula) => {
	formulaInfo.value = newFormula;
	store.commit("changeCurrentData", formulaInfo.value);
};

const generate = () => {
	if (isFirstTime.value) {
		if (!currentData.value) {
			const generatedFormula = generateFormulaAndName();
			isFirstTime.value = false;
			setFormulaAndCommit(generatedFormula);
			return;
		}

		formulaInfo.value = currentData.value;
		isFirstTime.value = false;
		return;
	}

	isFirstTime.value = false;
	const oldFormulaAndName = formulaInfo.value; // Pass the old formula to avoid generating a duplicate in generateFormulaAndName.
	const generatedFormula = generateFormulaAndName(oldFormulaAndName);
	setFormulaAndCommit(generatedFormula);
	formulaAnimation();
};
generate();

const regenerate = (timeout = 3000) => {
	setTimeout(() => {
		input.value = "";
		generate();
	}, timeout);
};
</script>
