<template>
	<div class="container relative lg:w-4/5 mx-auto lg:p-8 p-2 py-10 min-h-dvh flex items-center justify-center flex-col">
		<div class="w-full shadow-2xl bg-white rounded py-10 md:px-10 px-5">
			<div class="text-center">
				<h1 class="heading text-balance lg:text-4xl md:text-3xl text-2xl">
					Binary Compound Formula Writing & Naming Guide
				</h1>
				<p class="md:text-xl text-sm md:my-4 my-2">Learn the rules for naming & writing compounds</p>
			</div>

			<main class="mt-20 guide lg:px-8">
				<div class="space-y-20 mb-20">
					<!-- About binary compounds -->
					<section>
						<h2 class="sectionTitle">
							<Biohazard class="mr-2 h-6 w-6" />
							What is a Binary Compounds?
						</h2>

						<p>
							A binary compound consists of <em>only two elements</em>. In metallic binary compounds, one
							element is a metal, while in non-metallic binary compounds, both elements are non-metals.
						</p>

						<div class="mb-5">
							<h3 class="subHeading">Order of Symbols in a Formula:</h3>
							<div class="flex items-center justify-center gap-3">
								<div class="flex gap-3 items-center flex-col">
									<div class="guideBorderBox">positive oxidation number</div>
									<div class="guideBorderBox">first symbol</div>
								</div>
								<div class="flex gap-3 items-center flex-col">
									<div class="guideBorderBox">negative oxidation number</div>
									<div class="guideBorderBox">second symbol</div>
								</div>
							</div>
						</div>

						<p>
							One exception is <span class="text-pink-600">NH<sub>3</sub></span> in which the symbol of
							nitrogen with negative oxidation number (N) is written first.
						</p>
					</section>

					<!-- formula writing -->
					<section id="formula-writing">
						<h2 class="sectionTitle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-6 w-6 skew-x-[-18deg]"
								viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M10 2a4 4 0 0 0-4 4v3H3v2h3v7a2 2 0 0 1-2 2H3v2h1a4 4 0 0 0 4-4v-7h3V9H8V6a2 2 0 0 1 2-2h1V2zm5.202 14.997L11.891 21h2.595l2.014-2.434L18.514 21h2.595l-3.311-4.003L21.105 13h-2.596L16.5 15.428L14.491 13h-2.595z"></path>
							</svg>
							Formula Writing
						</h2>
						<p>
							To write <em>binary compound formula</em>, we need to balance the charges. The positive and
							negative charges must equal zero. We use
							<span to="oxidation-numbers" class="link">oxidation numbers</span> to represent the charges.
						</p>

						<div>
							<div class="rule-box">
								The sum of positive oxidation number + The sum of negative oxidation number = 0
							</div>
						</div>

						<div>
							<h3 class="boxHeader">Examples:</h3>
							<TableView :data="formulaWritingTable" />
						</div>

						<p class="text-center pt-5">
							Feeling confident?
							<router-link class="link" to="/writing">Test your skills!</router-link>
						</p>
					</section>

					<!-- About Naming Binary Compounds -->
					<section>
						<h2 class="sectionTitle"><NotebookPen class="mr-2 h-6 w-6" /> Naming Binary Compounds</h2>

						<p>
							When naming binary compounds, there are three common approaches based on the oxidation states
							of the elements involved.
						</p>
						<ol class="ol text-sm">
							<li>If one element has a fixed charge, use "-ide."</li>
							<li>If the first element is a non-metal with variable charges, use prefixes.</li>
							<li>If the first element is a metal with variable charges, use Roman numerals.</li>
						</ol>
					</section>

					<!-- first naming mode -->
					<section id="formula-naming">
						<h2 class="subHeading">1. Naming Binary Compounds with a Fixed Oxidation number</h2>

						<p>
							When the first element in the compound has a fixed
							<span to="oxidation-numbers" class="link">oxidation number</span>, such as potassium (K),
							sodium (Na), hydrogen (H), or silver (Ag), we use this following method:
						</p>

						<div>
							<div class="rule-box">first element’s name + second element’s name ending in "-ide"</div>
						</div>

						<div>
							<h3 class="boxHeader">Examples:</h3>
							<TableView :data="firstNamingModeTable" />
						</div>
					</section>

					<!-- second naming mode -->
					<section>
						<h2 class="subHeading">2. Non-metallic Binary Compounds with Variable Oxidation Number</h2>
						<p>
							In this mode, the first element is a <span class="link" to="non-metals">non-metal</span> with a
							variable <span class="link" to="oxidation-numbers">oxidation number</span>. We use the prefix
							method to indicate the number of atoms in each compound:
						</p>

						<div class="flex gap-3 justify-center">
							<div class="guideBorderBox border-purple-500 text-base font-normal">
								<span class="link !text-pink-500" to="prefix">prefix</span> + first element's name
							</div>
							<div class="guideBorderBox border-pink-600 text-base font-normal">
								<span class="link !text-purple-500" to="prefix">prefix</span> + second element’s name
								ending in "-ide"
							</div>
						</div>

						<div class="!my-10">
							<h3 class="font-sm font-semibold mb-3">Notes:</h3>
							<ol class="ol text-sm">
								<li>
									Omit the prefix mono- for the first element if it has only one atom.
									<div class="ps-4">e.g., CO → Carbon monoxide (not Monocarbon monoxide).</div>
								</li>
								<li>
									Drop the last character ('o' or 'a') from prefixes like mono- or penta- when combined
									with oxiygen.
									<div class="ps-4">e.g., N₂O → Dinitrogen monoxide (not monooxide).</div>
									<div class="ps-4">e.g., P₂O₅ → Diphosphorus pentoxide (not pentaoxide).</div>
								</li>
							</ol>
						</div>

						<div id="prefix" class="py-3 !my-10 rounded">
							<h3 class="boxHeader">Prexifex:</h3>
							<div class="flex flex-wrap gap-3">
								<div
									class="px-4 py-1 align-middle text-center border-gray-300 border"
									v-for="prefix in secondNamingModeTable.prefixes"
									:key="prefix">
									{{ prefix }}
								</div>
							</div>
						</div>

						<div class="examples">
							<h3 class="boxHeader">Examples:</h3>
							<TableView :data="secondNamingModeTable.exampleTable" />
						</div>
					</section>

					<!-- third naming mode -->
					<section>
						<h2 class="subHeading">3.Metallic Binary Compounds with Variable Oxidation Number</h2>
						<p>
							In this mode, the first element is a <span class="link" to="metals">metal</span> with a
							variable <span class="link" to="oxidation-numbers">oxidation number</span>. To represent the
							<span class="link" to="oxidation-numbers">oxidation number</span> of the metal, we use Roman
							numerals placed in parentheses after the metal’s name.
						</p>

						<div class="flex gap-3 justify-center">
							<div class="guideBorderBox md:text-base border-purple-500 font-normal text-balance">
								first element's name + Oxidation number in (
								<span class="link !text-pink-500" to="roman-numerals">Roman Numeral</span>)
							</div>
							<div class="guideBorderBox md:text-base text-sm border-pink-600 font-normal text-balance">
								second element’s name ending in "-ide"
							</div>
						</div>

						<div id="roman-numerals" class="py-3 !my-10 rounded">
							<h3 class="boxHeader">Roman Numeral:</h3>
							<div class="flex flex-wrap gap-3">
								<div
									class="px-4 py-1 align-middle text-center border-gray-300 border"
									v-for="romanNumeral in thirdNamingMode.romanNumeral"
									:key="romanNumeral">
									{{ romanNumeral }}
								</div>
							</div>
						</div>

						<div class="examples">
							<h3 class="boxHeader">Examples:</h3>
							<TableView :data="thirdNamingMode.exampleTable" />
						</div>
					</section>

					<!-- Salts -->
					<section>
						<h2 class="sectionTitle">
							<svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" viewBox="0 0 24 24">
								<g
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2">
									<path
										d="M12 13v.01M10 16v.01m4-.01v.01M7.5 8h9l-.281-2.248A2 2 0 0 0 14.234 4H9.766A2 2 0 0 0 7.78 5.752z" />
									<path
										d="m7.5 8l-1.612 9.671A2 2 0 0 0 7.861 20h8.278a2 2 0 0 0 1.973-2.329L16.5 8" />
								</g>
							</svg>
							Salts
						</h2>

						<p>
							In salts formula, the first part of the formula is always a
							<span class="link" to="metals">metal</span> or ammonium (NH₄⁺), and the second part is an
							<span class="link" to="acid">acid radical</span>.
						</p>

						<div class="mb-5">
							<div class="flex items-center justify-center gap-3">
								<div class="flex gap-3 items-center flex-col">
									<div class="guideBorderBox">metal atom or NH₄⁺</div>
									<div class="guideBorderBox">first part</div>
								</div>
								<div class="flex gap-3 items-center flex-col">
									<div class="guideBorderBox">acid radical</div>
									<div class="guideBorderBox">second part</div>
								</div>
							</div>
						</div>
					</section>

					<!-- Salt Formula Writing -->
					<section>
						<h2 class="sectionTitle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-6 w-6 skew-x-[-18deg]"
								viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M10 2a4 4 0 0 0-4 4v3H3v2h3v7a2 2 0 0 1-2 2H3v2h1a4 4 0 0 0 4-4v-7h3V9H8V6a2 2 0 0 1 2-2h1V2zm5.202 14.997L11.891 21h2.595l2.014-2.434L18.514 21h2.595l-3.311-4.003L21.105 13h-2.596L16.5 15.428L14.491 13h-2.595z"></path>
							</svg>
							Salt Formula Writing
						</h2>
						<p>
							To write the formula of salts, it follows the same rules as
							<span class="link" to="formula-writing">binary compound</span> formulas. The charges must
							balance, with the first part being a <span to="oxidation-numbers" class="link">metal</span> or
							ammonium and the second part an <span to="oxidation-numbers" class="link">acid radical</span>.
						</p>

						<div>
							<h3 class="boxHeader">Examples:</h3>
							<TableView :data="saltFormulaWritingTable" />
						</div>
					</section>

					<!-- Salt Formula Naming -->
					<section id="salt-naming">
						<h2 class="sectionTitle">
							<NotebookPen class="mr-2 h-6 w-6" />
							Salt Formula Naming
						</h2>
						<p>
							The naming of salts follows the same rules as
							<span class="link" to="formula-naming">binary compound</span>. If the
							<span to="oxidation-numbers" class="link">metal</span> in the salt has a fixed oxidation state,
							we use the simple naming method.
						</p>

						<div class="mb-5">
							<h3 class="boxHeader">1. Salt Naming with Fixed Oxidation State</h3>
							<div class="flex gap-3 justify-center">
								<h3 class="guideBorderBox border-purple-500 text-base font-normal">
									name of metal or ammonium radical
								</h3>
								<div class="guideBorderBox border-pink-600 text-base font-normal">
									name of acid radical
								</div>
							</div>
						</div>

						<div>
							<h3 class="boxHeader">Examples:</h3>
							<TableView :data="saltFirstNamingModeTable" />
						</div>

						<div class="mt-10 mb-5">
							<h3 class="boxHeader">2. Salt Naming with Variable Oxidation State</h3>
							<div class="flex gap-3 justify-center">
								<div class="guideBorderBox border-purple-500 text-base font-normal text-balance">
									name of metal or ammonium radical + Oxidation number in &lpar;
									<span class="link !text-pink-500" to="roman-numerals"> Roman Numeral </span>
									&rpar;
								</div>
								<div class="guideBorderBox border-pink-600 text-base font-normal">
									name of acid radical
								</div>
							</div>
						</div>

						<div>
							<h3 class="boxHeader">Examples:</h3>
							<TableView :data="saltSecondNamingModeTable" />
						</div>
					</section>

					<!-- Hydroxide -->
					<section>
						<h2 class="sectionTitle">
							<FlaskConical class="mr-2 h-6 w-6" />
							Hydroxides
						</h2>

						<p>
							In hydroxides formula, the first part of the formula is always a
							<span class="link" to="metals">metal</span> or ammonium (NH₄⁺), and the second part is the
							hydroxide radical (OH⁻), which carries a -1 oxidation state.
						</p>

						<div class="mb-5">
							<div class="flex items-center justify-center gap-3">
								<div class="flex gap-3 items-center flex-col">
									<div class="guideBorderBox">metal atom or NH₄⁺</div>
									<div class="guideBorderBox">first part</div>
								</div>
								<div class="flex gap-3 items-center flex-col">
									<div class="guideBorderBox">hydroxide radical</div>
									<div class="guideBorderBox">second part</div>
								</div>
							</div>
						</div>
					</section>

					<!-- Hydroxide Formula Writing -->
					<section>
						<h2 class="sectionTitle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-6 w-6 skew-x-[-18deg]"
								viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M10 2a4 4 0 0 0-4 4v3H3v2h3v7a2 2 0 0 1-2 2H3v2h1a4 4 0 0 0 4-4v-7h3V9H8V6a2 2 0 0 1 2-2h1V2zm5.202 14.997L11.891 21h2.595l2.014-2.434L18.514 21h2.595l-3.311-4.003L21.105 13h-2.596L16.5 15.428L14.491 13h-2.595z"></path>
							</svg>
							Hydroxide Formula Writing
						</h2>
						<p>
							Just like <span class="link" to="salt-naming">salts</span>, the formula of hydroxides follows
							the same balancing rules, where the charges of the
							<span class="link" to="salts">metal</span> (or ammonium) and hydroxide must equal zero.
						</p>

						<div>
							<h3 class="boxHeader">Examples:</h3>
							<TableView :data="hydroxideFormulaWritingTable" />
						</div>
					</section>

					<!-- Hydroxide Formula Naming -->
					<section>
						<h2 class="sectionTitle">
							<NotebookPen class="mr-2 h-6 w-6" />
							Hydroxides Formula Naming
						</h2>
						<p>
							The naming of hydroxides follows the same rules as
							<span class="link" to="salt-naming">salts</span>. If the
							<span to="metals" class="link">metal</span> in the hydroxide has a fixed oxidation state, we
							use the simple naming method.
						</p>

						<div class="mb-5">
							<h3 class="boxHeader">1. Hydroxides Naming with Fixed Oxidation State</h3>
							<div class="flex gap-3 justify-center">
								<h3 class="guideBorderBox border-purple-500 text-base font-normal">
									name of metal or ammonium radical
								</h3>
								<div class="guideBorderBox border-pink-600 text-base font-normal">
									name of hydroxide radical
								</div>
							</div>
						</div>

						<div>
							<h3 class="boxHeader">Examples:</h3>
							<TableView :data="hydroxideFirstNamingModeTable" />
						</div>

						<div class="mt-10 mb-5">
							<h3 class="boxHeader">2. hydroxide Naming with Variable Oxidation State</h3>
							<div class="flex gap-3 justify-center">
								<div class="guideBorderBox border-purple-500 text-base font-normal text-balance">
									name of metal or ammonium radical + Oxidation number in &lpar;
									<span class="link !text-pink-500" to="roman-numerals"> Roman Numeral </span>
									&rpar;
								</div>
								<div class="guideBorderBox border-pink-600 text-base font-normal">
									name of hydroxide radical
								</div>
							</div>
						</div>

						<div>
							<h3 class="boxHeader">Examples:</h3>
							<TableView :data="hydroxideSecondNamingModeTable" />
						</div>
					</section>

					<hr />
				</div>

				<div class="space-y-12">
					<section id="metals" class="!py-0">
						<h2 class="sectionTitle !mb-5">Symbols of some metallic elements</h2>
						<div class="flex gap-5 md:flex-nowrap flex-wrap">
							<TableView class="md:w-3/5 w-full" :data="metallicElementsTable.firstPart" />
							<TableView class="md:w-2/5 w-full" :data="metallicElementsTable.secondPart" />
						</div>
					</section>

					<section id="non-metals">
						<h2 class="sectionTitle !mb-5">Symbols of some non-metallic elements</h2>
						<TableView class="w-full" :data="nonMetallicElementsTable" />
					</section>

					<section id="oxidation-numbers">
						<h2 class="sectionTitle !mb-5">common oxidation number of some elements</h2>
						<div class="grid grid-cols-1 md:grid-cols-2 md:gap-5">
							<TableView :data="oxidationNumbersTable.firstPart" />
							<TableView :data="oxidationNumbersTable.secondPart" />
						</div>
					</section>

					<section id="acid-radicals">
						<h2 class="sectionTitle !mb-5">Acid Radicals</h2>
						<TableView :data="acidRadicals" />
					</section>
				</div>
			</main>
		</div>
		<footer class="mt-10 text-center text-white text-xs">
			<div>© {{ new Date().getFullYear() }} Chemistry Formula Quiz. Happy learning!</div>
			<div>developed by <a href="https://github.com/athena3140" class="underline hover:no-underline">athena3140</a></div>
		</footer>

		<div
			@click="scrollToElement(scrollBackElement)"
			class="mr-2 h-9 w-9 fixed bottom-0 right-0 cursor-pointer text-slate-800 transition-all cursor hover:text-gray-950"
			:class="scrollBackElement ? 'opacity-100 bottom-4 right-4 scale-100' : 'opacity-0 bottom-0 right-4 scale-50'">
			<CircleArrowUp v-if="isUp" class="w-full h-full text-inherit" />
			<CircleArrowDown v-else class="w-full h-full text-inherit" />
		</div>
	</div>
