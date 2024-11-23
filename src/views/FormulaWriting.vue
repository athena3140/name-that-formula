<template>
	<div>
		<div class="text-center">
			<h3 class="title">Write the formula for:</h3>
			<div class="name text-pink-600">{{ formulaInfo.name }}</div>
		</div>
		<div class="space-y-6 mt-10">
			<div>
				<label for="input" class="label">Your Answer:</label>
				<div
					tabindex="0"
					class="border group text-start border-1 border-zinc-400 px-6 md:text-lg text-base py-4 rounded-md relative">
					<!-- {{ input }} <br />
					{{ splitInput(input) }} -->
					<div v-if="input" class="flex items-center tracking-wide">
						<div
							v-for="(char, index) in splitInput(input)"
							:key="index"
							v-html="displayFormat(char)"
							:class="{
								'cursor-active': cursorIndex === index,
								'cursor-right': isRightSideCursor,
								'cursor-left': !isRightSideCursor,
							}"
							@click="(event) => moveCursor(index, event)"></div>
					</div>
					<template v-else>
						<div class="text-gray-400 group-focus:opacity-0 select-none cursor-text">
							Enter the formula of the compound
						</div>
						<div
							class="cursor-left cursor-active opacity-0 group-focus:opacity-100 w-2 !h-[calc(100%-2rem)] !absolute top-4 left-6"></div>
					</template>
				</div>
			</div>

			<onScreenKeyboard @keyClick="processKeyboardInput" @deleteClick="processKeyboardInput('delete')" />
			<div class="flex space-x-4">
				<button class="btn submit" @click="checkAnswer()" :disabled="isDisabled">Check Answer</button>
				<button
					class="btn skip"
					type="button"
					@click="[generate(), store.commit('updateScore', { isSkipped: true })]"
					:disabled="isDisabled">
					<SkipForwardIcon class="mr-2 h-5 w-5" />
					Skip Question
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { generateFormulaAndName, getRandomName } from "../utils/formulaHelper.js";
import { SkipForwardIcon } from "lucide-vue-next";
import { useStore } from "vuex";
import onScreenKeyboard from "@/components/onScreenKeyboard.vue";

const store = useStore();
store.commit("changeMode", "writing");

let formulaInfo = ref({ formula: "", name: "" }); // to access from template
const isFirstTime = ref(true);
const input = ref("");
// const input = ref("Zn(H_2PO_4)_2");
const currentData = computed(() => store.state.currentData.writing);
const isDisabled = ref(false); // to add disabled after submit

onMounted(() => {
	document.addEventListener("keydown", (e) => {
		const isNumber = /^[0-9]$/i.test(e.key);
		if (isNumber) {
			processKeyboardInput(e.key);
		}
		e.key === "Enter" && checkAnswer();
		e.key === "Backspace" && processKeyboardInput("delete");
	});
});

