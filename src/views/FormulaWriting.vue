<template>
	<div>
		<div class="text-center">
			<h3 class="title">Write the formula for:</h3>
			<div class="name text-pink-600">{{ formulaInfo.name }}</div>
		</div>
		<div class="space-y-6 mt-10">
			<div>
				<label for="input" class="label">Your Answer:</label>
				<div class="border text-start border-1 border-zinc-400 px-6 md:text-lg text-base py-4 rounded-md">
					<div v-if="input" v-html="format(input)"></div>
					<div v-else class="text-gray-400">Enter the formula of the compound</div>
				</div>
			</div>

			<onScreenKeyboard @keyClick="processKeyboardInput" @deleteClick="processDeleteInput" />

			<div class="flex space-x-4">
				<button class="btn submit" @click="checkAnswer()" :disabled="isDisabled">Check Answer</button>
				<button
					class="btn skip"
					type="button"
					@click="
						generate();
						store.commit('updateScore', { isSkipped: true });
					"
					:disabled="isDisabled">
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
import onScreenKeyboard from "@/components/onScreenKeyboard.vue";

const store = useStore();
store.commit("changeMode", "writing");

let formulaInfo = ref({ formula: "", name: "" }); // to access from template
const isFirstTime = ref(true);
const input = ref("");
const currentData = computed(() => store.state.currentData.writing);
const isDisabled = ref(false); // to add disabled after submit

const checkAnswer = () => {
	isDisabled.value = true;
	const inputValue = input.value;

	if (!inputValue) {
		store.commit("changeAlertStatus", {
			isData: true,
			message: "Please enter the formula of the compound.",
		});
		setTimeout(() => {
			isDisabled.value = false;
		}, 3000);
		return;
	}

	if (inputValue === formulaInfo.value.formula) {
		store.commit("changeAlertStatus", { isData: true, isCorrect: true, message: "Correct!" });
		store.commit("updateScore", { isCorrect: true });
		regenerate();
	} else {
		store.commit("changeAlertStatus", {
			isData: true,
			isCorrect: false,
			message: `Oops! That's not quite right. The correct answer is ${formulaInfo.value.formula}.`,
			isFormula: true,
			timeout: 5000,
		});
		store.commit("updateScore", { isCorrect: false });
		regenerate(5000);
	}
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
		isDisabled.value = false;
	}, timeout);
};

const processKeyboardInput = (key) => {
	if (!isNaN(key)) {
		input.value += `_${key}`;
		return;
	}
	input.value += key;
};

const processDeleteInput = () => {
	const lastChar = input.value.slice(-1);
	const sliceAmount = !isNaN(lastChar) || !isUpperCase(lastChar) ? -2 : -1;
	sliceString(sliceAmount);
};


const sliceString = (value) => (input.value = input.value.slice(0, value));
const isUpperCase = (str) => str === str.toUpperCase();
const format = (formula) => formula.replace(/_(\d+)/g, "<sub>$1</sub>");
</script>