</template>

<script setup>
import { Biohazard, NotebookPen, FlaskConical, CircleArrowUp, CircleArrowDown } from "lucide-vue-next";
import TableView from "@/components/TableView.vue";
import { onMounted, ref } from "vue";
import $ from "jquery";

const scrollBackElement = ref("");
const isUp = ref(true);

onMounted(() => {
	$(".link[to]").click((e) => {
		scrollBackElement.value = e.currentTarget;
		setTimeout(() => {
			scrollBackElement.value = "";
		}, 10000);

		const element = `#${e.target.getAttribute("to")}`;
		$(element).addClass("activeBox");
		scrollToElement(element);

		if ($(e.currentTarget).offset().top > $(element).offset().top) {
			isUp.value = false;
		} else {
			isUp.value = true;
		}

		setTimeout(() => {
			$(element).addClass("active");
			setTimeout(() => {
				$(element).removeClass("active");
			}, 2000);
		}, 500);

		history.pushState(null, "", `${element}`);
	});
});

const scrollToElement = (element) => {
	$("html,body").animate(
		{
			scrollTop: $(element).offset().top - 200,
		},
		500
	);
};

const formulaWritingTable = {
	head: ["Elements", "Charges", "Formula"],
	body: [
		{ elements: "Na & Cl", charges: "Na1+ + Cl1-", formula: "NaCl" },
		{ elements: "Ca & O", charges: "Ca2+ + O2-", formula: "CaO" },
		{ elements: "Mg & Cl", charges: "Mg2+ + Cl1-", formula: "MgCl_2" },
		{ elements: "Al & O", charges: "Al3+ + O2-", formula: "Al_2O_3" },
	],
};
const firstNamingModeTable = {
	head: ["formula", "Name"],
	body: [
		{ formula: "H_2S", name: "hydrogen sulphide" },
		{ formula: "CaO", name: "calcium oxide" },
		{ formula: "BaCl_2", name: "barium chloride" },
		{ formula: "AlN", name: "aluminium nitride" },
	],
};
const secondNamingModeTable = {
	exampleTable: {
		head: ["formula", "Name"],
		body: [
			{ formula: "N_2O", name: "dinitrogen monoxide" },
			{ formula: "NO", name: "nitrogen monoxide" },
			{ formula: "N_2O_3", name: "dinitrogen trioxide" },
			{ formula: "NO_2", name: "nitrogen dioxide" },
			{ formula: "CCl_4", name: "carbon tetrachloride" },
		],
	},
	prefixes: ["mono-", "di-", "tri-", "tetra-", "penta-", "hexa-", "hepta-", "octa-", "nona-", "deca-"],
};
const thirdNamingMode = {
	exampleTable: {
		head: ["formula", "Name"],
		body: [
			{ formula: "FeCl_2", name: "iron(II) chloride" },
			{ formula: "FeI_3", name: "iron(III) iodide" },
			{ formula: "SnO_2", name: "tin(IV) oxide" },
			{ formula: "Sn_3N_2", name: "tin(II) nitride" },
			{ formula: "PbF_2", name: "lead(II) fluoride" },
			{ formula: "Pb_3N_2", name: "lead(II) nitride" },
		],
	},
	romanNumeral: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
};

