<template>
	<div>
		<div class="text-center">
			<h3 class="title">Name this formula:</h3>
			<div class="formula text-purple-600" v-html="formatChemicalFormula(formulaInfo.formula)"></div>
		</div>
		<div class="space-y-6 mt-10">
			<div>
				<label for="input" class="label">Your Answer:</label>
				<input
					@keyup.enter="checkAnswer"
					v-model="input"
					type="text"
					id="input"
					placeholder="Enter the name of the compound"
					class="input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:ring-zinc-400 text-xlinput" />
			</div>

			<div class="flex space-x-4">
				<button class="btn submit" @click="checkAnswer()" :disabled="isDisabled">Check Answer</button>
				<button class="btn skip" @click="generate()" :disabled="isDisabled">
					<SkipForwardIcon class="mr-2 h-5 w-5" />
					Skip Question
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { generateFormulaAndName, getRandomFormula } from "../utils/formulaHelper.js";
import { SkipForwardIcon } from "lucide-vue-next";
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
store.commit("changeMode", "naming");
let formulaInfo = ref({ formula: "", name: "" }); // to access from template
const isFirstTime = ref(true);
const input = ref("");
const currentData = computed(() => store.state.currentData.naming);
const isDisabled = ref(false); // to add disabled after submit

const checkAnswer = () => {
	isDisabled.value = true;
	const inputValue = input.value.trim().toLowerCase();
	if (!inputValue) {
		store.commit("changeAlertStatus", {
			isData: true,
			isCorrect: false,
			message: "Please enter the name of the compound.",
		});
		setTimeout(() => {
			isDisabled.value = false;
		}, 3000);
		return;
	}

	if (inputValue === formulaInfo.value.name.toLowerCase()) {
		store.commit("changeAlertStatus", { isData: true, isCorrect: true, message: "Correct!" });
		regenerate();
	} else {
		store.commit("changeAlertStatus", {
			isData: true,
			isCorrect: false,
			message: `Oops! That's not quite right. The correct answer is ${formulaInfo.value.name}.`,
		});
		regenerate();
	}
};

/**
 * Format a chemical formula with HTML subscripts
 * @param {string} formula - A chemical formula
 * @returns {string} - The formula with subscripts
 * @example
 * formatChemicalFormula("H2O") => "H<sub>2</sub>O"
 */
const formatChemicalFormula = (formula) => {
	return formula.replace(/([A-Za-z)])_(\d+)/g, "$1<sub>$2</sub>");
};

/**
 * Periodically change the formula value to a new, random formula,
 *    until the original formula is restored.
 * @example
 * formulaAnimation();
 * // formula.value will change every 30ms, until the original formula is restored
 */
const formulaAnimation = () => {
	const originalFormula = formulaInfo.value.formula;
	let counter = 0;
	const maxIterations = 6;
	let startTime = null;

	const animate = (timestamp) => {
		if (!startTime) startTime = timestamp;
		const progress = timestamp - startTime;

		if (counter < maxIterations) {
			formulaInfo.value.formula = getRandomFormula(originalFormula);

			counter = Math.floor(progress / 50);

			requestAnimationFrame(animate);
		} else {
			formulaInfo.value.formula = originalFormula;
		}
	};

	// Start the animation
	requestAnimationFrame(animate);
};

/**
 * Sets the formulaInfo object to the given newFormula and commits it to the Vuex store as the currentData.
 * @param {Object} newFormula - The new formula object to set the formulaInfo to.
 */
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

const regenerate = () => {
	setTimeout(() => {
		input.value = "";
		generate();
		isDisabled.value = false;
	}, 3000);
};
</script>
