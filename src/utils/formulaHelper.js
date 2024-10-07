import elements from "../assets/data.json";
// import elements from "../assets/debug.json";

export function generateFormulaAndName(oldFormulaAndName = {}) {
	let positiveElement = getRandomElement(elements.positive);
	let negativeElement = getRandomElement(elements.negative);
	let firstElementOxidationLength = positiveElement.oxidationNumber.length;
	let obj = "error";

	// non metal and acid radical =  impossible
	while (!positiveElement.isMetal && (negativeElement.isAcidRadical || negativeElement.isHydroxide)) {
		positiveElement = getRandomElement(elements.positive);
		firstElementOxidationLength = positiveElement.oxidationNumber.length;
		negativeElement = getRandomElement(elements.negative);
	}

	/**
	 * in some element with variable oxidation number that include both positive and negative oxidation number
	 *  (e.g. N,S) the first and second can't be the same.
	 */
	while (positiveElement.symbol == negativeElement.symbol) {
		negativeElement = getRandomElement(elements.negative);
	}

	/**
	 * ammonium is only pair with acid radical or hydroxide.
	 * if ammonium is not with acidradical or hydroxide reselect the negative element.
	 */
	while (positiveElement.name == "ammonium" && !negativeElement.isAcidRadical && !negativeElement.isHydroxide) {
		negativeElement = getRandomElement(elements.negative);
	}

	// fixed oxidation number and must be neither acid radical nor ammonium =  first naming mode
	if (firstElementOxidationLength == 1 && !negativeElement.isAcidRadical && positiveElement.name != "ammonium") {
		obj = firstNamingMode(positiveElement, negativeElement);
	}

	// variable oxidation number and neither metal nor acid radical =  second naming mode
	if (
		firstElementOxidationLength > 1 &&
		!positiveElement.isMetal &&
		!negativeElement.isAcidRadical &&
		!negativeElement.isHydroxide
	) {
		obj = secondNamingMode(positiveElement, negativeElement);
	}

	// variable oxidation number and metal and not acid radical and hydroxide =  third naming mode
	if (
		firstElementOxidationLength > 1 &&
		positiveElement.isMetal &&
		!negativeElement.isAcidRadical &&
		!negativeElement.isHydroxide
	) {
		obj = thirdNamingMode(positiveElement, negativeElement);
	}

	// metal or ammonium and acidradical or hydroxide
	if (
		(positiveElement.isMetal || positiveElement.name == "ammonium") &&
		(negativeElement.isAcidRadical || negativeElement.isHydroxide)
	) {
		obj = acidHydroxideMode(positiveElement, negativeElement);
	}

	if (oldFormulaAndName.formula == obj.formula) {
		return generateFormulaAndName(oldFormulaAndName);
	}
	return obj;
}

export function getRandomFormula(e) {
	let n = /([A-Z][a-z]?)(_\d+)?/g,
		l = [
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
			"OH",
		],
		r = ["F", "S", "O", "N", "Cl", "Br", "I"],
		O = ["NO_2", "NO_3", "ClO_3", "HCO_3", "CO_3", "HSO_3", "SO_3", "HSO_4", "SO_4", "H_2PO_4", "HPO_4", "PO_4"],
		d = () => Math.round(7 * Math.random() + 2),
		o = l[Math.floor(Math.random() * l.length)],
		t = r[Math.floor(Math.random() * r.length)],
		i = O[Math.floor(Math.random() * O.length)],
		u = [],
		c,
		s = O.some((n) => e.includes(n));
	if (s) {
		if (e.includes("(")) {
			let a = e.indexOf("("),
				f = e.slice(0, a).includes("_"),
				g = 2 === (e.slice(a).match(/_/g) || []).length,
				h = f ? `${o}${d()}` : `${o}`,
				m = g ? `(${i})_${d()}` : `${i}`;
			return `${h}${m}`;
		}
		e.indexOf("SO_3");
		let C = e.slice(0, -O.find((n) => e.endsWith(n)).length).includes("_"),
			H = C ? `${o}_${d()}` : `${o}`;
		return `${H}${i}`;
	}
	for (; null !== (c = n.exec(e)); ) {
		let S = c[1],
			N = c[2] || "";
		u.push(N ? `${S}${N}` : S);
	}
	let P = u[0].includes("_"),
		x = u[1].includes("_"),
		F = P ? `${o}_${d()}` : `${o}`,
		A = x ? `${t}_${d()}` : `${t}`;
	return `${F}${A}`;
}

export function getRandomName() {
	let elements = [
		"fluorine",
		"sulphur",
		"oxygen",
		"nitrogen",
		"chlorine",
		"bromine",
		"iodine",
		"chloride",
		"bromide",
		"iodide",
		"nitrite",
		"nitrate",
		"chlorate",
		"carbonate",
		"sulphite",
		"sulphate",
		"phosphate",
	];
	let positiveElement = getRandomElement(elements);
	let negativeElement = getRandomElement(elements);

	return `${positiveElement}${negativeElement}`;
}

function firstNamingMode(p, n) {
	// p = positive element
	// n = negative element

	/**
	 * A total of 63 possible combinations.
	 * 9 positive elements × 7 negative elements = 63 unique pairs.
	 */

	const pOxi = p.oxidationNumber[0];
	const nOxi = n.oxidationNumber[0] * -1; // make it positive

	// helper function
	const suffix = (oxi) => (oxi == 1 ? "" : `_${oxi}`); // if 1 then no suffix

	const { pCount, nCount } = adjustOxidationNumbers(pOxi, nOxi); // make pOxi + nOxi = 0
	const pSuffix = suffix(pCount); // suffix is used in formula
	const nSuffix = suffix(nCount); // suffix is used in formula

	const formula = `${p.symbol}${pSuffix}${n.symbol}${nSuffix}`;
	const name = `${p.name} ${n.ideName}`;

	return { formula, name };

	/** Sept 24, 2024 | 1:18 */
}