const saltFormulaWritingTable = {
	head: ["Metal (or) Ammonium", "Acid Radical", "Formula"],
	body: [
		{ elements: "K & NO_3", data: "K<sup>+</sup> + NO<sub>3</sub><sup>-</sup>", formula: "KNO_3" },
		{ elements: "Ca & SO_4", data: "Ca<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup>", formula: "CaSO_4" },
		{
			elements: "Ca & HCO_3",
			data: "Ca<sup>2+</sup> + HCO<sub>3</sub><sup>-</sup> + HCO<sub>3</sub><sup>-</sup>",
			formula: "Ca(HCO_3)_2",
		},
		{
			elements: "NH_4 & SO_4",
			data: "NH<sub>4</sub><sup>+</sup> + NH<sub>4</sub><sup>+</sup> + SO<sub>4</sub><sup>2-</sup>",
			formula: "(NH_4)_2SO_4",
		},
	],
};

const saltFirstNamingModeTable = {
	head: ["formula", "Name"],
	body: [
		{ formula: "NaClO_3", name: "sodium chlorate" },
		{ formula: "K_2CO_3", name: "potassium carbonate" },
		{ formula: "Ca(ClO_3)_2", name: "calcium chlorate" },
	],
};

const saltSecondNamingModeTable = {
	head: ["formula", "Name"],
	body: [
		{ formula: "Fe(ClO_3)_3", name: "iron(III) chlorate" },
		{ formula: "Sn(ClO_3)_4", name: "tin(IV) chlorate" },
		{ formula: "Cu(ClO_3)_2", name: "copper(II) chlorate" },
	],
};