const checkAnswer = () => {
	isDisabled.value = true;
	const inputValue = input.value;

	if (!inputValue) {
		store.commit("changeAlertStatus", {
			message: "Please enter the formula of the compound.",
		});
		setTimeout(() => {
			isDisabled.value = false;
		}, 3000);
		return;
	}

	if (inputValue === formulaInfo.value.formula) {
		store.commit("changeAlertStatus", { isCorrect: true, message: "Correct!" });
		store.commit("updateScore", { isCorrect: true });
		regenerate();
	} else {
		store.commit("changeAlertStatus", {
			isCorrect: false,
			message: `Oops! That's not quite right. The correct answer is ${formatChemicalFormula(
				formulaInfo.value.formula
			)}. You type ${inputValue}.`,
			duration: 5000,
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
		cursorIndex.value = Math.abs(splitInput(input.value) ? splitInput(input.value).length - 1 : splitInput(input.value));
		generate();
		isDisabled.value = false;
	}, timeout);
};

/**
 * Process input from the on-screen keyboard
 * @param {string} key - the key that was pressed
 * @description
 * This function processes the input from the on-screen keyboard and updates the formula accordingly.
 * It handles the following logic:
 * - if the input is empty, add the key to the input
 * - if the key is "delete", remove the character at the current cursor position
 * - if the key is a number, add an underscore before the number
 * - if the key is not a number or "delete", add the key to the current element in the array
 * - if the key is added to the beginning of an element, move the cursor to the right side of the element
 * - if the key is added to the end of an element, move the cursor to the left side of the element
 * - if the key is added to the end of the array, move the cursor to the right side of the array
 * - if the key is added to the beginning of the array, move the cursor to the left side of the array
 */
const processKeyboardInput = (key) => {
	let inputArr = splitInput(input.value); // convert text to array "Zn(H_2PO_4)_2" => [ "Zn", "(", "H", "_2", "P", "O", "_4", ")", "_2" ]
	let splitIndex = cursorIndex.value; // current cursor index
	let element = inputArr ? inputArr[splitIndex] : ""; // current element in the array

	// to add cursor at the end if the key has underscore e.g. NH_4
	let count;
	if (key.includes("_")) count = splitInput(key).length - 1 + cursorIndex.value;

	// if the key is number add underscore for formation
	if (!isNaN(key)) {
		key = `_${key}`;
	}

	// if the input is empty
	if (!inputArr) {
		if (key == "delete") return; // if key is delete return nothing

		input.value = key;

		if (count) cursorIndex.value = count;
		isRightSideCursor.value = true;
		return;
	}

	if (key == "delete") {
		if (splitIndex == 0 && !isRightSideCursor.value) return;

		inputArr[splitIndex] = "";
		input.value = inputArr.join("");

		if (cursorIndex.value == 0 && isRightSideCursor.value) {
			cursorIndex.value = 0;
			isRightSideCursor.value = false;
			return;
		}

		cursorIndex.value--;
		return;
	}

	inputArr[splitIndex] = isRightSideCursor.value ? element + key : key + element;
	input.value = inputArr.join("");

	if (splitIndex == 0 && !isRightSideCursor.value) {
		if (count) cursorIndex.value = count;
		isRightSideCursor.value = true;
		return;
	}

	if (count) cursorIndex.value = count;
	cursorIndex.value++;
};

const splitInput = (text) => (text ? text.match(/[A-Z][a-z]?|\(\)|\(|\)|_\d+/g) : "");
const cursorIndex = ref(Math.abs(splitInput(input.value) ? splitInput(input.value).length - 1 : splitInput(input.value)));

const isRightSideCursor = ref(true);

const moveCursor = (index, event) => {
	const elementWidth = event.target.offsetWidth;
	const clickPosition = event.offsetX;

	isRightSideCursor.value = clickPosition > elementWidth / 2;

	if (!isRightSideCursor.value) {
		if (index != 0) {
			index--;
			isRightSideCursor.value = true;
		}
	}

	// console.log(index);
	// console.log(splitInput(input.value)[index]);
	cursorIndex.value = index;
};

const displayFormat = (text) => (/^_\d+$/.test(text) ? `<sub>${text.slice(1)}</sub>` : text);
const formatChemicalFormula = (formula) => formula.replace(/([A-Za-z)])_(\d+)/g, "$1<sub>$2</sub>");
</script>

<style scoped>
.cursor-active {
	@apply relative;
}

.cursor-active::after {
	content: "";
	@apply absolute top-0 h-full w-[1px] animate-blink bg-red-500;
}

.cursor-active:last-child::after {
	@apply ms-[1px];
}
.cursor-active:first-child::after {
	@apply me-[1px];
}

.cursor-left.cursor-active:after {
	@apply right-full;
}

.cursor-right.cursor-active:after {
	@apply left-full;
}

.animate-blink {
	animation: blink 1.5s steps(2) infinite;
}

@keyframes blink {
	0% {
		opacity: 0;
	}
}
</style>