function secondNamingMode(p, n) {
	// p = positive element
	// n = negative element

	/**
	 * A total of 70 possible combinations.
	 */

	const pOxi = p.oxidationNumber[Math.floor(Math.random() * p.oxidationNumber.length)]; // get random oxidation number
	const nOxi = n.oxidationNumber[0] * -1; // make it positive
	const { pCount, nCount } = adjustOxidationNumbers(pOxi, nOxi); // make pOxi + nOxi = 0

	// helper function
	const omitPrefixes = ["mono", "penta", "hexa", "hepta", "octa", "nona", "deca"];
	const suffix = (oxi) => (oxi == 1 ? "" : `_${oxi}`); // if 1 then no suffix, for formula
	const prefix = (n) => ["mono", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "nona", "deca"][n - 1]; // for naming

	const pSuffix = suffix(pCount); // suffix is used in formula
	const nSuffix = suffix(nCount); // suffix is used in formula

	const pPrefix = pCount == 1 ? "" : prefix(pCount); // mono prefix can be neglect for first element
	const nPrefix = (() => {
		// if  "mono", "penta", "deca", etc. + oxygen omit last character. e.g. monoxide,pentoxide
		if (n.name == "oxygen" && omitPrefixes.includes(prefix(nCount))) {
			return prefix(nCount).slice(0, -1);
		}

		// if nothing matched return default
		return prefix(nCount);
	})();

	const formula = `${p.symbol}${pSuffix}${n.symbol}${nSuffix}`;
	const name = `${pPrefix}${p.name} ${nPrefix}${n.ideName}`;

	return { formula, name };

	/** Sept 20, 2024 | 10:30 */
}

function thirdNamingMode(p, n) {
	// p = positive element
	// n = negative element

	/**
	 * A total of 91 possible combinations.
	 */

	const pOxi = p.oxidationNumber[Math.floor(Math.random() * p.oxidationNumber.length)]; // get random oxidation number
	const nOxi = n.oxidationNumber[0] * -1; // make it positive
	const { pCount, nCount } = adjustOxidationNumbers(pOxi, nOxi); // make pOxi + nOxi = 0

	// helper function
	const suffix = (oxi) => (oxi == 1 ? "" : `_${oxi}`); // if 1 then no suffix, for formula
	const prefix = (n) => ["(I)", "(II)", "(III)", "(IV)", "(V)", "(VI)", "(VII)", "(VIII)", "(IX)", "(X)"][n - 1]; // for naming

	const pSuffix = suffix(pCount); // suffix is used in formula
	const nSuffix = suffix(nCount); // suffix is used in formula

	const pOxiCount = prefix(pOxi);

	const formula = `${p.symbol}${pSuffix}${n.symbol}${nSuffix}`;
	const name = `${p.name}${pOxiCount} ${n.ideName}`;

	return { formula, name };
}

function acidHydroxideMode(p, n) {
	// p = positive element
	// n = negative element

	/**
	 * A total of 352 possible combinations.
	 * 330 salts formula + 22 hydroxide formula
	 */

	const pOxi =
		p.oxidationNumber.length > 1
			? p.oxidationNumber[Math.floor(Math.random() * p.oxidationNumber.length)]
			: p.oxidationNumber[0];
	const nOxi = n.oxidationNumber[0] * -1; // make it positive
	const { pCount, nCount } = adjustOxidationNumbers(pOxi, nOxi); // make pOxi + nOxi = 0

	const formulaFormat = (e, oxi) => {
		if (oxi == 1) {
			return `${e}`;
		}

		/**
		 *  check whether the element is acid radical or hydroxide.
		 * 		(hydroxide is 2 binary compound so we need to make this format)
		 *
		 * 	e.g. (OH)_2, (NH_4)2, (HPO_4)_2
		 */
		if (e.includes("_") || e == "OH") {
			return `(${e})_${oxi}`;
		}

		return `${e}_${oxi}`;
	}; // if 1 then no suffix, for formula

	const nameSuffix = (oxiLength, n) => {
		if (oxiLength == 1) {
			return "";
		}

		return ["(I)", "(II)", "(III)", "(IV)", "(V)", "(VI)", "(VII)", "(VIII)", "(IX)", "(X)"][n - 1];
	};

	const formula = `${formulaFormat(p.symbol, pCount)}${formulaFormat(n.symbol, nCount)}`;
	const name = `${p.name}${nameSuffix(p.oxidationNumber.length, pOxi)} ${n.name}`;

	return { formula, name };
}

/**
 * HELPER FUNCTIONS
 */

function getRandomElement(elements) {
	return elements[Math.floor(Math.random() * elements.length)];
}

function adjustOxidationNumbers(pOxi, nOxi) {
	if (nOxi % pOxi === 0) {
		const multiplier = nOxi / pOxi;
		pOxi *= multiplier;
		return { pCount: multiplier, nCount: 1 };
	}

	if (pOxi % nOxi === 0) {
		const multiplier = pOxi / nOxi;
		nOxi *= multiplier;
		return { pCount: 1, nCount: multiplier };
	}

	return { pCount: nOxi, nCount: pOxi };
}