const hydroxideFormulaWritingTable = {
	head: ["Metal (or) Ammonium", "Hydroxide Radical", "Formula"],
	body: [
		{ elements: "Na & OH", data: "Na<sup>+</sup> + OH<sup>-</sup>", formula: "NaOH" },
		{ elements: "K & OH", data: "K<sup>+</sup> + OH<sup>-</sup>", formula: "KOH" },
		{ elements: "Ca & OH", data: "Ca<sup>2+</sup> + OH<sup>-</sup> + OH<sup>-</sup>", formula: "Ca(OH)_2" },
		{ elements: "NH_4 & OH", data: "NH<sub>4</sub><sup>+</sup> + OH<sup>-</sup>", formula: "NH_4OH" },
	],
};

const hydroxideFirstNamingModeTable = {
	head: ["formula", "Name"],
	body: [
		{ formula: "Mg(OH)_2", name: "magnesium hydroxide" },
		{ formula: "Al(OH)_3", name: "aluminium hydroxide" },
		{ formula: "Zn(OH)_2", name: "zinc hydroxide" },
	],
};

const hydroxideSecondNamingModeTable = {
	head: ["formula", "Name"],
	body: [
		{ formula: "Pb(OH)_2", name: "lead(II) hydroxide" },
		{ formula: "HgOH", name: "mercury(I) hydroxide" },
		{ formula: "Mn(OH)_2", name: "manganese(II) hydroxide" },
	],
};

