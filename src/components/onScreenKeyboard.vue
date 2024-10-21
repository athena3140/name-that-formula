<template>
	<div>
		<div class="grid grid-cols-7 gap-2 mb-5 md:grid-rows-2 grid-rows-1">
			<template v-for="(number, index) in numbers" :key="index">
				<button
					@click="emit('deleteClick', true)"
					v-if="index === (isMdScreen ? 6 : 5)"
					class="button bg-red-600 active:!bg-red-700 !h-full text-white border-transparent gap-2 md:col-span-1 col-span-2 md:row-span-2 row-span-1">
					<Delete />
				</button>
				<button @click="emitClick(number)" class="button" v-html="number"></button>
			</template>
		</div>
		<div class="flex gap-2 overflow-hidden" id="onScreenKeyboard">
			<div
				class="min-w-full grid lg:grid-cols-6 grid-cols-5 gap-2 transition-all duration-500"
				:style="{ transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 0.5}rem))` }">
				<button
					@click="emitClick(element)"
					v-for="element in elements"
					:key="element"
					class="button"
					v-html="format(element)"></button>
			</div>
			<div
				class="min-w-full grid lg:grid-cols-6 grid-cols-5 gap-2 transition-all duration-500 mb-2"
				:style="{ transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 0.5}rem))` }">
				<button
					@click="emitClick(radical)"
					v-for="radical in radicals"
					:key="radical"
					class="button"
					v-html="format(radical)"></button>
			</div>
		</div>
		<div class="mx-auto flex gap-1 justify-center items-center w-fit mt-3">
			<button
				class="indicatorBtn me-1"
				:class="currentSlide === 0 ? 'active' : ''"
				@click="prevSlide"
				:disabled="currentSlide === 0"></button>
			<button
				class="indicatorBtn"
				:class="currentSlide === totalSlides - 1 ? 'active' : ''"
				@click="nextSlide"
				:disabled="currentSlide === totalSlides - 1"></button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Delete } from "lucide-vue-next";
import Hammer from "hammerjs";

// eslint-disable-next-line no-undef
const emit = defineEmits(["keyClick", "deleteClick"]);

const numbers = "1234567890()".split("");
const elements = [
	"Na",
	"K",
	"Ca",
	"Ba",
	"Fe",
	"Sn",
	"Pb",
	"Cu",
	"Hg",
	"Ag",
	"Mg",
	"Al",
	"Mn",
	"Zn",
	"NH_4",
	"C",
	"P",
	"H",
	"S",
	"N",
	"F",
	"O",
	"Cl",
	"Br",
	"I",
];
const radicals = [
	"Cl",
	"Br",
	"I",
	"NO_2",
	"NO_3",
	"ClO_3",
	"HCO_3",
	"CO_3",
	"HSO_3",
	"SO_3",
	"HSO_4",
	"SO_4",
	"H_2PO_4",
	"HPO_4",
	"PO_4",
	"OH",
];

const currentSlide = ref(0); // Reactive slide tracker
const totalSlides = 2;

const nextSlide = () => {
	if (currentSlide.value < totalSlides - 1) {
		currentSlide.value++;
	}
};
const prevSlide = () => {
	if (currentSlide.value > 0) {
		currentSlide.value--;
	}
};

const emitClick = (key) => {
	emit("keyClick", key);
};

const isMdScreen = ref(window.innerWidth >= 768);
const updateScreenSize = () => {
	isMdScreen.value = window.innerWidth >= 768;
};
onMounted(() => {
	const carousel = document.getElementById("onScreenKeyboard");
	const hammer = new Hammer(carousel);

	hammer.on("panend", (e) => {
		e.additionalEvent == "panright" ? prevSlide() : nextSlide();
	});

	window.addEventListener("resize", updateScreenSize);
	updateScreenSize();
});

const format = (formula) => {
	return formula.replace(/([A-Za-z)])_(\d+)/g, "$1<sub>$2</sub>");
};
</script>

<style scoped>
.button {
	@apply inline-flex items-center active:bg-gray-50 transition justify-center text-sm font-medium border h-9 rounded-md px-3;
}

.indicatorBtn {
	@apply h-2 w-2 bg-gray-200  rounded-full transition-all;
}

.indicatorBtn.active {
	@apply !bg-gray-400;
}
</style>