const metallicElementsTable = {
	firstPart: {
		head: ["English Name", "Latin Name", "Symbol"],
		body: [
			{ english: "Sodium", latin: "_Na_trium", symbol: "Na" },
			{ english: "Potassium", latin: "_K_alium", symbol: "K" },
			{ english: "Iron", latin: "_Fe_rrum", symbol: "Fe" },
			{ english: "Tin", latin: "_S_ta_n_num", symbol: "Sn" },
			{ english: "Lead", latin: "_P_lum_b_um", symbol: "Pb" },
			{ english: "Copper", latin: "_Cu_prum", symbol: "Cu" },
			{ english: "Mercury", latin: "_H_ydrar_g_yrum", symbol: "Hg" },
			{ english: "Silver", latin: "_A_r_g_entum", symbol: "Ag" },
			{ english: "Gold", latin: "_Au_rum", symbol: "Au" },
			{ english: "Antimony", latin: "_S_ti_b_ium", symbol: "Sb" },
		],
	},

	secondPart: {
		head: ["English Name", "Symbol"],
		body: [
			{ english: "_Ca_lcium", symbol: "Ca" },
			{ english: "_Ba_rium", symbol: "Ba" },
			{ english: "_M_a_g_nesium", symbol: "Mg" },
			{ english: "_Al_uminium", symbol: "Al" },
			{ english: "_M_a_n_ganese", symbol: "Mn" },
			{ english: "_Z_i_n_c", symbol: "Zn" },
			{ english: "_C_h_r_omium", symbol: "Cr" },
			{ english: "_P_la_t_inum", symbol: "Pt" },
		],
	},
};

const nonMetallicElementsTable = {
	head: ["English Name", "Symbol"],
	body: [
		{ english: "_C_arbon", symbol: "C" },
		{ english: "_S_ulphur", symbol: "S" },
		{ english: "_P_hosphorus", symbol: "P" },
		{ english: "_O_xygen", symbol: "O" },
		{ english: "_H_ydrogen", symbol: "H" },
		{ english: "_N_itrogen", symbol: "N" },
		{ english: "_C_h_l_orine", symbol: "Cl" },
		{ english: "_Br_omine", symbol: "Br" },
		{ english: "_I_odine", symbol: "I" },
	],
};

const oxidationNumbersTable = {
	firstPart: {
		head: ["Element", "Oxidation Number"],
		body: [
			{ element: "sodium", oxidationNumber: "Na +1" },
			{ element: "potassium", oxidationNumber: "K +1" },
			{ element: "calcium", oxidationNumber: "Ca +2" },
			{ element: "barium", oxidationNumber: "Ba +2" },
			{ element: "magnesium", oxidationNumber: "Mg +2" },
			{ element: "aluminium", oxidationNumber: "Al +3" },
			{ element: "manganese", oxidationNumber: "Mn +2, +4, +7" },
			{ element: "zinc", oxidationNumber: "Zn +2" },
			{ element: "iron", oxidationNumber: "Fe +2, +3" },
			{ element: "tin", oxidationNumber: "Sn +2, +4" },
			{ element: "lead", oxidationNumber: "Pb +2, +4" },
			{ element: "copper", oxidationNumber: "Cu +1, +2" },
			{ element: "ammonium", oxidationNumber: "NH<sub>4</sub><sup>+1</sup>" },
		],
	},
	secondPart: {
		iscustomStyling: true,
		head: ["Element", "Oxidation Number"],
		body: [
			{ element: "mercury", oxidationNumber: "Hg +1, +2" },
			{ element: "silver", oxidationNumber: "Ag +1" },
			{ element: "carbon", oxidationNumber: "C +2, +4" },
			{ element: "sulphur", oxidationNumber: "S -2, +4, +6" },
			{ element: "phosphorus", oxidationNumber: "P +3, +5" },
			{ element: "oxygen", oxidationNumber: "O -2" },
			{ element: "hydrogen", oxidationNumber: "H +1" },
			{ element: "fluorine", oxidationNumber: "F -1" },
			{ element: "chlorine", oxidationNumber: "Cl -1" },
			{ element: "bromine", oxidationNumber: "Br -1" },
			{ element: "iodine", oxidationNumber: "I -1" },
			{ element: "nitrogen", oxidationNumber: "N -3, +1, +2, +3, +4, +5" },
			{ element: "Hydroxide", oxidationNumber: "OH<sup>+1</sup>" },
		],
	},
};

const acidRadicals = {
	head: ["Acid Radical", "Oxidation number"],
	body: [
		{ name: "chloride", acidRadical: "Cl -" },
		{ name: "bromide", acidRadical: "Br -" },
		{ name: "iodide", acidRadical: "I -" },
		{ name: "nitrite", acidRadical: "NO_2 -" },
		{ name: "nitrate", acidRadical: "NO_3 -" },
		{ name: "chlorate", acidRadical: "ClO_3 -" },
		{ name: "hydrogen carbonate", acidRadical: "HCO_3 -" },
		{ name: "carbonate", acidRadical: "CO_3 2-" },
		{ name: "hydrogen sulphite", acidRadical: "HSO_3 -" },
		{ name: "sulphite", acidRadical: "SO_3 2-" },
		{ name: "hydrogen sulphate", acidRadical: "HSO_4 -" },
		{ name: "sulphate", acidRadical: "SO_4 2-" },
		{ name: "dihydrogen phosphate", acidRadical: "H_2PO_4 -" },
		{ name: "hydrogen phosphate", acidRadical: "HPO_4 2-" },
		{ name: "phosphate", acidRadical: "PO_4 3-" },
	],
};
</script>

<style scoped>
section {
	@apply py-3;
}

ol.ol {
	@apply list-none space-y-2;

	& > li {
		position: relative;
		@apply lg:ps-8 md:ps-3 ps-6;
		counter-increment: item;

		&::before {
			position: absolute;
			left: 0;
			width: 1.5rem;
			content: counters(item, ".") ". ";
			text-align: center;
		}
	}
}

.rule-box {
	@apply bg-gray-100 border-l-4 border-purple-500 p-4 text-lg font-medium text-center text-balance w-full mb-5;
}

.activeBox {
	@apply relative;

	&::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: calc(100% + 20px);
		width: calc(100% + 50px);
		@apply rounded outline transition-all duration-500 outline-2 outline-transparent;
	}
}

.activeBox.active::after {
	height: 110%;
	width: calc(100% + 25px);
	height: calc(100% + 10px);
	@apply outline outline-2 outline-pink-500;
}

@media (min-width: 1024px) {
	.active::after {
		width: calc(100% + 50px) !important;
		height: calc(100% + 35px);
	}
}
@media (min-width: 768px) {
	.active::after {
		width: calc(100% + 50px);
		height: calc(100% + 20px);
	}
}

.guideBorderBox {
	@apply border-2  md:py-2 md:px-3 text-center p-2 md:text-base text-sm;
}

.sectionTitle {
	@apply md:text-2xl sm:text-xl text-lg capitalize font-semibold flex items-center mb-3;
}

.subHeading {
	@apply md:text-lg sm:text-base text-sm font-semibold mb-3;
}

.boxHeader {
	@apply text-sm font-semibold mb-3;
}

section p {
	@apply md:text-base text-sm leading-relaxed mb-5;
}

.link {
	@apply font-medium text-pink-600 cursor-pointer underline underline-offset-4 hover:no-underline;
}
</style>
